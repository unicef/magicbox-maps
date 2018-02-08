const define = null;

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("leaflet"), require("react-leaflet"));
	else if(typeof define === 'function' && define.amd)
		define(["leaflet", "react-leaflet"], factory);
	else if(typeof exports === 'object')
		exports["Leaflet-webgl"] = factory(require("leaflet"), require("react-leaflet"));
	else
		root["Leaflet-webgl"] = factory(root["L"], root[undefined]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactLeaflet = __webpack_require__(2);

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

__webpack_require__(3);

var _earcut = __webpack_require__(4);

var _earcut2 = _interopRequireDefault(_earcut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
  return Math.floor(Math.random() * range);
}

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
const prepare_points            =  function(city_data) {
  const point_xy                = new Float32Array(2 * city_data.length);
  const point_on_screen_color   = new Float32Array(4 * city_data.length);
  const point_off_screen_color  = new Float32Array(4 * city_data.length);
  const point_size              = new Float32Array(    city_data.length);

  let i = 0;
  while (i < city_data.length) {
		console.log(city_data[i], '!!!!')
    const lat = city_data[i]['latitude'];
    const lon = city_data[i]['longitude'];
    const id  = city_data[i]['id'];

    const pixel                = LatLongToPixelXY(lat, lon);
    point_xy[i * 2]      = pixel.x;
    point_xy[(i * 2) + 1]  = pixel.y;
    point_size[i]        = 20.0;

    // i + 1
    const [r, g, b] = Array.from(gen_offscreen_colors(i));
		colorLookup[r + " " +  g + " " +  b] = id;

    // off screen point colors (each color unique)
    point_off_screen_color[i * 4]     =  fromRgb(r);
    point_off_screen_color[(i * 4) + 1] =  fromRgb(g);
    point_off_screen_color[(i * 4) + 2] =  fromRgb(b);
    point_off_screen_color[(i * 4) + 3] =  1;

    // on screen point colors (all red)
    point_on_screen_color[i * 4]     =  1;
    point_on_screen_color[(i * 4) + 1] =  0;
    point_on_screen_color[(i * 4) + 2] =  0;
    point_on_screen_color[(i * 4) + 3] =  0.5;
    i++;
  }

  return {point_off_screen_color, point_on_screen_color,  point_xy, point_size};
};
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
// Returns a random integer from 0 to range - 1.
function randomInt(range) {
		return Math.floor(Math.random() * range);
}

var LayerGl = function (_MapLayer) {
  _inherits(LayerGl, _MapLayer);

  function LayerGl() {
    _classCallCheck(this, LayerGl);

    return _possibleConstructorReturn(this, (LayerGl.__proto__ || Object.getPrototypeOf(LayerGl)).apply(this, arguments));
  }

  _createClass(LayerGl, [{
    key: 'setup',
    value: function setup(canvas) {
      var leafletMap = this.context.map;
      // var gl = canvas.getContext('webgl', { antialias: true });

       var vshaderText =
			 'uniform mat4 u_matrix;\n ' +
			 'attribute vec4 a_vertex;\n' +
			 'attribute float a_pointSize;\n' +
			 '// attribute vec4 a_color;\n' +
			 'varying float v_pointSize;\n' +
			 'void main() {\n' +
			 '// Set the size of the point\n' +
			 'gl_PointSize =  a_pointSize;\n\n' +
			 '// Convert to pixelXY\n' +
			 'float pi_180 = 3.14159 / 180.0;\n' +
			 'float pi_4 = 3.14159 * 4.0;\n' +
			 'float sinLatitude = sin(a_vertex.y * pi_180);\n' +
			 'float pixelY = (0.5 - log((1.0 + sinLatitude) / (1.0 - sinLatitude)) / pi_4) * 256.0;\n' +
			 'float pixelX = (a_vertex.x + 180.0) / 360.0 * 256.0;\n' +
			 '// multiply each vertex by a matrix.\n' +
			 'gl_Position =  u_matrix * vec4(pixelX, pixelY, 1, 1);\n' +
			 '// pass the color to the fragment shader\n' +
			 '// v_color = a_color;\n' +
			 'v_pointSize = a_pointSize;\n' +
		   '}';

			var vshaderText =
			'uniform mat4 u_matrix;\n' +
			'attribute vec4 a_vertex;\n' +
			'attribute float a_pointSize;\n' +
			'// attribute vec4 a_color;\n' +
			'varying float v_pointSize;\n' +
			'void main() {\n' +
			'gl_Position = mapMatrix * u_matrix;' +
      'vColor = color;' +
      'gl_PointSize = aPointSize;' +
			'// Set the size of the point\n' +
			// 'gl_PointSize =  a_pointSize;\n\n' +
			'// multiply each vertex by a matrix.\n' +
      // // 'gl_Position = u_matrix * a_vertex;' +
			// '// Convert to pixelXY\n' +
			// 'float pi_180 = 3.14159 / 180.0;\n' +
			// 'float pi_4 = 3.14159 * 4.0;\n' +
			// 'float sinLatitude = sin(a_vertex.y * pi_180);\n' +
			// 'float pixelY = (0.5 - log((1.0 + sinLatitude) / (1.0 - sinLatitude)) / pi_4) * 256.0;\n' +
			// 'float pixelX = (a_vertex.x + 180.0) / 360.0 * 256.0;\n' +
			// '// multiply each vertex by a matrix.\n' +
			// 'gl_Position =  u_matrix * vec4(pixelX, pixelY, 1, 1);\n' +
			// '// pass the color to the fragment shader' +
			// 'v_color = a_color;' +
			// 'v_pointSize = a_pointSize;\n' +
			'}';

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

      var fshaderText = '\nprecision mediump float;\n  varying vec4 vColor;\n' +
			'void main() {\n' +
			'float border = 0.05;\n' +
			'float radius = 0.5;' +
			'vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);' +
			'vec4 color1 = vec4(v_color[0], v_color[1], v_color[2], 0.2);' +
			'vec2 m = gl_PointCoord.xy - vec2(0.5, 0.5);' +
			'float dist = radius - sqrt(m.x * m.x + m.y * m.y);' +
			'float t = 0.0;' +
			'if (dist > border)' +
			't = 1.0;' +
			'else if (dist > 0.0)' +
			't = dist / border;' +
			'gl_FragColor = mix(color0, color1, t);' +
			'}';

			// var vshaderText = 'uniform mat4 u_matrix;\n            attribute vec4 a_vertex;\n            attribute float a_pointSize;\n            // attribute vec4 a_color;\n            varying float v_pointSize;\n        \n            void main() {\n            // Set the size of the point\n            gl_PointSize =  a_pointSize;\n\n            // Convert to pixelXY\n            float pi_180 = 3.14159 / 180.0;\n            float pi_4 = 3.14159 * 4.0;\n            float sinLatitude = sin(a_vertex.y * pi_180);\n            float pixelY = (0.5 - log((1.0 + sinLatitude) / (1.0 - sinLatitude)) / pi_4) * 256.0;\n            float pixelX = (a_vertex.x + 180.0) / 360.0 * 256.0;\n        \n            // multiply each vertex by a matrix.\n            gl_Position =  u_matrix * vec4(pixelX, pixelY, 1, 1);\n              \n            // pass the color to the fragment shader\n            // v_color = a_color;\n              v_pointSize = a_pointSize;\n            }';
      //
			var fshaderText = '\n            precision mediump float;\n            varying float v_pointSize;\n        \n            void main() {\n                gl_FragColor = vec4(0,0.4,0.8, 0.3);\n        \n            }';

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


			let cities = [{"id":"Algiers", "latitude": 36.70000, "longitude": 3.21700} ,{"id": "Khartoum", "latitude": 15.56670, "longitude": 32.60000 },{"id": "New York", "latitude": 40.75170, "longitude": -73.99420}, {"id": "London", "latitude": 51.50722, "longitude": -0.12750}, {"id": "Bogota", "latitude": 4.63330, "longitude": -74.09990}, {"id": "Paris", "latitude": 48.85000, "longitude": 2.33330}]
			var points = prepare_points(cities)
			window.z = points
			// animate
			this.point_xy                 = points.point_xy               // Typed array of x, y pairs
			this.point_off_screen_color   = points.point_off_screen_color // Typed array of sets of four floating points
			this.point_on_screen_color    = points.point_on_screen_color;  // Typed array of sets of four floating points
			this.point_size               = points.point_size;

			this.pointArrayBuffer = gl.createBuffer();                                         // pointArrayBuffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.pointArrayBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, points.point_xy, gl.STATIC_DRAW);

			this.sizeArrayBuffer = gl.createBuffer();                                          // SizeArrayBuffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.sizeArrayBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, points.point_size, gl.STATIC_DRAW);

			this.colorArrayBuffer = gl.createBuffer();                                         // On screen ColorArrayBuffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorArrayBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, points.point_on_screen_color, gl.STATIC_DRAW);

			this.colorArrayBufferOffScreen = gl.createBuffer();                                 // Off screen ColorArrayBuffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorArrayBufferOffScreen);
			gl.bufferData(gl.ARRAY_BUFFER, points.point_off_screen_color, gl.STATIC_DRAW);
			// end animate


      gl.viewport(0, 0, canvas.width, canvas.height);



      this.gl = gl;
      this.program = program;
    }
  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      this.props = props;

      var leafletMap = this.context.map;

      var glLayer = _leaflet2.default.canvasLayer().delegate(this).addTo(leafletMap);

      return glLayer;
    }
  }, {
    key: 'onDrawLayer',
    value: function onDrawLayer(info) {
      var _this2 = this;

      if (this.gl == null) {
        this.setup(info.canvas);
      }
      var leafletMap = this.context.map;
      var program = this.program;
      var canvas = info.canvas;
      var gl = this.gl;
      var preparedData = this.preparedData;
			var pointArrayBuffer = this.pointArrayBuffer
			var sizeArrayBuffer = this.sizeArrayBuffer
			var colorArrayBuffer = this.colorArrayBuffer
			var colorArrayBufferOffScreen = this.colorArrayBufferOffScreen
			var point_xy = this.point_xy

			canvas.addEventListener('click', function(ev) {
				// var popup = ev.target.getPopup();
				// popup.setContent('message')
				// popup.update();
			  let x    = undefined;
			  let y    = undefined;
			  let top  = 0;
			  let left = 0;
			  let obj  = canvas;
			  while (obj && (obj.tagName !== "BODY")) {
			    top  += obj.offsetTop;
			    left += obj.offsetLeft;
			    obj   = obj.offsetParent;
			  }
			  left += window.pageXOffset;
			  top  -= window.pageYOffset;
			  x     = ev.clientX - left;
			  y     = canvas.clientHeight - (ev.clientY - top);
			  const pixels = new Uint8Array(4);
			  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);              // Load offscreen frame buffer for picking
			  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
			  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			  // const d = document.getElementById('infoWindow');
			  if (colorLookup[pixels[0] + " " + pixels[1] + " " + pixels[2]]) {
			    console.log(pixels);
			    // d.style.display = "inline";
			    // d.style.left    = ev.x + 10 + 'px';
			    // d.style.top     = (ev.y - 15) + 'px';
			    // return d.innerHTML     = colorLookup[pixels[0] + " " + pixels[1] + " " + pixels[2]];
			  } else {
			    // return d.style.display = "none";
			  }
			});

      gl.clear(gl.COLOR_BUFFER_BIT);
      // // look up the locations for the inputs to our shaders.
			// var attributeLoc = gl.getUniformLocation(program, 'worldCoord');
      // var attributeSize = gl.getAttribLocation(program, 'aPointSize')
      // var attributeCol = gl.getAttribLocation(program, 'color');
      var pixelsToWebGLMatrix = new Float32Array(16);
      // prettier-ignore
      pixelsToWebGLMatrix.set([2 / canvas.width, 0, 0, 0, 0, -2 / canvas.height, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1]);
      // Set viewport
      gl.viewport(0, 0, canvas.width, canvas.height);

      // TODO: unused
      // gl.vertexAttrib1f(gl.aPointSize, pointSize)

      // Set base matrix to translate canvas pixel coordinates -> webgl coordinates
      var mapMatrix = new Float32Array(16);
      mapMatrix.set(pixelsToWebGLMatrix);
      var bounds = leafletMap.getBounds();
      var topLeft = new _leaflet2.default.LatLng(bounds.getNorth(), bounds.getWest());
      var offset = LatLongToPixelXY(topLeft.lat, topLeft.lng);
      // Scale to current zoom
      var scale = Math.pow(2, leafletMap.getZoom());
      scaleMatrix(mapMatrix, scale, scale);
      translateMatrix(mapMatrix, -offset.x, -offset.y);

			// // attach matrix value to 'mapMatrix' uniform in shader
      var matrixLoc = gl.getUniformLocation(program, "mapMatrix");
      gl.uniformMatrix4fv(matrixLoc, false, mapMatrix);

      // // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
       //
       // Off SCREEN
       // Bind Shader attributes
       const height = 1024;
       const width  = 1024;
       // Creating a texture to store colors
       const texture = gl.createTexture();
       gl.bindTexture(gl.TEXTURE_2D, texture);
       gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

       // Creating a Renderbuffer to store depth information
       const renderbuffer = gl.createRenderbuffer();
       gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
       gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

       // Creating a framebuffer for offscreen rendering
       var framebuffer = gl.createFramebuffer();
       gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
       gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
       gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

       // Finally, we do a bit of cleaning up as usual
       gl.bindTexture(gl.TEXTURE_2D, null);
       gl.bindRenderbuffer(gl.RENDERBUFFER, null);
       gl.bindFramebuffer(gl.FRAMEBUFFER, null);
       //
       // OFF SCREEN
       // Bind Shader attributes
       gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
       gl.bindBuffer(gl.ARRAY_BUFFER, pointArrayBuffer);           // Bind world coord
       let attributeLoc = gl.getAttribLocation(program, "worldCoord");

       gl.enableVertexAttribArray(1);
       gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

       gl.bindBuffer(gl.ARRAY_BUFFER, sizeArrayBuffer);            // Bind point size
       let attributeSize = gl.getAttribLocation(program, "aPointSize");
       gl.enableVertexAttribArray(attributeSize);
       gl.vertexAttribPointer(attributeSize, 1, gl.FLOAT, false, 0, 0);

       gl.bindBuffer(gl.ARRAY_BUFFER, colorArrayBufferOffScreen);    // Bind point color
       let attributeCol = gl.getAttribLocation(program, "color");
       gl.enableVertexAttribArray(attributeCol);
       gl.vertexAttribPointer(attributeCol, 4, gl.FLOAT, false, 0, 0);

       // tell webgl how buffer is laid out (pairs of x,y coords)

       //l = current_service.rawPoints.length / 2
       let l = point_xy.length / 2;

       gl.drawArrays(gl.POINTS, 0, l);
       gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    //
    //    //
		// // //
		// On SCREEN
		// Bind Shader attributes
		gl.bindBuffer(gl.ARRAY_BUFFER, pointArrayBuffer);           // Bind world coord
		attributeLoc = gl.getAttribLocation(program, "worldCoord");
		gl.enableVertexAttribArray(attributeLoc);
		gl.vertexAttribPointer(attributeLoc, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, sizeArrayBuffer);            // Bind point size
		attributeSize = gl.getAttribLocation(program, "aPointSize");

		gl.enableVertexAttribArray(attributeSize);
		gl.vertexAttribPointer(attributeSize, 1, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, colorArrayBuffer);   // Bind point color
		attributeCol = gl.getAttribLocation(program, "color");
		gl.enableVertexAttribArray(attributeCol);
		gl.vertexAttribPointer(attributeCol, 4, gl.FLOAT, false, 0, 0);

		// tell webgl how buffer is laid out (pairs of x,y coords)

		l = point_xy.length / 2;
		gl.drawArrays(gl.POINTS, 0, l);
    }
  }]);

  return LayerGl;
}(_reactLeaflet.MapLayer);

