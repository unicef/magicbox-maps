/* eslint-disable no-unused-vars*/
import React, {
  Component
} from 'react'
/* eslint-enable no-unused-vars*/
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'
import fetchAvailableCountries
  from '../actions/action-fetch-available-countries';
import {
  selectCountry
} from '../actions/action-select-country';
import {
  adminStyle
} from '../helpers/helper-admins-style';
import {
  onEachAdminFeature
} from '../helpers/helper-admin-onEach';
import {
  selectAdmin
} from '../actions/action-select-admin';
import {
  countryStyle
} from '../helpers/helper-countries-style';
import {
  onEachCountryFeature
} from '../helpers/helper-country-onEach';
// import LayerGl from  "../public/lib";
import mpio from '../data/mpio'
// import Toast from './toast'
import us_counties from '../data/us_counties'
import {
  pointToLayer
} from '../helpers/helper-country-point';
import {
  GeoJSON,
  Map,
  ZoomControl,
  TileLayer
} from 'react-leaflet'
import L from 'leaflet'
import {
  alpha3ToAlpha2
} from 'i18n-iso-countries';
import {
  fetchDates
} from '../actions/action-fetch-dates.js'
import Docker from './Dock'
import UnicefNav from './UnicefNav';
import LoadingSpinner from './LoadingSpinner'
const _ = require('lodash');
var data = require('../public/data')

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (((this - in_min) * (out_max - out_min)) / (in_max - in_min)) + out_min;
};
// Function to convert rgb to 0-1 for webgl
const fromRgb = n => Math.ceil((parseInt(n).map(0, 255, 0, 1)) * 1000) / 1000;
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const colorLookup = {}

// Generates off screen color for data point
const gen_offscreen_colors = function(i) {
  if (i === 65535) { i +=1; } // Do not use red
  const r = ((i+1) >>16) & 0xff;
  const g = ((i+1) >>8) & 0xff;
  const b = (i+1)  & 0xff;
  return [r, g, b];
};

function LatLongToPixelXY(latitude, longitude) {
  var pi_180 = Math.PI / 180.0;
  var pi_4 = Math.PI * 4;
  var sinLatitude = Math.sin(latitude * pi_180);
  var pixelY = (0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / pi_4) * 256;
  var pixelX = (longitude + 180) / 360 * 256;

  var pixel = { x: pixelX, y: pixelY };

  return pixel;
}

function translateMatrix(matrix, tx, ty) {
  // translation is in last column of matrix
  matrix[12] += matrix[0] * tx + matrix[4] * ty;
  matrix[13] += matrix[1] * tx + matrix[5] * ty;
  matrix[14] += matrix[2] * tx + matrix[6] * ty;
  matrix[15] += matrix[3] * tx + matrix[7] * ty;
}

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

const prepare_points = function(features) {
  let point_xy                = new Float32Array(2 * features.length);
  let point_on_screen_color   = new Float32Array(4 * features.length);
  let point_off_screen_color  = new Float32Array(4 * features.length);
  let point_size              = new Float32Array(    features.length);
  features.forEach((f, i) => {
    const lat = f.geometry.coordinates[1];
    const lon = f.geometry.coordinates[0];
    const id  = f.properties.id;

    const pixel          = LatLongToPixelXY(lat, lon);
    point_xy[i * 2]      = pixel.x;
    point_xy[(i * 2) + 1]  = pixel.y;
    point_size[i]        = 20.0;

    // i + 1
    const [r, g, b] = Array.from(gen_offscreen_colors(i));
		colorLookup[r + ' ' +  g + ' ' +  b] = id;

    // off screen point colors (each color unique)
    point_off_screen_color[i * 4] =  fromRgb(r);
    point_off_screen_color[(i * 4) + 1] =  fromRgb(g);
    point_off_screen_color[(i * 4) + 2] =  fromRgb(b);
    point_off_screen_color[(i * 4) + 3] =  1;

    // on screen point colors (all red)
    point_on_screen_color[i * 4] =  1;
    point_on_screen_color[(i * 4) + 1] =  0;
    point_on_screen_color[(i * 4) + 2] =  0;
    point_on_screen_color[(i * 4) + 3] =  0.5;
  })
}

/**
 * My map class
 */
class MyMap extends Component {
  /**
   * State object
   * @param  {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      onDrawLayer: function(info) {
        if (info.points.features.length > 0) {
          let points = prepare_points(info.points.features)
          console.log(points, 'PPpp')
        }
        // // console.log('blow', info)
        // var ctx = info.canvas.getContext('2d');
        // ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
        // ctx.fillStyle = 'rgba(255,116,0, 0.2)';
        // info.points.features.forEach(f => {
        //   let dot = info.layer._map.latLngToContainerPoint(
        //     [f.geometry.coordinates[1], f.geometry.coordinates[0]]
        //   );
        //   ctx.beginPath();
        //   ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        //   ctx.fill();
        //   ctx.closePath();
        // })
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
      loading: false
    }

    this.polygons = us_counties.features
      .map(feature => feature.geometry.coordinates)
    mpio.features.forEach(f => {
      this.polygons.push(f.geometry.coordinates);
    })
  }
  componentDidMount() {

    /*
      Generic  Canvas Layer for leaflet 0.7 and 1.0-rc,
      copyright Stanislav Sumbera,  2016 , sumbera.com , license MIT
      originally created and motivated by L.CanvasOverlay  available here: https://gist.github.com/Sumbera/11114288

    */

