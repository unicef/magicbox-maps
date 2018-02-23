/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'

import L from 'leaflet'
import {
  pointToLayer
} from '../helpers/helper-country-point';

Number.map = function(in_min, in_max, out_min, out_max) {
  return (((this - in_min) * (out_max - out_min)) / (in_max - in_min)) +
        out_min;
};

/**
 * Converts RGB values into a 0-to-1 scale for WebGL to 0-1 for WebGL. Allows
 * for wider color set to use in the map than what's possible with RGB values.
 *
 * @param {array} n RGB value set
 * @return {number} 0-to-1 value for color
 */
const fromRgb = n => Math.ceil((parseInt(n).map(0, 255, 0, 1)) * 1000) / 1000;

/**
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs:
 * https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const colorLookup = {}

/**
 * Generates off-screen RGB color for data point.
 *
 * @param {number} i 0-to-1 value for color
 * @return {array} RGB value set
 */
const gen_offscreen_colors = function(i) {
  if (i === 65535) {
    i += 1;
  } // Do not use red
  const r = ((i + 1) >> 16) & 0xff;
  const g = ((i + 1) >> 8) & 0xff;
  const b = (i + 1) & 0xff;
  return [r, g, b];
};

/**
 * Finds a pixel from a latitude / longtitude set.
 *
 * @param {number} latitude a latitudinal value
 * @param {number} longitude a longitudinal value
 * @return {number} a pixel
 */
function latLongToPixelXY(latitude, longitude) {
  let pi_180 = Math.PI / 180.0;
  let pi_4 = Math.PI * 4;
  let sinLatitude = Math.sin(latitude * pi_180);
  let pixelY = (0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / pi_4)
      * 256;
  let pixelX = (longitude + 180) / 360 * 256;

  let pixel = {
    x: pixelX,
    y: pixelY
  };

  return pixel;
}
/**
 * Translate a matrix across an x or y axis.
 *
 * @param {array} matrix matrix to translate
 * @param {number} tx x-axis multiplier
 * @param {number} ty y-axis multiplier
 */
function translateMatrix(matrix, tx, ty) {
  // translation is in last column of matrix
  matrix[12] += matrix[0] * tx + matrix[4] * ty;
  matrix[13] += matrix[1] * tx + matrix[5] * ty;
  matrix[14] += matrix[2] * tx + matrix[6] * ty;
  matrix[15] += matrix[3] * tx + matrix[7] * ty;
}

/**
 * Scales a matrix by a proportion across an x or y axis.
 *
 * @param {array} matrix matrix to scale
 * @param {number} scaleX x-axis multiplier
 * @param {number} scaleY y-axis multiplier
 */
function scaleMatrix(matrix, scaleX, scaleY) {
  // scaling x and y, which is just scaling first two columns of matrix
  matrix[0] *= scaleX;
  matrix[1] *= scaleX;
  matrix[2] *= scaleX;
  matrix[3] *= scaleX;

  matrix[4] *= scaleY;
  matrix[5] *= scaleY;
  matrix[6] *= scaleY;
  matrix[7] *= scaleY;
}

/**
 * Creates color code indicating network connection type or speed from provided
 * properties (either speed or type). The color is later used to map a color of
 * a data point in a map.
 *
 * @param {undefined} properties object properties to add data
 * @return {array} RGB color value (indicating network type / speed)
 */
function assign_speed_value(properties) {
  let slider = 3
  let value = null;
  if (properties.speed_connectivity !== null) {
    value = properties.speed_connectivity;
  } else if (properties.type_connectivity != null) {
    value = properties.type_connectivity;
  }

  if (typeof value === 'undefined') {
    // return '#6A1E74';
    return [106, 30, 116]
  } else if (value === 0 || value === 'No Service') {
    // return '#d9534f';
    return [217, 83, 79]
  } else if (value >= slider || value === '3G') {
    // return '#5cb85c';
    return [92, 184, 92]
  } else if (value < slider || value === '2G') {
    // return '#F5A623';
    return [245, 166, 35]
  } else {
    // return '#DCDCDC';
    return [1, 1, 1]
  }
}

