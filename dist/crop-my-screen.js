(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 740:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(537);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#crms-container {\n\tposition: absolute;\n\tleft: 0;\n\tbottom: 0;\n\twidth: 640px;\n\theight: 570px;\n\tz-index: 10;\n\tbackground: #fff;\n\tborder-radius: 5px;\n\toverflow: hidden;\n\tbox-shadow: 1px 1px 7px 0 #343434;\n\twill-change: transform;\n}\n\n#crms-canvas-wrap {\n\tdisplay: flex;\n\tjustify-content: center;\n\tbackground: #d3d3d3;\n}\n\n#crms-preview {\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: space-between;\n\tbackground: #d3d3d3;\n}\n\n#crms-preview-header {\n\theight: 30px;\n\tcursor: grab;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tbackground: #fff;\n}\n\n#crms-preview-footer {\n\theight: 50px;\n\tpadding: 5px 10px;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tbackground: #fff;\n}\n\n#crms-input {\n\tdisplay: none;\n\tvisibility: hidden;\n}\n\n#crms-output {\n\tdisplay: block;\n\tbackground-color: #6a6a6a;\n}\n\n/* #sharingScreen.visible {\n  display: block;\n} */\n\n/* screen share area selector */\n#backdrop-wrapper {\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1;\n}\n\n#drag-markers-container {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n}\n\n.draggable {\n\tposition: absolute;\n\twidth: 16px;\n\theight: 16px;\n\tcursor: move;\n\tz-index: 2;\n}\n\n.btn {\n\tdisplay: inline-block;\n\tfont-weight: 400;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tborder: 1px solid #f8f9fa;\n\tmargin: 0 .75rem;\n\tpadding: .375rem .75rem;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tborder-radius: .25rem;\n\ttransition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;\n\tcolor: #212529;\n\tbackground-color: #f8f9fa;\n\tcursor: pointer;\n}\n\n.btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.btn-primary {\n\tcolor: #fff;\n\tbackground-color: #007bff;\n\tborder-color: #007bff;\n}\n\n.btn-primary:hover {\n\tbackground-color: #0069d9;\n\tborder-color: #0062cc;\n}\n\n.icon-btn {\n\tbackground: none;\n\tborder: none;\n\toutline: none;\n\tpadding: 2px 7px;\n\tcursor: pointer;\n}\n\n.icon-btn.s20 {\n\tpadding: 4px 9px;\n}\n\n.icon-btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.icon-btn.s24 > svg {\n\twidth: 24px;\n\theight: 24px;\n}\n\n.icon-btn.s20 > svg {\n\twidth: 20px;\n\theight: 20px;\n}\n\n/* end screen share area selector */\n#buttons {\n\tposition: absolute;\n\tbottom: 0;\n\tpadding: 1rem;\n\tbackground: #6a6a6a;\n\tz-index: 999;\n}\n\n.crms-hidden {\n\tdisplay: none !important;\n\tvisibility: hidden;\n}\n\n.w100 {\n\twidth: 100%;\n}\n\n.h100 {\n\theight: 100%;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;CACC,kBAAkB;CAClB,OAAO;CACP,SAAS;CACT,YAAY;CACZ,aAAa;CACb,WAAW;CACX,gBAAgB;CAChB,kBAAkB;CAClB,gBAAgB;CAChB,iCAAiC;CACjC,sBAAsB;AACvB;;AAEA;CACC,aAAa;CACb,uBAAuB;CACvB,mBAAmB;AACpB;;AAEA;CACC,WAAW;CACX,YAAY;CACZ,aAAa;CACb,sBAAsB;CACtB,8BAA8B;CAC9B,mBAAmB;AACpB;;AAEA;CACC,YAAY;CACZ,YAAY;CACZ,aAAa;CACb,yBAAyB;CACzB,mBAAmB;CACnB,gBAAgB;AACjB;;AAEA;CACC,YAAY;CACZ,iBAAiB;CACjB,aAAa;CACb,yBAAyB;CACzB,mBAAmB;CACnB,gBAAgB;AACjB;;AAEA;CACC,aAAa;CACb,kBAAkB;AACnB;;AAEA;CACC,cAAc;CACd,yBAAyB;AAC1B;;AAEA;;GAEG;;AAEH,+BAA+B;AAC/B;CACC,eAAe;CACf,MAAM;CACN,OAAO;CACP,WAAW;CACX,YAAY;CACZ,UAAU;AACX;;AAEA;CACC,kBAAkB;CAClB,MAAM;CACN,OAAO;AACR;;AAEA;CACC,kBAAkB;CAClB,WAAW;CACX,YAAY;CACZ,YAAY;CACZ,UAAU;AACX;;AAEA;CACC,qBAAqB;CACrB,gBAAgB;CAChB,kBAAkB;CAClB,mBAAmB;CACnB,sBAAsB;CACtB,yBAAyB;CACzB,sBAAsB;CACtB,qBAAqB;CACrB,iBAAiB;CACjB,yBAAyB;CACzB,gBAAgB;CAChB,uBAAuB;CACvB,eAAe;CACf,gBAAgB;CAChB,qBAAqB;CACrB,iIAAiI;CACjI,cAAc;CACd,yBAAyB;CACzB,eAAe;AAChB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,WAAW;CACX,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,gBAAgB;CAChB,YAAY;CACZ,aAAa;CACb,gBAAgB;CAChB,eAAe;AAChB;;AAEA;CACC,gBAAgB;AACjB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,WAAW;CACX,YAAY;AACb;;AAEA;CACC,WAAW;CACX,YAAY;AACb;;AAEA,mCAAmC;AACnC;CACC,kBAAkB;CAClB,SAAS;CACT,aAAa;CACb,mBAAmB;CACnB,YAAY;AACb;;AAEA;CACC,wBAAwB;CACxB,kBAAkB;AACnB;;AAEA;CACC,WAAW;AACZ;;AAEA;CACC,YAAY;AACb","sourcesContent":["#crms-container {\n\tposition: absolute;\n\tleft: 0;\n\tbottom: 0;\n\twidth: 640px;\n\theight: 570px;\n\tz-index: 10;\n\tbackground: #fff;\n\tborder-radius: 5px;\n\toverflow: hidden;\n\tbox-shadow: 1px 1px 7px 0 #343434;\n\twill-change: transform;\n}\n\n#crms-canvas-wrap {\n\tdisplay: flex;\n\tjustify-content: center;\n\tbackground: #d3d3d3;\n}\n\n#crms-preview {\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: space-between;\n\tbackground: #d3d3d3;\n}\n\n#crms-preview-header {\n\theight: 30px;\n\tcursor: grab;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tbackground: #fff;\n}\n\n#crms-preview-footer {\n\theight: 50px;\n\tpadding: 5px 10px;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tbackground: #fff;\n}\n\n#crms-input {\n\tdisplay: none;\n\tvisibility: hidden;\n}\n\n#crms-output {\n\tdisplay: block;\n\tbackground-color: #6a6a6a;\n}\n\n/* #sharingScreen.visible {\n  display: block;\n} */\n\n/* screen share area selector */\n#backdrop-wrapper {\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1;\n}\n\n#drag-markers-container {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n}\n\n.draggable {\n\tposition: absolute;\n\twidth: 16px;\n\theight: 16px;\n\tcursor: move;\n\tz-index: 2;\n}\n\n.btn {\n\tdisplay: inline-block;\n\tfont-weight: 400;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tborder: 1px solid #f8f9fa;\n\tmargin: 0 .75rem;\n\tpadding: .375rem .75rem;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tborder-radius: .25rem;\n\ttransition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;\n\tcolor: #212529;\n\tbackground-color: #f8f9fa;\n\tcursor: pointer;\n}\n\n.btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.btn-primary {\n\tcolor: #fff;\n\tbackground-color: #007bff;\n\tborder-color: #007bff;\n}\n\n.btn-primary:hover {\n\tbackground-color: #0069d9;\n\tborder-color: #0062cc;\n}\n\n.icon-btn {\n\tbackground: none;\n\tborder: none;\n\toutline: none;\n\tpadding: 2px 7px;\n\tcursor: pointer;\n}\n\n.icon-btn.s20 {\n\tpadding: 4px 9px;\n}\n\n.icon-btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.icon-btn.s24 > svg {\n\twidth: 24px;\n\theight: 24px;\n}\n\n.icon-btn.s20 > svg {\n\twidth: 20px;\n\theight: 20px;\n}\n\n/* end screen share area selector */\n#buttons {\n\tposition: absolute;\n\tbottom: 0;\n\tpadding: 1rem;\n\tbackground: #6a6a6a;\n\tz-index: 999;\n}\n\n.crms-hidden {\n\tdisplay: none !important;\n\tvisibility: hidden;\n}\n\n.w100 {\n\twidth: 100%;\n}\n\n.h100 {\n\theight: 100%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


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

/***/ 537:
/***/ ((module) => {

"use strict";


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

/***/ 379:
/***/ ((module) => {

"use strict";


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

/***/ 569:
/***/ ((module) => {

"use strict";


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

/***/ 216:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 795:
/***/ ((module) => {

"use strict";


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

/***/ 589:
/***/ ((module) => {

"use strict";


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

/***/ }),

/***/ 271:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M7.724 65.49C13.36 55.11 21.79 46.47 32 40.56C39.63 36.15 48.25 33.26 57.46 32.33C59.61 32.11 61.79 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 93.79 .112 91.61 .3306 89.46C1.204 80.85 3.784 72.75 7.724 65.49V65.49zM48 416C48 424.8 55.16 432 64 432H448C456.8 432 464 424.8 464 416V224H48V416z\"></path></svg>"

/***/ }),

/***/ 437:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M0 456C0 442.7 10.75 432 24 432H488C501.3 432 512 442.7 512 456C512 469.3 501.3 480 488 480H24C10.75 480 0 469.3 0 456z\"></path></svg>"

/***/ }),

/***/ 56:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><path d=\"M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z\"></path></svg>"

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: ./src/util.js
/**
 * Prefix for the plugin related CSS selectors
 * @type {string}
 */
const prefix = 'crms';
/**
 * Get browser name from user agent
 * @returns {string}
 */

function getUserAgent() {
  let ua;
  const sUsrAg = navigator.userAgent;

  if (sUsrAg.indexOf('Firefox') > -1) {
    ua = 'Firefox';
  } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
    ua = 'Samsung Internet';
  } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
    ua = 'Opera';
  } else if (sUsrAg.indexOf('Trident') > -1) {
    ua = 'IE';
  } else if (sUsrAg.indexOf('Edge') > -1) {
    ua = 'EdgeLegacy)';
  } else if (sUsrAg.indexOf('Edg') > -1) {
    ua = 'Edge';
  } else if (sUsrAg.indexOf('Chrome') > -1) {
    ua = 'Chrome';
  } else if (sUsrAg.indexOf('Safari') > -1) {
    ua = 'Safari';
  } else {
    ua = 'unknown';
  }

  return ua;
}
/**
 * Get distance between the browser top-left corner and the top-left corner of the main monitor
 * @returns {{top: number, left: number}}
 */


function getScreenOffset() {
  return {
    // includes the browser's tab bar
    top: window.screenY + getBrowserHeaderSize(),
    left: window.screenX < 0 ? 0 : window.screenX
  };
}
/**
 * Get the browser top bar size
 * IMPORTANT - THIS METHOD IS NOT IDEAL AS IT ALSO COUNTS THE BROWSER BOTTOM BAR IF IT EXISTS
 * @returns {number}
 */


function getBrowserHeaderSize() {
  return window.outerHeight - window.innerHeight;
}
/**
 * Get aspect ration
 * @param {number} width
 * @param {number} height
 * @returns {number}
 */


function getRatio(width, height) {
  return width / height > 1 ? aspectRationEnum.landscape : aspectRationEnum.portrait;
}
/**
 * Add plugin prefix to the string id
 * @param {string} id
 * @returns {string}
 */


function withPrefix(id) {
  return `${prefix}-${id}`;
}
/**
 * Call callback function with provided parameters
 * @param {Function} callback
 * @param {any} params
 */


function doCallback(callback, params) {
  if (callback && typeof callback === 'function') {
    callback.call(this, params);
  }
}
/**
 * Human readable values for aspect ratio
 * @type {{portrait: number, landscape: number}}
 */


const aspectRationEnum = {
  landscape: 1,
  portrait: 2
};

;// CONCATENATED MODULE: ./src/area-selector.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * AreaSelector provides the ability for users to select the cropping area.
 * It creates visual elements and controls to select a rectangle.
 * Area selection is represented by two approaches:
 * 1) by drawing the square
 * 2) by resizing the existing area
 *
 * AreaSelector uses two canvases - one for backdrop and another as a mask for the selected area.
 * Additionally, AreaSelector creates several UI elements (drag points) for moving area around the window.
 * @property {boolean} resizing - Defines area resizing state
 * @property {boolean} drawing - Defines area drawing state
 * @property {HTMLDivElement} dragPoint - The element that user selects to resize the area
 * @property {HTMLCanvasElement} backdropCanvas - Backdrop canvas element
 * @property {CanvasRenderingContext2D} backdropCtx - Backdrop canvas context
 * @property {number} START_X - Area rectangle top-left point (X-asis)
 * @property {number} START_Y - Area rectangle top-left point (Y-asis)
 * @property {number} END_X - Area rectangle bottom-right point (X-asis)
 * @property {number} END_Y - Area rectangle bottom-right point (Y-asis)
 * @property {number} CROP_W - Area rectangle width
 * @property {number} CROP_H - Area rectangle height
 * @property {string} BACKDROP_COLOR - Backdrop canvas color in HEX format with alpha channel (ex. #00000093)
 */

class AreaSelector {
  constructor() {
    _defineProperty(this, "resizing", false);

    _defineProperty(this, "drawing", false);

    _defineProperty(this, "dragPoint", void 0);

    _defineProperty(this, "backdropCanvas", void 0);

    _defineProperty(this, "backdropCtx", void 0);

    _defineProperty(this, "START_X", void 0);

    _defineProperty(this, "START_Y", void 0);

    _defineProperty(this, "END_X", void 0);

    _defineProperty(this, "END_Y", void 0);

    _defineProperty(this, "CROP_W", void 0);

    _defineProperty(this, "CROP_H", void 0);

    _defineProperty(this, "BACKDROP_COLOR", void 0);
  }

  /**
   * Initialize and render UI elements - backdrop, selected area and drag points
   * Attach mouse events for area drawing
   * @param {{
   *   x: number,
   *   y: number,
   *   dx: number,
   *   dy: number
   * }} constraints - Predefined area constraints
   */
  init(constraints) {
    if (!constraints) {
      this.START_X = 0;
      this.START_Y = 0;
    } else {
      this.START_X = constraints.x || 0;
      this.START_Y = constraints.y || 0;
      this.CROP_W = constraints.dx || 0;
      this.CROP_H = constraints.dy || 0;
      this.END_X = this.START_X + this.CROP_W;
      this.END_Y = this.START_Y + this.CROP_H;
    }

    this._drawBackDrop(true); // screen-sharing area selection start


    this.areaSelectionStart = e => {
      e.preventDefault();
      e.stopPropagation(); // prevent area selection if a user initiated area resizing or clicks on buttons in the previewer

      if (e.target.classList.contains(withPrefix('control')) || this.resizing) {
        return;
      }

      document.querySelectorAll('.draggable').forEach(el => el.remove());
      this.drawing = true;
      this.START_X = e.clientX;
      this.START_Y = e.clientY;
    }; // screen-sharing area selection end


    this.areaSelectionEnd = e => {
      e.preventDefault();
      e.stopPropagation(); // prevent area selection if a user clicks on buttons in the previewer

      if (e.target.classList.contains(withPrefix('control'))) {
        return;
      }

      if (this.resizing) {
        this.resizing = false;

        this._swapCoordinates();

        this._drawResizeMarkers(this.backdropCtx);
      }

      if (this.drawing) {
        this.drawing = false; // if user did not move the mouse

        if (e.clientX === this.START_X && e.clientY === this.START_Y) {
          return;
        }

        this._swapCoordinates();

        this._drawResizeMarkers(this.backdropCtx);
      }
    }; // screen-sharing area selection


    this.areaSelectionMouseMove = e => {
      e.preventDefault();
      e.stopPropagation();

      if (this.resizing) {
        this._areaResize(e);

        this._drawArea();

        return;
      }

      if (!this.drawing) {
        return;
      } // calculate the rectangle width/height based
      // on starting vs current mouse position


      this.CROP_W = e.clientX - this.START_X;
      this.CROP_H = e.clientY - this.START_Y;
      this.END_X = e.clientX;
      this.END_Y = e.clientY;

      this._drawArea();
    };

    document.addEventListener('mousedown', this.areaSelectionStart);
    document.addEventListener('mouseup', this.areaSelectionEnd);
    document.addEventListener('mousemove', this.areaSelectionMouseMove);
  }
  /**
   * Get selected area coordinates.
   * @returns {{dx: number, dy: number, x: number, y: number}}
   */


  getCoords() {
    return {
      x: this.START_X,
      y: this.START_Y,
      dx: this.CROP_W,
      dy: this.CROP_H
    };
  }
  /**
   * Clean up AreaSelector
   */


  destroy() {
    try {
      this._remove();
    } catch (_) {// I want application to not crush, but don't care about the message
    }
  }
  /**
   * Remove UI elements and clear event listeners
   * @private
   */


  _remove() {
    if (this.areaSelectionStart) {
      document.removeEventListener('mousedown', this.areaSelectionStart, false);
      this.areaSelectionStart = null;
    }

    if (this.areaSelectionEnd) {
      document.removeEventListener('mouseup', this.areaSelectionEnd, false);
      this.areaSelectionEnd = null;
    }

    if (this.areaSelectionMouseMove) {
      document.removeEventListener('mousemove', this.areaSelectionMouseMove, false);
      this.areaSelectionMouseMove = null;
    }

    document.getElementById('backdrop-wrapper').remove();
  }
  /**
   * Init and render or clear backdrop canvas and related UI elements
   * @param {boolean} status - Render or clear the backdrop
   * @private
   */


  _drawBackDrop(status) {
    if (!status) {
      const backdrop = document.getElementById('backdrop-wrapper');
      backdrop && document.body.removeChild(backdrop);
      this.backdropCtx = null;
      return;
    }

    const backdropWrapper = document.createElement('div');
    backdropWrapper.setAttribute('id', 'backdrop-wrapper');
    document.body.appendChild(backdropWrapper);
    this.backdropCanvas = document.createElement('canvas');
    this.backdropCanvas.width = backdropWrapper.clientWidth;
    this.backdropCanvas.height = backdropWrapper.clientHeight;
    this.dragMarkersContainer = document.createElement('div');
    this.dragMarkersContainer.setAttribute('id', 'drag-markers-container');
    backdropWrapper.appendChild(this.backdropCanvas);
    backdropWrapper.appendChild(this.dragMarkersContainer);
    this.backdropCtx = this.backdropCanvas.getContext('2d');
    this.backdropCtx.fillStyle = this.BACKDROP_COLOR;
    this.backdropCtx.fillRect(0, 0, this.backdropCanvas.width, this.backdropCanvas.height);

    this._drawArea();

    this._drawResizeMarkers(this.backdropCtx);
  }
  /**
   * Init and render selected area
   * @private
   */


  _drawArea() {
    this.backdropCtx.clearRect(0, 0, this.backdropCanvas.width, this.backdropCanvas.height);
    this.backdropCtx.fillStyle = this.BACKDROP_COLOR;
    this.backdropCtx.fillRect(0, 0, this.backdropCanvas.width, this.backdropCanvas.height);
    this.backdropCtx.globalCompositeOperation = 'destination-out'; // cut area from backdrop

    this.backdropCtx.fillStyle = 'red';
    this.backdropCtx.fillRect(this.START_X, this.START_Y, this.CROP_W, this.CROP_H);
    this.backdropCtx.globalCompositeOperation = 'source-over'; // draw selected area border

    this.backdropCtx.strokeStyle = 'rgb(163, 9, 9)';
    this.backdropCtx.setLineDash([6]);
    this.backdropCtx.lineWidth = '3';
    this.backdropCtx.strokeRect(this.START_X, this.START_Y, this.CROP_W, this.CROP_H);
  }
  /**
   * Swap coordinates in case drawing/resizing moved in the opposite direction
   * @private
   */


  _swapCoordinates() {
    if (this.END_X < this.START_X) {
      const c = this.START_X;
      this.START_X = this.END_X;
      this.END_X = c;
      this.CROP_W = this.END_X - this.START_X;
    }

    if (this.END_Y < this.START_Y) {
      const c = this.START_Y;
      this.START_Y = this.END_Y;
      this.END_Y = c;
      this.CROP_H = this.END_Y - this.START_Y;
    }
  }
  /**
   * Init and render resize markers around the selected area. Attack mouse events to these points
   * @param {CanvasRenderingContext2D} ctx - Backdrop canvas context
   * @private
   */


  _drawResizeMarkers(ctx) {
    const size = 8;
    const offset = size / 2;
    ctx.fillStyle = 'rgb(180, 9, 9)';
    const points = {
      topLeft: {
        type: 0,
        values: [this.START_X - offset, this.START_Y - offset]
      },
      topCenter: {
        type: 1,
        values: [this.START_X + (this.CROP_W / 2 - offset), this.START_Y - offset]
      },
      topRight: {
        type: 0,
        values: [this.END_X - offset, this.START_Y - offset]
      },
      rightCenter: {
        type: 1,
        values: [this.END_X - offset, this.START_Y + (this.CROP_H / 2 - offset)]
      },
      bottomRight: {
        type: 0,
        values: [this.END_X - offset, this.END_Y - offset]
      },
      bottomCenter: {
        type: 1,
        values: [this.START_X + (this.CROP_W / 2 - offset), this.END_Y - offset]
      },
      bottomLeft: {
        type: 0,
        values: [this.START_X - offset, this.END_Y - offset]
      },
      leftCenter: {
        type: 1,
        values: [this.START_X - offset, this.START_Y + (this.CROP_H / 2 - offset)]
      }
    };

    for (let [key, point] of Object.entries(points)) {
      ctx.fillRect(point.values[0], point.values[1], size, size);
      const el = document.createElement('div');
      el.classList.add('draggable');
      el.setAttribute('side', key);
      point.type > 0 ? el.classList.add('side') : el.classList.add('corner');
      el.style.top = point.values[1] - offset + 'px';
      el.style.left = point.values[0] - offset + 'px';
      this.dragMarkersContainer.appendChild(el);
    }

    document.querySelectorAll('.draggable').forEach(el => {
      el.addEventListener('mousedown', this._areaResizeStart.bind(this));
    });
  }
  /**
   * Start resizing the area. Define drag point
   * @param {MouseEvent} e
   * @private
   */


  _areaResizeStart(e) {
    e.preventDefault();
    e.stopPropagation();
    this.resizing = true;
    this.dragPoint = e.target;
    document.querySelectorAll('.draggable').forEach(el => {
      el.removeEventListener('mousedown', this._areaResizeStart);
      el.remove();
    });
  }
  /**
   * Resize the area based on the drag point type
   * @param {MouseWheelEvent} e
   * @private
   */


  _areaResize(e) {
    const pointSide = this.dragPoint.getAttribute('side');

    switch (pointSide) {
      case 'topLeft':
        {
          const deltaX = e.clientX - this.START_X;
          const deltaY = e.clientY - this.START_Y;
          this.CROP_W = this.CROP_W - deltaX;
          this.CROP_H = this.CROP_H - deltaY;
          this.START_X = e.clientX;
          this.START_Y = e.clientY;
          break;
        }

      case 'topCenter':
        {
          const deltaY = e.clientY - this.START_Y;
          this.CROP_H = this.CROP_H - deltaY;
          this.START_Y = e.clientY;
          break;
        }

      case 'topRight':
        {
          const deltaX = e.clientX - this.END_X;
          const deltaY = e.clientY - this.START_Y;
          this.CROP_W = this.CROP_W + deltaX;
          this.CROP_H = this.CROP_H - deltaY;
          this.END_X = e.clientX;
          this.START_Y = e.clientY;
          break;
        }

      case 'rightCenter':
        {
          const deltaX = e.clientX - this.END_X;
          this.CROP_W = this.CROP_W + deltaX;
          this.END_X = e.clientX;
          break;
        }

      case 'bottomRight':
        {
          const deltaX = e.clientX - this.END_X;
          const deltaY = e.clientY - this.END_Y;
          this.CROP_W = this.CROP_W + deltaX;
          this.CROP_H = this.CROP_H + deltaY;
          this.END_X = e.clientX;
          this.END_Y = e.clientY;
          break;
        }

      case 'bottomCenter':
        {
          const deltaY = e.clientY - this.END_Y;
          this.CROP_H = this.CROP_H + deltaY;
          this.END_Y = e.clientY;
          break;
        }

      case 'bottomLeft':
        {
          const deltaX = e.clientX - this.START_X;
          const deltaY = e.clientY - this.END_Y;
          this.CROP_W = this.CROP_W - deltaX;
          this.CROP_H = this.CROP_H + deltaY;
          this.START_X = e.clientX;
          this.END_Y = e.clientY;
          break;
        }

      case 'leftCenter':
        {
          const deltaX = e.clientX - this.START_X;
          this.CROP_W = this.CROP_W - deltaX;
          this.START_X = e.clientX;
          break;
        }
    }
  }

}
;// CONCATENATED MODULE: ./src/window-manager.js
function window_manager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * WindowManager is responsible for positioning the preview window.
 * It allows users to move the popup across the page, to minimize the window, etc.
 * Also, it applies additional calculation for preview window elements size to fit canvas properly.
 *
 * @property {boolean} _isMoving - Determines if window is being moved by user
 * @property {x: number, y: number} _startCoords - Starting point of the window movement
 * @property {x: number, y: number} _translateOffset - Final distance on which the window has been moved. Is being used for CSS property 'translate'
 * @property {number} _deltaX - The distance between starting and ending points of window movement in the X-axis
 * @property {number} _deltaY - The distance between starting and ending points of window movement in the Y-axis
 * @property {HTMLDivElement} _dragZone - The Element that listens user input events
 * @property {HTMLDivElement} _container - Instance of main container object
 */

class WindowManager {
  constructor(container) {
    window_manager_defineProperty(this, "_isMoving", void 0);

    window_manager_defineProperty(this, "_startCoords", void 0);

    window_manager_defineProperty(this, "_translateOffset", void 0);

    window_manager_defineProperty(this, "_deltaX", void 0);

    window_manager_defineProperty(this, "_deltaY", void 0);

    window_manager_defineProperty(this, "_dragZone", void 0);

    window_manager_defineProperty(this, "_container", void 0);

    this._container = container;
    this._dragZone = container.querySelector('.window-move');

    if (!this._container || !this._dragZone) {
      console.error('WindowManager: Container is not available');
      throw new Error('WindowManager: Container is not available');
    }
  }
  /**
   * Initialize UI elements and other objects
   * Attach mouse events to the responsible DOM node
   */


  init() {
    this._isMoving = false;
    this._startCoords = {
      x: 0,
      y: 0
    };
    this._translateOffset = {
      x: 0,
      y: 0
    };
    this._deltaX = this._deltaY = 0;

    this._limitCanvasWrap();

    this._dragZone.addEventListener('mousedown', this._mouseDown.bind(this));

    document.addEventListener('mousemove', this._moveMove.bind(this));
    document.addEventListener('mouseup', this._mouseUp.bind(this));
  }
  /**
   * Prevent the canvas from moving outside the parent container.
   * For landscape mode the canvas must be aligned horizontally - (grey zones appear on the left and right sides)
   * For portrait mode the canvas must be aligned vertically - (grey zones appear on the top and bottom sides)
   * @param {HTMLCanvasElement} canvasEl - Cropping canvas
   */


  fitCanvas(canvasEl) {
    let offset;

    const applyStyles = condition => {
      if (condition) {
        canvasEl.classList.add('w100', 'h100');
      } else {
        canvasEl.classList.add('h100');
        canvasEl.classList.remove('w100');
      }
    };

    try {
      offset = this._getHeaderFooterOffset();
    } catch (_) {
      offset = 0;
    }

    const containerWidth = this._container.clientWidth;
    const containerHeight = this._container.clientHeight - offset;
    const containerRatio = getRatio(containerWidth, containerHeight);

    if (containerRatio === aspectRationEnum.portrait) {
      applyStyles(canvasEl.width > containerWidth);
    }

    if (containerRatio === aspectRationEnum.landscape) {
      applyStyles(canvasEl.width > containerWidth && canvasEl.height < containerHeight);
    }
  }
  /**
   * Minimize the preview window by toggling the visibility of the canvas and footer blocks.
   * @param {boolean} status - Show or hide elements
   */


  minimize(status) {
    if (status) {
      const header = this._container.querySelector(`#${withPrefix('preview-header')}`);

      const headerHeight = header && header.clientHeight;
      this._container.style.height = headerHeight ? headerHeight + 'px' : this._container.clientHeight + 'px';
    } else {
      this._container.style.removeProperty('height');
    }
  }
  /**
   * Remove UI elements and event listeners
   */


  destroy() {
    try {
      this._dragZone.removeEventListener('mousedown', this._mouseDown);

      document.removeEventListener('mousemove', this._moveMove);
      document.removeEventListener('mouseup', this._mouseUp);

      this._dragZone.remove();

      this._container = null;
      this._dragZone = null;
    } catch (e) {// I want application to not crush, but don't care about the message
    }
  }
  /**
   * Start moving the window.
   * Collect starting points
   * @param {MouseEvent} event
   * @private
   */


  _mouseDown(event) {
    event.stopPropagation();
    this._isMoving = true;
    this._dragZone.style.cursor = 'grabbing';
    this._startCoords.x = event.clientX;
    this._startCoords.y = event.clientY;
  }
  /**
   * Move the window.
   * Calculate distance between staring points and the cursor.
   * Apply transformation to the window.
   * @param {MouseEvent} event
   * @private
   */


  _moveMove(event) {
    event.stopPropagation();

    if (!this._isMoving) {
      return;
    }

    this._deltaX = event.clientX - this._startCoords.x;
    this._deltaY = event.clientY - this._startCoords.y;
    this._container.style.transform = `translate(${this._deltaX + this._translateOffset.x}px, ${this._deltaY + this._translateOffset.y}px)`;
  }
  /**
   * End moving the window
   * @private
   */


  _mouseUp(event) {
    event.stopPropagation();

    if (this._isMoving) {
      this._isMoving = false;
      this._dragZone.style.cursor = 'grab';
      this._translateOffset.x += this._deltaX;
      this._translateOffset.y += this._deltaY;
    }
  }
  /**
   * Apply max-width and max-height CSS properties to the canvas wrapper Element based on the main container size.
   * It helps to position and scale the canvas correctly inside the preview window (without touching the canvas size directly).
   * @private
   */


  _limitCanvasWrap() {
    const wrapEl = this._container.querySelector(`#${withPrefix('canvas-wrap')}`);

    let error, offset;

    try {
      offset = this._getHeaderFooterOffset();
    } catch (e) {
      error = e;
      offset = 0;
    }

    if (!wrapEl) error = 'WindowManager: Canvas wrap element not found';

    if (error) {
      console.error(error);
      throw new Error(error);
    }

    wrapEl.style.maxWidth = this._container.clientWidth + 'px';
    wrapEl.style.maxHeight = this._container.clientHeight - offset + 'px';
  }
  /**
   * Get the height of the header and footer blocks of the preview window.
   * @returns {number} - The offset value
   * @private
   */


  _getHeaderFooterOffset() {
    try {
      const headerHeight = this._container.querySelector(`#${withPrefix('preview-header')}`).clientHeight;

      const footerHeight = this._container.querySelector(`#${withPrefix('preview-footer')}`).clientHeight;

      return headerHeight + footerHeight;
    } catch (e) {
      throw new Error('WindowManager: Can\'t obtaint header & footer height');
    }
  }

}
// EXTERNAL MODULE: ./src/assets/xmark.svg
var xmark = __webpack_require__(56);
var xmark_default = /*#__PURE__*/__webpack_require__.n(xmark);
// EXTERNAL MODULE: ./src/assets/window-minimize.svg
var window_minimize = __webpack_require__(437);
var window_minimize_default = /*#__PURE__*/__webpack_require__.n(window_minimize);
// EXTERNAL MODULE: ./src/assets/window-maximize.svg
var window_maximize = __webpack_require__(271);
var window_maximize_default = /*#__PURE__*/__webpack_require__.n(window_maximize);
;// CONCATENATED MODULE: ./src/cropper.js
function cropper_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







/**
 * This class renders UI elements and does the main job in the cropping process.
 * Cropper creates the <video> element in which the MediaStream has been placed.
 * When the video starts playing the Cropper gets data per frame and put it into the canvas in the preview window.
 * The Cropper crops the canvas by specified constraints and extracts media stream from it via
 * 'canvas.captureStream()' method.
 * In the future it might be possible to put MediaStream directly into the Canvas by passing it through the MediaStreamTrackProcessor
 * which is a part of WebCodec API. The example is here https://stackoverflow.com/a/56095482
 *
 * @property {{x: number, y: number, dx: number, dy: number}} constraints - Area to crop
 * @property {AreaSelector} areaSelector - Instance of AreaSelector class
 * @property {WindowManager} windowManager - Instance of WindowManager class
 * @property {HTMLDivElement} containerEl - Instance of main DOM element
 * @property {HTMLVideoElement} videoEl - Instance of video
 * @property {HTMLCanvasElement} canvas - Instance of canvas
 * @property {string} displaySurfaceType - Property of the  MediaTrackSettings dictionary. Defines what surface type
 *                                         of the Screenshare API has been selected. Possible values:
 *                                         - 'monitor',
 *                                         - 'browser',
 *                                         - 'tab',
 *                                         - 'undefined' - as Firefox does not support this property yet
 * @property {
 *    {1: Array<HTMLButtonElement>, 2: Array<HTMLButtonElement>}
 *  } buttonGroup - Splits footer buttons into two groups. Hides one of the groups on demand
 *
 *
 */

class Cropper {
  constructor() {
    cropper_defineProperty(this, "constraints", void 0);

    cropper_defineProperty(this, "areaSelector", void 0);

    cropper_defineProperty(this, "windowManager", void 0);

    cropper_defineProperty(this, "containerEl", void 0);

    cropper_defineProperty(this, "videoEl", void 0);

    cropper_defineProperty(this, "canvas", void 0);

    cropper_defineProperty(this, "displaySurfaceType", void 0);

    cropper_defineProperty(this, "buttonGroup", {
      1: [],
      2: []
    });

    this.areaSelector = new AreaSelector();
  }
  /**
   * Initialize and render UI elements.
   * Initialize additional modules like WindowManager and AreaSelector
   * @param {string} customClass - CSS class attached to the main container
   * @param {string} backdropColor - HEX color for the canvas backdrop of the AreaSelector
   */


  render(_ref) {
    let {
      customClass,
      backdropColor
    } = _ref;
    const containerId = 'container';
    if (document.getElementById(withPrefix(containerId))) return;
    this.containerEl = this._createElement('div', withPrefix(containerId));
    customClass && this.containerEl.classList.add(customClass);
    this.videoEl = this._createElement('video', withPrefix('input'));
    this.canvas = this._createElement('canvas', withPrefix('output'));

    const popup = this._initPreviewer(this.canvas);

    this.videoEl.muted = true;
    this.containerEl.appendChild(this.videoEl);
    this.containerEl.appendChild(popup);

    this._togglePreviewer(false);

    document.body.appendChild(this.containerEl);
    this.windowManager = new WindowManager(this.containerEl);
    this.areaSelector.BACKDROP_COLOR = backdropColor;
  }
  /**
   * Put stream into video element. Define canvas width/height based on provided constraints.
   * Start cropping process
   * @param {MediaStream} stream - Video stream object from Screenshare API
   * @param {{
   *   x: number,
   *   y: number,
   *   dx: number,
   *   dy: number
   * }} constraints - Constraints for the canvas
   */


  startStream(stream, constraints) {
    const {
      dx,
      dy
    } = constraints;
    const context = this.canvas.getContext('2d');
    const streamSettings = stream.getVideoTracks()[0].getSettings();
    this.displaySurfaceType = streamSettings && streamSettings.displaySurface;
    this.constraints = this._correctCoordinates(constraints, true);

    this.videoEl.ontimeupdate = () => {
      this._cropFrame(context, this.videoEl);
    };

    this.videoEl.onpause = () => context.clearRect(0, 0, dx, dy);

    this.videoEl.onended = () => context.clearRect(0, 0, dx, dy);

    this.videoEl.srcObject = stream;
    this.videoEl.play();
    this.canvas.width = dx;
    this.canvas.height = dy;

    this._togglePreviewer(true);

    this.windowManager.init();
    this.windowManager.fitCanvas(this.canvas);
  }
  /**
   * Stop cropping process. Clear video element and hide preview window
   */


  stopStream() {
    try {
      const tracks = this.videoEl.srcObject.getTracks();
      (tracks || []).forEach(t => t.stop());
      this.videoEl.srcObject = null;

      this._togglePreviewer(false);
    } catch (e) {// I want application to not crush, but don't care about the message
    }
  }
  /**
   * Delete all plugin modules. Clear the UI
   */


  destroy() {
    try {
      this.areaSelector.destroy();
      this.windowManager.destroy();
      this.containerEl.remove();
    } catch (e) {// I want application to not crush, but don't care about the message
    }
  }
  /**
   * Event. Notifies when crop is done and stream is ready
   * @param {MediaStream} stream - Cropped stream
   */
  // eslint-disable-next-line


  onStreamStarted(stream) {}
  /**
   * Event. Notifies when crop is stopped
   */


  onStreamStopped() {}
  /**
   * Modify the canvas element
   * @param {CanvasRenderingContext2D} context - Canvas context object
   * @param {HTMLVideoElement} video - Video element with original stream
   * @private
   */


  _cropFrame(context, video) {
    if (!context) return;
    const {
      x: startX,
      y: startY,
      dx: cropW,
      dy: cropH
    } = this.constraints;
    context.drawImage(video, startX, startY, cropW, cropH, 0, 0, cropW, cropH);
  }
  /**
   * Create DOM element with provided id
   * @param {string} type - DOM element type
   * @param {string} id - ID name
   * @returns {HTMLElement}
   * @private
   */


  _createElement(type, id) {
    const el = document.createElement(type);
    el.setAttribute('id', id);
    return el;
  }
  /**
   * Render preview window. Defines popup header and footer with buttons
   * @param {HTMLCanvasElement} canvas - Canvas object
   * @returns {HTMLElement} - popup window element
   * @private
   */


  _initPreviewer(canvas) {
    const popup = this._createElement('div', withPrefix('preview'));

    const canvasWrap = this._createElement('div', withPrefix('canvas-wrap'));

    const popupHeader = this._createElement('div', withPrefix('preview-header'));

    const popupFooter = this._createElement('div', withPrefix('preview-footer'));

    popupHeader.classList.add('window-move');

    this._headerButtonsConfig.forEach(btnSettings => {
      let btn = this._renderHeaderButton(btnSettings);

      popupHeader.append(btn);
    });

    this._footerButtonsConfig.forEach(btnSettings => {
      let btn = this._renderFooterButton(btnSettings);

      popupFooter.append(btn);
    });

    canvasWrap.append(canvas);
    popup.append(popupHeader, canvasWrap, popupFooter);
    return popup;
  }
  /**
   * Initialize and render the button in the preview header.
   * Add event handlers for the button.
   * @param {string} id - Button id name
   * @param {string} icon - Icon in SVG format
   * @param {Function} callback - Event handler
   * @param {string} iconSize - CSS class that defines the size of the icon (possible values s20 and s24)
   * @returns {HTMLButtonElement} - Button element
   * @private
   */


  _renderHeaderButton(_ref2) {
    let {
      id,
      icon,
      callback,
      iconSize
    } = _ref2;
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.classList.add('crms-control', 'icon-btn');
    iconSize && btn.classList.add(iconSize);
    btn.innerHTML = icon; // prevent window reposition event fire

    btn.onmousedown = event => {
      event.stopPropagation();
    };

    btn.onclick = event => {
      doCallback(callback, event.currentTarget);
    };

    return btn;
  }
  /**
   * Initialize and render the button in the preview footer.
   * @param {string} id - Button id name
   * @param {string} text - Button text value
   * @param {boolean} primary - Button type - primary or default
   * @param {boolean} visible - Button visibility
   * @param {Array<HTMLButtonElement>} group - Array with buttons
   * @param {Function} callback - Event handler
   * @returns {HTMLButtonElement} - Button element
   * @private
   */


  _renderFooterButton(_ref3) {
    let {
      id,
      text,
      primary,
      visible,
      group,
      callback
    } = _ref3;
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.classList.add('btn', 'crms-control');
    group && group.push(btn);
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
  /**
   * Show or hide preview window
   * @param {boolean} status - If true - show the window
   * @private
   */


  _togglePreviewer(status) {
    status ? this.containerEl.classList.remove(withPrefix('hidden')) : this.containerEl.classList.add(withPrefix('hidden'));
  }
  /**
   * Show or hide specific button group
   * @param {number} status - Button group id
   * @private
   */


  _toggleButtons(status) {
    if (status === 1) {
      this.buttonGroup['1'].forEach(btn => btn.classList.remove(withPrefix('hidden')));
      this.buttonGroup['2'].forEach(btn => btn.classList.add(withPrefix('hidden')));
      return;
    }

    if (status === 2) {
      this.buttonGroup['2'].forEach(btn => btn.classList.remove(withPrefix('hidden')));
      this.buttonGroup['1'].forEach(btn => btn.classList.add(withPrefix('hidden')));
    }
  }
  /**
   * Correct coordinates based on screen-sharing type (the whole screen or browser/tab only)
   * 'monitor' is the whole screen
   * there might be a chance when displaySurface prop is not defined. It happens only in Firefox (tested on version < 93)
   * as it does not support MediaTrackSettings.displaySurface.
   * Coordinate correction is applied based on 'applyOffset' value. For outbound stream the offset is being added.
   * For AreaSelector class the offset is being subtract.
   * @param {{
   *  x: number,
   *  y: number,
   *  dx: number,
   *  dy: number
   * }} coordinates - User defined constraints for the canvas
   * @param {boolean} applyOffset - Add or remove offset from coordinates
   * @returns {{
   *   x: number,
   *   y: number,
   *   dx: number,
   *   dy: number
   * }}
   * @private
   */


  _correctCoordinates(coordinates, applyOffset) {
    const browser = getUserAgent();

    if (!this.displaySurfaceType || this.displaySurfaceType === 'monitor') {
      let {
        top: screenOffsetTop,
        left: screenOffsetLeft
      } = getScreenOffset();
      return { ...coordinates,
        x: applyOffset ? coordinates.x + screenOffsetLeft : coordinates.x - screenOffsetLeft,
        y: applyOffset ? coordinates.y + screenOffsetTop : coordinates.y - screenOffsetTop
      };
    }

    if (this.displaySurfaceType === 'window' || this.displaySurfaceType === 'browser') {
      console.warn('CropMyScreen does support cropping of the entire screen.\nIt does not crop browser window or tab well enough.\nPlease, use \'Entire screen\' option instead.');
      let buggedOffset = 0; // in Chrome if user selects 'window' or 'tab' for sharing there is a strange bug with extra 7px offset from top

      if (browser === 'Chrome') {
        buggedOffset = 7 * window.devicePixelRatio;
      }

      return { ...coordinates,
        y: applyOffset ? coordinates.y + getBrowserHeaderSize() + buggedOffset : coordinates.y - getBrowserHeaderSize() - buggedOffset
      };
    }

    return coordinates;
  }
  /**
   * Configuration for header buttons
   * @returns {
   *  Array<{
   *    id: string,
   *    icon: string,
   *    iconSize: string,
   *    callback: Function,
   *  }>
   * }
   * @private
   */


  get _headerButtonsConfig() {
    const minimize = {
      id: withPrefix('btn-minimize'),
      icon: (window_minimize_default()),
      iconSize: 's20',
      callback: (() => {
        let minimized = false;
        return button => {
          if (minimized) {
            button.innerHTML = (window_minimize_default());
            this.windowManager.minimize(false);
          } else {
            button.innerHTML = (window_maximize_default());
            this.windowManager.minimize(true);
          }

          minimized = !minimized;
        };
      })()
    };
    const close = {
      id: withPrefix('btn-close'),
      icon: (xmark_default()),
      iconSize: 's24',
      callback: () => {
        this.areaSelector.destroy();

        this._toggleButtons(1);

        this.stopStream();
        this.onStreamStopped();
      }
    };
    return [minimize, close];
  }
  /**
   * Configuration for footer buttons
   * @returns {
   *   Array<{
   *     visible: boolean,
   *     callback: Function,
   *     id: string,
   *     text: string,
   *     primary: boolean,
   *     group: Array<string>
   *   }>
   * }
   * @private
   */


  get _footerButtonsConfig() {
    const selectArea = {
      id: withPrefix('btn-select-area'),
      text: 'Select Area',
      primary: false,
      visible: true,
      group: this.buttonGroup['1'],
      callback: () => {
        const constraints = this._correctCoordinates(this.constraints, false);

        this.areaSelector.init(constraints);

        this._toggleButtons(2);
      }
    };
    const cancelAreaSelection = {
      id: withPrefix('btn-cancel-selection'),
      text: 'Cancel',
      primary: false,
      visible: false,
      group: this.buttonGroup['2'],
      callback: () => {
        this.areaSelector.destroy();

        this._toggleButtons(1);
      }
    };
    const applyAreaSelection = {
      id: withPrefix('btn-apply-selection'),
      text: 'Apply',
      primary: true,
      visible: false,
      group: this.buttonGroup['2'],
      callback: () => {
        this.constraints = this._correctCoordinates(this.areaSelector.getCoords(), true);
        this.areaSelector.destroy();
        this.canvas.width = this.constraints.dx;
        this.canvas.height = this.constraints.dy;
        this.windowManager.fitCanvas(this.canvas);

        this._toggleButtons(1);
      }
    };
    const shareStart = {
      id: withPrefix('btn-start-sharing'),
      text: 'Start presentation',
      primary: true,
      group: this.buttonGroup['1'],
      callback: () => {
        const stream = this.canvas.captureStream();
        this.onStreamStarted(stream);

        this._togglePreviewer(false);
      }
    };
    return [cancelAreaSelection, applyAreaSelection, selectArea, shareStart];
  }

}
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/css/styles.css
var styles = __webpack_require__(740);
;// CONCATENATED MODULE: ./src/css/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.Z, options);




       /* harmony default export */ const css_styles = (styles/* default */.Z && styles/* default.locals */.Z.locals ? styles/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/index.js
function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * The main class. It provides the interface to create DOM elements, start or stop cropping process, etc.
 * @param {Object} options - The settings to customize the plugin
 * options.cropX {number} - The start X coordinate of the cropping rectangle
 * options.cropY {number} - The start Y coordinate of the cropping rectangle
 * options.cropW {number} - The width of the cropping rectangle
 * options.cropH {number} - The height of the cropping rectangle
 * options.previewerClass {string} - The custom CSS class that can be used for customization. Attached to #crms-container element
 * options.backdropColor {string} - The color in HEX format with alpha channel (ex. #00000090 - black color with 90% of opacity).
 *                                  Defines the canvas backdrop color of the area selection tool.
 *
 * @property {string} prefix - Unique identifier for the plugin. Is being used in UI element id creation
 * @property settings - User settings
 * @property cropper - Instance of Cropper class
 */

class CropMyScreen {
  constructor(options) {
    src_defineProperty(this, "settings", void 0);

    src_defineProperty(this, "cropper", void 0);

    try {
      this.settings = { ...this._defaultOptions(),
        ...(options || {})
      };

      this._validateOptions(this.settings);
    } catch (e) {
      throw new Error('CropMyScreen: Plugin initialization error. Some of the provided options are invalid');
    }

    this.cropper = new Cropper(CropMyScreen.prefix);
    this.cropper.render({
      customClass: this.settings.previewerClass,
      backdropColor: this.settings.backdropColor
    });
  }
  /**
   * Start the cropping process. Displays the previewer window based on the provided constraints.
   * Function accepts the media stream object from the Screenshare API and returns Promise.
   * Promise resolves with the cropped media stream.
   * @param {MediaStream} stream - Media stream object
   * @returns {Promise<MediaStream>}
   */


  start(stream) {
    if (!this.cropper) {
      throw Error('CropMyScreen: Instance error. It seems like the plugin does not initialize properly or has already been destroyed.');
    }

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
  /**
   * Stop the cropping process.
   */


  stop() {
    this.cropper.stopStream();
  }
  /**
   * Remove all plugin related DOM elements. Stop all event listeners
   */


  destroy() {
    if (this.cropper) {
      this.stop();
      this.cropper.destroy();
      this.cropper = null;
    }
  }
  /**
   * Return default options
   * @returns {{cropX: number, cropH: number, cropY: number, backdropColor: string, previewerClass: string, cropW: number}}
   * @private
   */


  _defaultOptions() {
    return {
      backdropColor: '#00000073',
      cropX: 0,
      cropY: 0,
      cropW: 640,
      cropH: 480,
      previewerClass: ''
    };
  }

  _validateOptions(_ref) {
    let {
      backdropColor,
      cropX,
      cropY,
      cropW,
      cropH
    } = _ref;
    const colorRegExShort = new RegExp('^#[a-fA-F0-9]{3}$', 'gm');
    const colorRegExFull = new RegExp('^#[a-fA-F0-9]{6}([0-9]{2})?$', 'gm');

    if (backdropColor && !colorRegExShort.test(backdropColor) && !colorRegExFull.test(backdropColor)) {
      console.error('CropMyScreen: Backdrop color format error. Color must be set in HEX format - e.g. "#fff", "#fffaaa", "#fffaaa12"');
      throw new Error();
    }

    if (cropX && isNaN(+cropX)) {
      console.error('CropMyScreen: cropX value is not a number');
      throw new Error();
    }

    if (cropY && isNaN(+cropY)) {
      console.error('CropMyScreen: cropY value is not a number');
      throw new Error();
    }

    if (cropW && isNaN(+cropW)) {
      console.error('CropMyScreen: cropW value is not a number');
      throw new Error();
    }

    if (cropH && isNaN(+cropH)) {
      console.error('CropMyScreen: cropH value is not a number');
      throw new Error();
    }
  }

}

/* harmony default export */ const src = (CropMyScreen);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=crop-my-screen.js.map