    // -- L.DomUtil.setTransform from leaflet 1.0.0 to work on 0.0.7
    //------------------------------------------------------------------------------
    L.DomUtil.setTransform = L.DomUtil.setTransform || function (el, offset, scale) {
        var pos = offset || new L.Point(0, 0);

        el.style[L.DomUtil.TRANSFORM] =
            (L.Browser.ie3d ?
                'translate(' + pos.x + 'px,' + pos.y + 'px)' :
                'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
            (scale ? ' scale(' + scale + ')' : '');
    };

    // -- support for both  0.0.7 and 1.0.0 rc2 leaflet
    L.CanvasLayer = (L.Layer ? L.Layer : L.Class).extend({
        // -- initialized is called on prototype
        initialize: function (options) {
            this._map    = null;
            this._canvas = null;
            this._frame  = null;
            this._delegate = null;
            L.setOptions(this, options);
        },

        delegate :function(del){
            this._delegate = del;
            return this;
        },

        needRedraw: function () {
            if (!this._frame) {
                this._frame = L.Util.requestAnimFrame(this.drawLayer, this);
            }
            return this;
        },

        //-------------------------------------------------------------
        _onLayerDidResize: function (resizeEvent) {
            this._canvas.width = resizeEvent.newSize.x;
            this._canvas.height = resizeEvent.newSize.y;
        },
        //-------------------------------------------------------------
        _onLayerDidMove: function () {
            var topLeft = this._map.containerPointToLayerPoint([0, 0]);
            L.DomUtil.setPosition(this._canvas, topLeft);
            this.drawLayer();
        },
        //-------------------------------------------------------------
        getEvents: function () {
            var events = {
                resize: this._onLayerDidResize,
                moveend: this._onLayerDidMove,
                zoom: this._onLayerDidMove
            };
            if (this._map.options.zoomAnimation && L.Browser.any3d) {
                events.zoomanim =  this._animateZoom;
            }

            return events;
        },
        //-------------------------------------------------------------
        onAdd: function (map) {

            this._map = map;
            this._canvas = L.DomUtil.create('canvas', 'leaflet-layer');
            this.tiles = {};

            var size = this._map.getSize();
            this._canvas.width = size.x;
            this._canvas.height = size.y;

            var animated = this._map.options.zoomAnimation && L.Browser.any3d;
            L.DomUtil.addClass(this._canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));


            map._panes.overlayPane.appendChild(this._canvas);

            map.on(this.getEvents(), this);

            var del = this._delegate.state || this.state;

            del.onLayerDidMount && del.onLayerDidMount(); // -- callback
            this.needRedraw();
        },

        //-------------------------------------------------------------
        onRemove: function (map) {
            var del = this._delegate || this;
            del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback


            map.getPanes().overlayPane.removeChild(this._canvas);

            map.off(this.getEvents(),this);

            this._canvas = null;

        },

        //------------------------------------------------------------
        addTo: function (map) {
            map.addLayer(this);
            return this;
        },
        // --------------------------------------------------------------------------------
        LatLonToMercator: function (latlon) {
            return {
                x: latlon.lng * 6378137 * Math.PI / 180,
                y: Math.log(Math.tan((90 + latlon.lat) * Math.PI / 360)) * 6378137
            };
        },

        //------------------------------------------------------------------------------
        drawLayer: function () {
            // -- todo make the viewInfo properties  flat objects.
            var size   = this._map.getSize();
            var bounds = this._map.getBounds();
            var zoom   = this._map.getZoom();

            var center = this.LatLonToMercator(this._map.getCenter());
            var corner = this.LatLonToMercator(this._map.containerPointToLatLng(this._map.getSize()));

            var del = this._delegate.state || this.state;
            let info = {
                points: this._delegate.props.activeCountry.points,
                layer : this,
                canvas: this._canvas,
                bounds: bounds,
                size: size,
                zoom: zoom,
                center : center,
                corner : corner
            }
            this._delegate.state.info = info
            del.onDrawLayer && del.onDrawLayer(info);
            this._frame = null;
        },
        // -- L.DomUtil.setTransform from leaflet 1.0.0 to work on 0.0.7
        //------------------------------------------------------------------------------
        _setTransform: function (el, offset, scale) {
            var pos = offset || new L.Point(0, 0);

            el.style[L.DomUtil.TRANSFORM] =
    			(L.Browser.ie3d ?
    				'translate(' + pos.x + 'px,' + pos.y + 'px)' :
    				'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
    			(scale ? ' scale(' + scale + ')' : '');
        },

        //------------------------------------------------------------------------------
        _animateZoom: function (e) {
            var scale = this._map.getZoomScale(e.zoom);
            // -- different calc of animation zoom  in leaflet 1.0.3 thanks @peterkarabinovic, @jduggan1
            var offset = L.Layer ? this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(), e.zoom, e.center).min :
                                   this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

            L.DomUtil.setTransform(this._canvas, offset, scale);
        }
    });