const prepare_points = function(features, zoom) {
  let point_xy = new Float32Array(2 * features.length);
  let point_on_screen_color = new Float32Array(4 * features.length);
  let point_off_screen_color = new Float32Array(4 * features.length);
  let point_size = new Float32Array(features.length);
  features.forEach((f, i) => {
    let speed_value = assign_speed_value(f.properties)

    const lat = f.geometry.coordinates[1];
    const lon = f.geometry.coordinates[0];
    const id = f.properties.id;

    const pixel = latLongToPixelXY(lat, lon);
    point_xy[i * 2] = pixel.x;
    point_xy[(i * 2) + 1] = pixel.y;
    point_size[i] = 1.0 * (zoom / 2.5);
    // if (i%100 === 0) {
    //   console.log(f)
    // }
    // i + 1
    const [r, g, b] = Array.from(gen_offscreen_colors(i));
    colorLookup[r + ' ' + g + ' ' + b] = id;

    // off screen point colors (each color unique)
    point_off_screen_color[i * 4] = fromRgb(r);
    point_off_screen_color[(i * 4) + 1] = fromRgb(g);
    point_off_screen_color[(i * 4) + 2] = fromRgb(b);
    point_off_screen_color[(i * 4) + 3] = 1;

    // on screen point colors (all red)
    point_on_screen_color[i * 4] = fromRgb(speed_value[0]);
    point_on_screen_color[(i * 4) + 1] = fromRgb(speed_value[1]);
    point_on_screen_color[(i * 4) + 2] = fromRgb(speed_value[2]);
    point_on_screen_color[(i * 4) + 3] = 0.5;
  })
  return {
    point_off_screen_color,
    point_on_screen_color,
    point_xy,
    point_size
  };
}

/* eslint-disable require-jsdoc*/
class WebglLayer extends React.Component {
/* eslint-disable require-jsdoc*/
  constructor(props, context) {
    super(props);
    this.state = {
      onDrawLayer: function(info, bind_buffers) {
        let gl = this.gl
        let canvas = info.canvas
        let leafletMap = props.leafletMap.leafletMap
        let program = this.program

        let pointArrayBuffer = this.pointArrayBuffer
        let sizeArrayBuffer = this.sizeArrayBuffer
        let colorArrayBuffer = this.colorArrayBuffer
        let colorArrayBufferOffScreen = this.colorArrayBufferOffScreen
        let framebuffer = this.framebuffer

        let points = prepare_points(info.points.features, this.info.zoom)
        let point_xy = points.point_xy // Typed array of x, y pairs
        let point_off_screen_color = points.point_off_screen_color // Typed array of sets of four floating points
        let point_on_screen_color = points.point_on_screen_color; // Typed array of sets of four floating points
        let point_size = points.point_size;

        if (info.points.features.length) {
          // pointArrayBuffer
          gl.bindBuffer(gl.ARRAY_BUFFER, this.pointArrayBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, points.point_xy, gl.STATIC_DRAW);

          // SizeArrayBuffer
          gl.bindBuffer(gl.ARRAY_BUFFER, this.sizeArrayBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, points.point_size, gl.STATIC_DRAW);

          // On screen ColorArrayBuffer
          gl.bindBuffer(gl.ARRAY_BUFFER, this.colorArrayBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,
                        points.point_on_screen_color,
                        gl.STATIC_DRAW);

          // Off screen ColorArrayBuffer
          gl.bindBuffer(gl.ARRAY_BUFFER, this.colorArrayBufferOffScreen);
          gl.bufferData(gl.ARRAY_BUFFER,
                        points.point_off_screen_color,
                        gl.STATIC_DRAW);
          // end animate

          gl.viewport(0, 0, canvas.width, canvas.height);
          this.gl = gl;
        }
        if (info.points.features.length > 0) {
          gl.clear(gl.COLOR_BUFFER_BIT);
          // let mapProjection = this.leafletMap.getProjection()

          // look up the locations for the inputs to our shaders.
          let attributeLoc = gl.getUniformLocation(program, 'worldCoord');
          let attributeSize = gl.getAttribLocation(program, 'aPointSize')
          let attributeCol = gl.getAttribLocation(program, 'color');
          let pixelsToWebGLMatrix = new Float32Array(16);
          // prettier-ignore
          pixelsToWebGLMatrix.set([2 / canvas.width, 0, 0, 0, 0, -2 /
              canvas.height, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1]);
          // Set viewport
          gl.viewport(0, 0, canvas.width, canvas.height);
          let mapMatrix = new Float32Array(16);
          mapMatrix.set(pixelsToWebGLMatrix);
          let bounds = this.leafletMap.getBounds();
          let topLeft = new L.LatLng(bounds.getNorth(), bounds.getWest());
          let offset = latLongToPixelXY(topLeft.lat, topLeft.lng);

          // Scale to current zoom
          let scale = Math.pow(2, this.leafletMap.getZoom());
          scaleMatrix(mapMatrix, scale, scale);
          translateMatrix(mapMatrix, -offset.x, -offset.y);

          // // attach matrix value to 'mapMatrix' uniform in shader
          let matrixLoc = gl.getUniformLocation(program, 'mapMatrix');
          gl.uniformMatrix4fv(matrixLoc, false, mapMatrix);

          // Off SCREEN
          // Bind Shader attributes
          const height = 2048;
          const width = 2048;
          // Creating a texture to store colors
          const texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
                        width, height, 0, gl.RGBA,
                        gl.UNSIGNED_BYTE, null);

          // Creating a Renderbuffer to store depth information
          const renderbuffer = gl.createRenderbuffer();
          gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
          gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,
                                 width, height);

          // Creating a framebuffer for offscreen rendering
          gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                                  gl.TEXTURE_2D, texture, 0);
          gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,
                                     gl.RENDERBUFFER, renderbuffer);

