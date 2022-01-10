var CropMyScreen;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cropper.js":
/*!************************!*\
  !*** ./src/cropper.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cropper)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let withPrefix;

const doCallback = (callback, params) => {
  if (callback && typeof callback === 'function') {
    callback.call(undefined, params);
  }
};

class Cropper {
  constructor(prefix) {
    _defineProperty(this, "containerEl", void 0);

    _defineProperty(this, "videoEl", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "_prefix", void 0);

    _defineProperty(this, "_containerId", 'container');

    this._prefix = prefix;

    withPrefix = id => {
      return `${prefix}-${id}`;
    };
  }

  render() {
    if (document.getElementById(`${this._prefix}-${this._containerId}`)) return;
    this.containerEl = this._createElement('div', withPrefix(this._containerId));
    this.videoEl = this._createElement('video', withPrefix('input'));
    this.canvas = this._createElement('canvas', withPrefix('output'));

    const {
      popup
    } = this._initPreviewer(this.canvas);

    this.videoEl.muted = true;
    this.containerEl.appendChild(this.videoEl);
    this.containerEl.appendChild(popup);

    this._togglePreviewer(false);

    document.body.appendChild(this.containerEl);
  }

  startStream(stream, constraints) {
    const {
      x,
      y,
      dx,
      dy
    } = constraints;
    const context = this.canvas.getContext('2d');

    this.videoEl.ontimeupdate = () => {
      this._cropFrame(context, this.videoEl, x, y, dx, dy);
    };

    this.videoEl.onpause = () => context.clearRect(0, 0, dx, dy);

    this.videoEl.onended = () => context.clearRect(0, 0, dx, dy);

    this.videoEl.srcObject = stream;
    this.videoEl.play();
    this.canvas.width = dx;
    this.canvas.height = dy;

    this._togglePreviewer(true);
  }

  stopStream() {
    this.videoEl.pause();

    this._togglePreviewer(false);
  }

  destroy() {
    this.containerEl.remove();
  }

  onStreamStarted(stream) {
    console.log(stream);
  }

  onStreamStopped() {}

  _cropFrame(context, video, startX, startY, endX, endY) {
    if (!context) return;
    context.drawImage(video, startX, startY, endX, endY, 0, 0, endX, endY);
  }

  _createElement(type, id) {
    const el = document.createElement(type);
    el.setAttribute('id', id);
    return el;
  }

  _initPreviewer(canvas) {
    const popup = this._createElement('div', withPrefix('preview'));

    const popupHeader = this._createElement('div', withPrefix('preview-header'));

    const popupFooter = this._createElement('div', withPrefix('preview-footer')); // HEADER BUTTONS


    const minimize = {
      id: withPrefix('btn-minimize'),
      text: 'Minimize',
      callback: (() => {
        let minimized = false;
        return () => {
          if (minimized) {
            canvas.classList.remove(withPrefix('hidden'));
            popupFooter.classList.remove(withPrefix('hidden'));
          } else {
            canvas.classList.add(withPrefix('hidden'));
            popupFooter.classList.add(withPrefix('hidden'));
          }

          minimized = !minimized;
        };
      })()
    };
    const close = {
      id: withPrefix('btn-close'),
      text: 'Close',
      callback: () => {
        // trigger onStreamCancel event
        this.stopStream();
        this.onStreamStopped();
      }
    };
    const shareArea = {
      id: withPrefix('btn-get-share-area'),
      text: 'Select Area',
      primary: false,
      visible: true,
      callback: () => console.log('Area selection is disabled')
    };
    const cancelArea = {
      id: withPrefix('btn-cancel-share-area'),
      text: 'Cancel',
      primary: false,
      callback: () => console.log('cancel'),
      visible: false
    };
    const shareStart = {
      id: withPrefix('btn-start-sharing'),
      text: 'Start presentation',
      primary: true,
      callback: () => {
        const stream = canvas.captureStream();
        this.onStreamStarted(stream);

        this._togglePreviewer(false);
      }
    };
    [minimize, close].forEach(btnSettings => {
      let btn = this._initHeaderButton(btnSettings);

      popupHeader.appendChild(btn);
    });
    [cancelArea, shareArea, shareStart].forEach(btnSettings => {
      let btn = this._initPreviewButton(btnSettings);

      popupFooter.appendChild(btn);
    });
    popup.appendChild(popupHeader);
    popup.appendChild(canvas);
    popup.appendChild(popupFooter);
    return {
      popup
    };
  }

  _initHeaderButton(_ref) {
    let {
      id,
      text,
      callback
    } = _ref;
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.innerText = text;

    btn.onclick = () => {
      doCallback(callback);
    };

    return btn;
  }

  _initPreviewButton(_ref2) {
    let {
      id,
      text,
      primary,
      visible,
      callback
    } = _ref2;
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.classList.add('btn');
    primary && btn.classList.add('btn-primary');
    btn.innerText = text;

    btn.onclick = () => {
      doCallback(callback);
    };

    if (visible === false) {
      btn.classList.add(withPrefix('hidden'));
    }

    return btn;
  }

  _togglePreviewer(status) {
    status ? this.containerEl.classList.remove(withPrefix('hidden')) : this.containerEl.classList.add(withPrefix('hidden'));
  }

}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/styles.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#crms-container {\n  position: absolute;\n  top: 70px;\n  left: 0;\n  /* right: 0; */\n  /* width: 300px;\n  height: 300px; */\n  z-index: 10;\n  border-radius: 5px;\n  /* overflow: hidden; */\n  box-shadow: 1px 1px 7px 0px #343434;\n}\n\n#crms-popup {\n\t\n}\n\n#crms-preview-header {\n\theight: 30px;\n\tcursor: grab;\n}\n\n#crms-preview-footer {\n\theight: 50px;\n\tpadding: 5px 10px;\n}\n\n#crms-input {\n\tdisplay: none;\n\tvisibility: hidden;\n}\n\n#crms-output {\n\tdisplay: block;\n  background-color: #6a6a6a;\n}\n\n/* #sharingScreen.visible {\n  display: block;\n} */\n\n /* screen share area selector */\n #backdrop-wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n\n#drag-markers-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.draggable {\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  cursor: move;\n  z-index: 2;\n}\n\n.btn {\n\tdisplay: inline-block;\n\tfont-weight: 400;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tborder: 1px solid #f8f9fa;\n\tpadding: .375rem .75rem;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tborder-radius: .25rem;\n\ttransition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n\tcolor: #212529;\n\tbackground-color: #f8f9fa;\n\tcursor: pointer;\n}\n\n.btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.btn-primary {\n\tcolor: #fff;\n\tbackground-color: #007bff;\n\tborder-color: #007bff;\n}\n.btn-primary:hover {\n\tbackground-color: #0069d9;\n\tborder-color: #0062cc;\n}\n\n/* end screen share area selector */\n#buttons {\n  position: absolute;\n  bottom: 0;\n  padding: 1rem;\n  background: #6a6a6a;\n  z-index: 999;\n}\n\n.crms-hidden {\n\tdisplay: none !important;\n\tvisibility: hidden;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,cAAc;EACd;kBACgB;EAChB,WAAW;EACX,kBAAkB;EAClB,sBAAsB;EACtB,mCAAmC;AACrC;;AAEA;;AAEA;;AAEA;CACC,YAAY;CACZ,YAAY;AACb;;AAEA;CACC,YAAY;CACZ,iBAAiB;AAClB;;AAEA;CACC,aAAa;CACb,kBAAkB;AACnB;;AAEA;CACC,cAAc;EACb,yBAAyB;AAC3B;;AAEA;;GAEG;;CAEF,+BAA+B;CAC/B;EACC,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;AACT;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,UAAU;AACZ;;AAEA;CACC,qBAAqB;CACrB,gBAAgB;CAChB,kBAAkB;CAClB,mBAAmB;CACnB,sBAAsB;CACtB,yBAAyB;CACzB,sBAAsB;CACtB,qBAAqB;CACrB,iBAAiB;CACjB,yBAAyB;CACzB,uBAAuB;CACvB,eAAe;CACf,gBAAgB;CAChB,qBAAqB;CACrB,8HAA8H;CAC9H,cAAc;CACd,yBAAyB;CACzB,eAAe;AAChB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,WAAW;CACX,yBAAyB;CACzB,qBAAqB;AACtB;AACA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA,mCAAmC;AACnC;EACE,kBAAkB;EAClB,SAAS;EACT,aAAa;EACb,mBAAmB;EACnB,YAAY;AACd;;AAEA;CACC,wBAAwB;CACxB,kBAAkB;AACnB","sourcesContent":["#crms-container {\n  position: absolute;\n  top: 70px;\n  left: 0;\n  /* right: 0; */\n  /* width: 300px;\n  height: 300px; */\n  z-index: 10;\n  border-radius: 5px;\n  /* overflow: hidden; */\n  box-shadow: 1px 1px 7px 0px #343434;\n}\n\n#crms-popup {\n\t\n}\n\n#crms-preview-header {\n\theight: 30px;\n\tcursor: grab;\n}\n\n#crms-preview-footer {\n\theight: 50px;\n\tpadding: 5px 10px;\n}\n\n#crms-input {\n\tdisplay: none;\n\tvisibility: hidden;\n}\n\n#crms-output {\n\tdisplay: block;\n  background-color: #6a6a6a;\n}\n\n/* #sharingScreen.visible {\n  display: block;\n} */\n\n /* screen share area selector */\n #backdrop-wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n\n#drag-markers-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.draggable {\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  cursor: move;\n  z-index: 2;\n}\n\n.btn {\n\tdisplay: inline-block;\n\tfont-weight: 400;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tborder: 1px solid #f8f9fa;\n\tpadding: .375rem .75rem;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tborder-radius: .25rem;\n\ttransition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n\tcolor: #212529;\n\tbackground-color: #f8f9fa;\n\tcursor: pointer;\n}\n\n.btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.btn-primary {\n\tcolor: #fff;\n\tbackground-color: #007bff;\n\tborder-color: #007bff;\n}\n.btn-primary:hover {\n\tbackground-color: #0069d9;\n\tborder-color: #0062cc;\n}\n\n/* end screen share area selector */\n#buttons {\n  position: absolute;\n  bottom: 0;\n  padding: 1rem;\n  background: #6a6a6a;\n  z-index: 999;\n}\n\n.crms-hidden {\n\tdisplay: none !important;\n\tvisibility: hidden;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cropper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cropper */ "./src/cropper.js");
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class CropMyScreen {
  // BACKDROP_COLOR;
  // CROP_X;
  // CROP_Y;
  // CROP_W;
  // CROP_H;
  // START_X;
  // START_Y;
  // END_X;
  // END_Y;
  constructor(options) {
    _defineProperty(this, "settings", void 0);

    _defineProperty(this, "cropper", void 0);

    this.settings = { ...this._defaultOptions(),
      ...(options || {})
    };
  }

  init() {
    // prepare and render all elements in DOM
    if (!this.cropper) {
      this.cropper = new _cropper__WEBPACK_IMPORTED_MODULE_0__["default"](CropMyScreen.prefix);
    }

    this.cropper.render();
  }

  start(stream) {
    console.log(stream);
    this.cropper.startStream(stream, {
      x: this.settings.cropX,
      y: this.settings.cropY,
      dx: this.settings.cropW,
      dy: this.settings.cropH
    });
    return new Promise((resolve, reject) => {
      this.cropper.onStreamStarted = stream => {
        resolve(stream);
      };

      this.cropper.onStreamStopped = () => {
        reject();
      };
    });
  }

  stop() {
    this.cropper.stopStream();
  }

  destroy() {
    // remove all DOM elements
    this.cropper.destroy();
  }

  _defaultOptions() {
    return {
      backdropColor: '#00000073',
      cropX: 0,
      cropY: 0,
      cropW: 640,
      cropH: 480,
      startX: 0,
      startY: 0,
      selectArea: false,
      previewerClass: ''
    };
  }

}

_defineProperty(CropMyScreen, "prefix", 'crms');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CropMyScreen);
})();

CropMyScreen = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=crop-my-screen.js.map