exports.default = LayerGl;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Generic  Canvas Overlay for leaflet,
 Stanislav Sumbera, April , 2014

 - added userDrawFunc that is called when Canvas need to be redrawn
 - added few useful params fro userDrawFunc callback
  - fixed resize map bug
  inspired & portions taken from  :   https://github.com/Leaflet/Leaflet.heat


*/

_leaflet2.default.CanvasLayer = (_leaflet2.default.Layer ? _leaflet2.default.Layer : _leaflet2.default.Class).extend({
    // -- initialized is called on prototype
    initialize: function initialize(options) {
        this._map = null;
        this._canvas = null;
        this._frame = null;
        this._delegate = null;
        _leaflet2.default.setOptions(this, options);
    },

    delegate: function delegate(del) {
        this._delegate = del;
        return this;
    },

    needRedraw: function needRedraw() {
        if (!this._frame) {
            this._frame = _leaflet2.default.Util.requestAnimFrame(this.drawLayer, this);
        }
        return this;
    },

    //-------------------------------------------------------------
    _onLayerDidResize: function _onLayerDidResize(resizeEvent) {
        this._canvas.width = resizeEvent.newSize.x;
        this._canvas.height = resizeEvent.newSize.y;
    },
    //-------------------------------------------------------------
    _onLayerDidMove: function _onLayerDidMove() {
        var topLeft = this._map.containerPointToLayerPoint([0, 0]);
        _leaflet2.default.DomUtil.setPosition(this._canvas, topLeft);
        this.drawLayer();
    },
    //-------------------------------------------------------------
    getEvents: function getEvents() {
        var events = {
            resize: this._onLayerDidResize,
            moveend: this._onLayerDidMove
        };
        if (this._map.options.zoomAnimation && _leaflet2.default.Browser.any3d) {
            events.zoomanim = this._animateZoom;
        }

        return events;
    },
    //-------------------------------------------------------------
    onAdd: function onAdd(map) {
        this._map = map;
        this._canvas = _leaflet2.default.DomUtil.create('canvas', 'leaflet-layer');
        this.tiles = {};

        var size = this._map.getSize();
        this._canvas.width = size.x;
        this._canvas.height = size.y;

        var animated = this._map.options.zoomAnimation && _leaflet2.default.Browser.any3d;
        _leaflet2.default.DomUtil.addClass(this._canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

        map._panes.overlayPane.appendChild(this._canvas);

        map.on(this.getEvents(), this);

        var del = this._delegate || this;
        del.onLayerDidMount && del.onLayerDidMount(); // -- callback
        this.needRedraw();
    },

    //-------------------------------------------------------------
    onRemove: function onRemove(map) {
        var del = this._delegate || this;
        del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback


        map.getPanes().overlayPane.removeChild(this._canvas);

        map.off(this.getEvents(), this);

        this._canvas = null;
    },

    //------------------------------------------------------------
    addTo: function addTo(map) {
        map.addLayer(this);
        return this;
    },
    // --------------------------------------------------------------------------------
    LatLonToMercator: function LatLonToMercator(latlon) {
        return {
            x: latlon.lng * 6378137 * Math.PI / 180,
            y: Math.log(Math.tan((90 + latlon.lat) * Math.PI / 360)) * 6378137
        };
    },

    //------------------------------------------------------------------------------
    drawLayer: function drawLayer() {
        // -- todo make the viewInfo properties  flat objects.
        var size = this._map.getSize();
        var bounds = this._map.getBounds();
        var zoom = this._map.getZoom();

        var center = this.LatLonToMercator(this._map.getCenter());
        var corner = this.LatLonToMercator(this._map.containerPointToLatLng(this._map.getSize()));

        var del = this._delegate || this;
        del.onDrawLayer && del.onDrawLayer({
            layer: this,
            canvas: this._canvas,
            bounds: bounds,
            size: size,
            zoom: zoom,
            center: center,
            corner: corner
        });
        this._frame = null;
    },
    // -- L.DomUtil.setTransform from leaflet 1.0.0 to work on 0.0.7
    //------------------------------------------------------------------------------
    _setTransform: function _setTransform(el, offset, scale) {
        var pos = offset || new _leaflet2.default.Point(0, 0);

        el.style[_leaflet2.default.DomUtil.TRANSFORM] = (_leaflet2.default.Browser.ie3d ? 'translate(' + pos.x + 'px,' + pos.y + 'px)' : 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') + (scale ? ' scale(' + scale + ')' : '');
    },

    //------------------------------------------------------------------------------
    _animateZoom: function _animateZoom(e) {
        var scale = this._map.getZoomScale(e.zoom);
        // -- different calc of animation zoom  in leaflet 1.0.3 thanks @peterkarabinovic, @jduggan1
        var offset = _leaflet2.default.Layer ? this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(), e.zoom, e.center).min : this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        _leaflet2.default.DomUtil.setTransform(this._canvas, offset, scale);
    }
});

_leaflet2.default.canvasLayer = function () {
    return new _leaflet2.default.CanvasLayer();
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode) return triangles;

    var minX, minY, maxX, maxY, x, y, size;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and size are later used to transform coords into integers for z-order calculation
        size = Math.max(maxX - minX, maxY - minY);
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, size);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) return null;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && size) indexCurve(ear, minX, minY, size);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertice leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(ear, triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, size, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, size);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, size) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, size),
        maxZ = zOrder(maxTX, maxTY, minX, minY, size);

    // first look for points inside the triangle in increasing z-order
    var p = ear.nextZ;

    while (p && p.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.nextZ;
    }

    // then look for points in decreasing z-order
    p = ear.prevZ;

    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return p;
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, size) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, size);
                earcutLinked(c, triangles, dim, minX, minY, size);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) {
        if (hx >= p.x && p.x >= mx &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    }

    return m;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, size) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }

            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize === 0) {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                } else if (qSize === 0 || !q) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else if (p.z <= q.z) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and size of the data bounding box
function zOrder(x, y, minX, minY, size) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) / size;
    y = 32767 * (y - minY) / size;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
           locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    if ((equals(p1, q1) && equals(p2, q2)) ||
        (equals(p1, q2) && equals(p2, q1))) return true;
    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
           area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertice index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};


/***/ })
/******/ ]);
});