          // Finally, we do a bit of cleaning up as usual
          gl.bindTexture(gl.TEXTURE_2D, null);
          gl.bindRenderbuffer(gl.RENDERBUFFER, null);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          //
          //
          // OFF SCREEN
          // Bind Shader attributes
          gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
          gl.bindBuffer(gl.ARRAY_BUFFER, pointArrayBuffer); // Bind world coord
          attributeLoc = gl.getAttribLocation(program, 'worldCoord');

          gl.enableVertexAttribArray(1);
          gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, sizeArrayBuffer); // Bind point size
          attributeSize = gl.getAttribLocation(program, 'aPointSize');
          gl.enableVertexAttribArray(attributeSize);
          gl.vertexAttribPointer(attributeSize, 1, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, colorArrayBufferOffScreen); // Bind point color
          attributeCol = gl.getAttribLocation(program, 'color');
          gl.enableVertexAttribArray(attributeCol);
          gl.vertexAttribPointer(attributeCol, 4, gl.FLOAT, false, 0, 0);

          // tell webgl how buffer is laid out (pairs of x,y coords)

          // l = current_service.rawPoints.length / 2
          let l = point_xy.length / 2;

          gl.drawArrays(gl.POINTS, 0, l);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);


          // On SCREEN
          // Bind Shader attributes
          gl.bindBuffer(gl.ARRAY_BUFFER, pointArrayBuffer); // Bind world coord
          attributeLoc = gl.getAttribLocation(program, 'worldCoord');
          gl.enableVertexAttribArray(attributeLoc);
          gl.vertexAttribPointer(attributeLoc, 2, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, sizeArrayBuffer); // Bind point size
          attributeSize = gl.getAttribLocation(program, 'aPointSize');

          gl.enableVertexAttribArray(attributeSize);
          gl.vertexAttribPointer(attributeSize, 1, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, colorArrayBuffer); // Bind point color
          attributeCol = gl.getAttribLocation(program, 'color');
          gl.enableVertexAttribArray(attributeCol);
          gl.vertexAttribPointer(attributeCol, 4, gl.FLOAT, false, 0, 0);

          // tell webgl how buffer is laid out (pairs of x,y coords)

          l = point_xy.length / 2;
          gl.drawArrays(gl.POINTS, 0, l);
        }
      },
      url: 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?' +
        'access_token=' +
        'pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.' +
        'GfClkT4QxlFDC_xiI37x3Q',
      attribution: '&copy; <a href=\'http://osm.org/copyright\'>OpenStreetMap</a>' +
        ' contributors ',
      lat: 0,
      lng: 0,
      zoom: 2,
      docker: false,
      value: 3,
      didUpdate: false,
      loading: false,
      onHover: false
    }
  }
  /**
   * componentWillMount
   * @param  {Object} prevProps
   * @param  {Object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    this.state.info.points = this.props.points
    // true is for whether to bind buffers
    this.state.onDrawLayer(this.state.info, true);
  }

  componentDidMount() {
    /*
      Generic  Canvas Layer for leaflet 0.7 and 1.0-rc,
      copyright Stanislav Sumbera,  2016 , sumbera.com , license MIT
      originally created and motivated by L.CanvasOverlay  available here: https://gist.github.com/Sumbera/11114288

    */

    // -- L.DomUtil.setTransform from leaflet 1.0.0 to work on 0.0.7
    // -------------------------------------------------------------
    L.DomUtil.setTransform =
            L.DomUtil.setTransform || function(el, offset, scale) {
        let pos = offset || new L.Point(0, 0);

        el.style[L.DomUtil.TRANSFORM] =
        (L.Browser.ie3d ?
          'translate(' + pos.x + 'px,' + pos.y + 'px)' :
          'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
        (scale ? ' scale(' + scale + ')' : '');
      };

    // -- support for both  0.0.7 and 1.0.0 rc2 leaflet
    L.CanvasLayer = (L.Layer ? L.Layer : L.Class).extend({
      // -- initialized is called on prototype
      initialize: function(options) {
        this._map = null;
        this._canvas = null;
        this._frame = null;
        this._delegate = null;
        L.setOptions(this, options);
      },

      delegate: function(del) {
        this._delegate = del;
        return this;
      },

      needRedraw: function() {
        if (!this._frame) {
          this._frame = L.Util.requestAnimFrame(this.drawLayer, this);
        }
        return this;
      },

      // -------------------------------------------------------------
      _onLayerDidResize: function(resizeEvent) {
        this._canvas.width = resizeEvent.newSize.x;
        this._canvas.height = resizeEvent.newSize.y;
      },
      // -------------------------------------------------------------
      _onLayerDidMove: function() {
        let topLeft = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);
        this.drawLayer();
      },
      // -------------------------------------------------------------
      getEvents: function() {
        let events = {
          resize: this._onLayerDidResize,
          moveend: this._onLayerDidMove,
          zoom: this._onLayerDidMove
        };
        if (this._map.options.zoomAnimation && L.Browser.any3d) {
          events.zoomanim = this._animateZoom;
        }

        return events;
      },
      // -------------------------------------------------------------
      onAdd: function(map) {
        this._map = map;
        this._canvas = L.DomUtil.create('canvas', 'leaflet-layer');
        this.tiles = {};

        let size = this._map.getSize();
        this._canvas.width = size.x;
        this._canvas.height = size.y;

        let animated = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(this._canvas, 'leaflet-zoom-' +
                          (animated ? 'animated' : 'hide'));


        map._panes.overlayPane.appendChild(this._canvas);

        map.on(this.getEvents(), this);

        let del = this._delegate.state || this.state;

        del.onLayerDidMount && del.onLayerDidMount(); // -- callback
        this.needRedraw();
      },

      // -----------------------------------------------------------------------
      onRemove: function(map) {
        let del = this._delegate || this;
        del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback


        map.getPanes().overlayPane.removeChild(this._canvas);

        map.off(this.getEvents(), this);

        this._canvas = null;
      },
      // -----------------------------------------------------------------------
      addTo: function(map) {
        map.addLayer(this);
        return this;
      },
      // -----------------------------------------------------------------------
      latLonToMercator: function(latlon) {
        return {
          x: latlon.lng * 6378137 * Math.PI / 180,
          y: Math.log(Math.tan((90 + latlon.lat) * Math.PI / 360)) * 6378137
        };
      },

      // -----------------------------------------------------------------------
      drawLayer: function() {
        // -- todo make the viewInfo properties  flat objects.
        let size = this._map.getSize();
        let bounds = this._map.getBounds();
        let zoom = this._map.getZoom();

        let center = this.latLonToMercator(this._map.getCenter());
        let corner = this.latLonToMercator(
          this._map.containerPointToLatLng(this._map.getSize()));

        let del = this._delegate.state || this.state;
        let info = {
          points: this._delegate.props.points,
          layer: this,
          canvas: this._canvas,
          bounds: bounds,
          size: size,
          zoom: zoom,
          center: center,
          corner: corner
        }
        this._delegate.state.info = info
        del.onDrawLayer && del.onDrawLayer(info);
        this._frame = null;
      },
      // -- L.DomUtil.setTransform from leaflet 1.0.0 to work on 0.0.7
      // -----------------------------------------------------------------------
      _setTransform: function(el, offset, scale) {
        let pos = offset || new L.Point(0, 0);

        el.style[L.DomUtil.TRANSFORM] =
          (L.Browser.ie3d ?
            'translate(' + pos.x + 'px,' + pos.y + 'px)' :
            'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
          (scale ? ' scale(' + scale + ')' : '');
      },

      // -----------------------------------------------------------------------
      _animateZoom: function(e) {
        let scale = this._map.getZoomScale(e.zoom);
        // -- different calc of animation zoom in leaflet 1.0.3
        // thanks @peterkarabinovic, @jduggan1
        let offset = L.Layer ?
          this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(),
                                                  e.zoom, e.center).min :
          this._map._getCenterOffset(e.center).
            _multiplyBy(-scale).subtract(this._map._getMapPanePos());

        L.DomUtil.setTransform(this._canvas, offset, scale);
      }
    });

    L.canvasLayer = function() {
      return new L.CanvasLayer();
    };

    const leafletMap = this.props.leafletMap.leafletElement;
    let glLayer = L.canvasLayer().delegate(this).addTo(leafletMap);
    let canvas = glLayer._canvas
    let gl = glLayer._canvas.getContext('webgl', {
      antialias: true
    });
    let program = gl.createProgram();
    let framebuffer = gl.createFramebuffer();
    this.state.pointArrayBuffer = gl.createBuffer()
    this.state.sizeArrayBuffer = gl.createBuffer()
    this.state.colorArrayBuffer = gl.createBuffer()
    this.state.colorArrayBufferOffScreen = gl.createBuffer()
    this.state.framebuffer = framebuffer
    canvas.addEventListener('click', function(ev) {
      if (!!style.cssText) {
        let x = undefined;
        let y = undefined;
        let top = 0;
        let left = 0;
        let obj = canvas;
        while (obj && (obj.tagName !== 'BODY')) {
          top += obj.offsetTop;
          left += obj.offsetLeft;
          obj = obj.offsetParent;
        }
        left += window.pageXOffset;
        top -= window.pageYOffset;
        x = ev.clientX - left;
        y = canvas.clientHeight - (ev.clientY - top);
        const pixels = new Uint8Array(4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); // Load offscreen frame buffer for picking
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        if (colorLookup[pixels[0] + ' ' + pixels[1] + ' ' + pixels[2]]) {
          style.cursor = 'pointer'
          pointToLayer(colorLookup[pixels[0] + ' ' + pixels[1] +
                                   ' ' + pixels[2]], leafletMap)
        }
      }
    });
    canvas.addEventListener('mousemove', function(ev) {
      if (!!style.cssText) {
        let x = undefined;
        let y = undefined;
        let top = 0;
        let left = 0;
        let obj = canvas;
        while (obj && (obj.tagName !== 'BODY')) {
          top += obj.offsetTop;
          left += obj.offsetLeft;
          obj = obj.offsetParent;
        }
        left += window.pageXOffset;
        top -= window.pageYOffset;
        x = ev.clientX - left;
        y = canvas.clientHeight - (ev.clientY - top);
        const pixels = new Uint8Array(4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); // Load offscreen frame buffer for picking
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        // const d = document.getElementById('infoWindow');
        if (colorLookup[pixels[0] + ' ' + pixels[1] + ' ' + pixels[2]]) {
          style.cursor = 'pointer'
          console.log(colorLookup[pixels[0] + ' ' +
                                  pixels[1] + ' ' + pixels[2]]);
          // d.style.display = 'inline';
          // d.style.left    = ev.x + 20 + 'px';
          // d.style.top     = (ev.y - 25) + 'px';
          // return d.innerHTML     = 'School ID: ' + colorLookup[pixels[0] + " " + pixels[1] + " " + pixels[2]];
        } else {
          style.cursor = 'auto'
          // return d.style.display = 'none';
        }
      }
    });
    let vshaderText = '\nattribute vec4  worldCoord;' +
      'attribute vec4  color;' +
      'attribute float aPointSize;' +
      'varying vec4 vColor;' +
      'uniform mat4 mapMatrix;' +
      'void main() {\n' +
      'gl_Position = mapMatrix * worldCoord;' +
      'vColor = color;' +
      'gl_PointSize = aPointSize;' +
      '}'

    let fshaderText = 'precision mediump float;' +
      'varying vec4 vColor;' +
      'void main() {' +
      'gl_FragColor = vColor;' +
      '}'
    let _shaders = shaders(gl),
      vertexShader = _shaders.vertexShader,
      fragmentShader = _shaders.fragmentShader;

    function shaders(shadegl) {
      let shadeVertexShader = shadegl.createShader(shadegl.VERTEX_SHADER);
      shadegl.shaderSource(vertexShader, vshaderText);
      shadegl.compileShader(vertexShader);
      let shadeFragmentShader = shadegl.createShader(shadegl.FRAGMENT_SHADER);
      shadegl.shaderSource(fragmentShader, fshaderText);
      shadegl.compileShader(fragmentShader);

      return {
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      };
    }

    // link shaders to create our program

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    this.state.gl = gl
    this.state.program = program
    this.state.leafletMap = leafletMap
  }
  render() {
    const style = {
      display: this.props.display || 'none'
    }

    return (
      <div>
        <button
          onMouseOver={this.props.openDock}
          onMouseOut={this.props.openDock}
          className = 'hoverButton'
          style={style}
        >
          Reopen Dock
        </button>
      </div>
    );
  }
}

export default WebglLayer;