    L.canvasLayer = function () {
      return new L.CanvasLayer();
    };

    const leafletMap = this.leafletMap.leafletElement;

    var glLayer = L.canvasLayer().delegate(this).addTo(leafletMap);

    var gl = glLayer._canvas.getContext('webgl', { antialias: true });
    glLayer._canvas.addEventListener('click', function(ev) {

    });
    var vshaderText = '\nattribute vec4  worldCoord;' +
    'attribute vec4  color;' +
    'attribute float aPointSize;' +
    'varying vec4 vColor;' +
    'uniform mat4 mapMatrix;' +
    'void main() {\n' +
    'gl_Position = mapMatrix * worldCoord;' +
    'vColor = color;' +
    'gl_PointSize = aPointSize;' +
    '}'

    var fshaderText = 'precision mediump float;' +
    'varying vec4 vColor;' +
    'void main() {' +
    'gl_FragColor = vColor;' +
    '}'
    var _shaders = shaders(gl),
        vertexShader = _shaders.vertexShader,
        fragmentShader = _shaders.fragmentShader;

    function shaders(gl) {
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vshaderText);
      gl.compileShader(vertexShader);
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fshaderText);
      gl.compileShader(fragmentShader);

      return { vertexShader: vertexShader, fragmentShader: fragmentShader };
    }

    // link shaders to create our program
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    this.state.gl = gl
    this.state.program = program

  }

  /**
   * componentWillMount - Calls initialLoad which loads initial data
   *
   */
  componentWillMount() {
    this.props.fetchAvailableCountries();
  }
  /**
   * componentWillUpdate
   * @param  {Object} nextProps
   * @param  {Object} nextState
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.activeCountry.selectedCountryName !==
      this.props.activeCountry.selectedCountryName) {
      this.setState({
        didUpdate: false
      })
    }
  }
  /**
   * componentWillMount
   * @param  {Object} prevProps
   * @param  {Object} prevState
   */
  componentDidUpdate(prevProps, prevState) {

    if (prevProps.activeCountry.selectedCountryName !==
      this.props.activeCountry.selectedCountryName) {
      this.state.info.points = this.props.activeCountry.points
      console.log(prevProps.activeCountry.selectedCountryName, this.props.activeCountry.selectedCountryName, 'nnnnn')
      console.log("!!!!")
      this.state.onDrawLayer(this.state.info);
      if (this.state.docker) {
        this.setState({
          didUpdate: true,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    }
  }


  /**
   * geoFilter - filters geojson file
   *
   * @param  {type} feature features
   * @return {type}         description
   */
  geoFilter(feature) {
    // If at country level
    if (feature.id) {
      let alpha2 = alpha3ToAlpha2(feature.id);
      if (this.props.availableCountries.indexOf(alpha2) > -1) {
        return true
      }
      return false
    }
    return true
  }

  /**
   * Render
   * @return {object} JSX
   */
  render() {
    const position = [this.state.lat, this.state.lng]
        // <Toast thing={this.props.activeCountry.selectedCountry} map={Map} tileLayer={TileLayer}/>
    // console.log(this.props.activeCountry.geojson);
    return (
      <div>
        <UnicefNav></UnicefNav>

        <Map ref='map'
          ref={m => { this.leafletMap = m; }}
          center={position}
          zoom={this.state.zoom}
          zoomControl={false}>
          <ZoomControl position='bottomleft' />
          <TileLayer
            ref={t => { this.tileLayer = t; }}
            url={this.state.url}
            attribution={this.state.attribution}
          />

          <GeoJSON
            key={_.uniqueId()}
            data={this.props.allCountries}
            style={countryStyle(this.props)}
            onEachFeature={onEachCountryFeature(
              this, this.props.sliderValues.sliderVal
            )}
            filter={this.geoFilter.bind(this)}
          ></GeoJSON>
          <GeoJSON
            key={_.uniqueId()}
            data={this.props.activeCountry.polygons}
            style={adminStyle(this.props)}
            onEachFeature={onEachAdminFeature(this.props)}

          ></GeoJSON>


        </Map>
        <Docker didUpdate={this.state.didUpdate}></Docker>
        <LoadingSpinner display={this.state.loading}></LoadingSpinner>
      </div>
    )
  }
}


/* eslint-disable require-jsdoc*/
function mapStateToProps(state) {
  return {
    availableCountries: state.availableCountries.availableCountries,
    allCountries: state.allCountries,
    activeCountry: state.activeCountry,
    sliderValues: state.sliderChanged

  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAvailableCountries: fetchAvailableCountries,
    fetchDates: fetchDates,
    selectCountry: selectCountry,
    selectAdmin: selectAdmin
  }, dispatch)
}

/* eslint-enablerequire-jsdoc*/

export default connect(mapStateToProps, matchDispatchToProps)(MyMap);
