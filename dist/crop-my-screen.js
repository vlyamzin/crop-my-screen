var CropMyScreen;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/aria-selector.js":
/*!******************************!*\
  !*** ./src/aria-selector.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AriaSelector)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AriaSelector {
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

    _defineProperty(this, "BACKDROP_COLOR", '#00000073');
  }

  init(displaySurface, constraints) {
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

      if (e.target.classList.contains('crms-control') || this.resizing) {
        return;
      }

      document.querySelectorAll('.draggable').forEach(el => el.remove());
      this.drawing = true;
      this.START_X = e.clientX;
      this.START_Y = e.clientY;
      console.log(this.START_X, this.START_Y);
    }; // screen-sharing area selection end


    this.areaSelectionEnd = e => {
      e.preventDefault();
      e.stopPropagation();
      console.log(this.START_X, this.START_Y); // prevent area selection if a user clicks on buttons in the previewer

      if (e.target.classList.contains('crms-control')) {
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

    this.areaSelectionStart = this.areaSelectionStart.bind(this);
    this.areaSelectionEnd = this.areaSelectionEnd.bind(this);
    this.areaSelectionMouseMove = this.areaSelectionMouseMove.bind(this);
    document.addEventListener('mousedown', this.areaSelectionStart);
    document.addEventListener('mouseup', this.areaSelectionEnd);
    document.addEventListener('mousemove', this.areaSelectionMouseMove);
  }

  getCoords() {
    return {
      x: this.START_X,
      y: this.START_Y,
      dx: this.CROP_W,
      dy: this.CROP_H
    };
  }

  remove() {
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
  } // swap coordinates in case drawing/resizing moved in opposite direction


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
  } // screen-sharing area resize start


  _areaResizeStart(e) {
    e.preventDefault();
    e.stopPropagation(); // RemotePlatformHelper.hideElementById('sharingScreen');

    this.resizing = true;
    this.dragPoint = e.target;
    document.querySelectorAll('.draggable').forEach(el => {
      el.removeEventListener('mousedown', this._areaResizeStart);
      el.remove();
    });
  } // screen-sharing area resize


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
  } // screen-sharing area resize end


  _areaResizeEnd() {
    this.resizing = false;
    this.dragPoint = null;

    this._drawArea();

    this._drawResizeMarkers(this.backdropCtx); // RemotePlatformHelper.showElementById('sharingScreen');

  }

}

/***/ }),

/***/ "./src/cropper.js":
/*!************************!*\
  !*** ./src/cropper.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cropper)
/* harmony export */ });
/* harmony import */ var _aria_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aria-selector */ "./src/aria-selector.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



let withPrefix;

const doCallback = (callback, params) => {
  if (callback && typeof callback === 'function') {
    callback.call(undefined, params);
  }
};

class Cropper {
  constructor(prefix) {
    _defineProperty(this, "constraints", void 0);

    _defineProperty(this, "ariaSelector", void 0);

    _defineProperty(this, "containerEl", void 0);

    _defineProperty(this, "videoEl", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "displaySurfaceType", void 0);

    _defineProperty(this, "buttonGroup", {
      1: [],
      2: []
    });

    _defineProperty(this, "_prefix", void 0);

    _defineProperty(this, "_containerId", 'container');

    this._prefix = prefix;

    withPrefix = id => {
      return `${prefix}-${id}`;
    };

    this.ariaSelector = new _aria_selector__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
        this.stopStream();
        this.onStreamStopped();
      }
    };
    const selectArea = {
      id: withPrefix('btn-select-area'),
      text: 'Select Area',
      primary: false,
      visible: true,
      group: this.buttonGroup['1'],
      callback: () => {
        const constraints = this._correctCoordinates(this.constraints, false);

        this.ariaSelector.init(this.displaySurfaceType, constraints);

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
        this.ariaSelector.remove();

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
        this.constraints = this._correctCoordinates(this.ariaSelector.getCoords(), true);
        this.ariaSelector.remove();
        this.canvas.width = this.constraints.dx;
        this.canvas.height = this.constraints.dy;

        this._toggleButtons(1);
      }
    };
    const shareStart = {
      id: withPrefix('btn-start-sharing'),
      text: 'Start presentation',
      primary: true,
      group: this.buttonGroup['1'],
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
    [cancelAreaSelection, applyAreaSelection, selectArea, shareStart].forEach(btnSettings => {
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
    btn.classList.add('crms-control');
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
      group,
      callback
    } = _ref2;
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

  _togglePreviewer(status) {
    status ? this.containerEl.classList.remove(withPrefix('hidden')) : this.containerEl.classList.add(withPrefix('hidden'));
  }

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
  } // correct coordinates based on screen-sharing type (the whole screen or browser/tab only)
  // 'monitor' is the whole screen
  // there might be a chance when displaySurface prop is not defined. It happens only in Firefox (version < 93)
  // as it does not support MediaTrackSettings.displaySurface


  _correctCoordinates(coordinates, applyOffset) {
    const browser = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getUserAgent)();

    if (!this.displaySurfaceType || this.displaySurfaceType === 'monitor') {
      let {
        top: screenOffsetTop,
        left: screenOffsetLeft
      } = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getScreenOffset)();
      return { ...coordinates,
        x: applyOffset ? coordinates.x + screenOffsetLeft : coordinates.x - screenOffsetLeft,
        y: applyOffset ? coordinates.y + screenOffsetTop : coordinates.y - screenOffsetTop
      };
    }

    if (this.displaySurfaceType === 'window') {
      let buggedOffset = 0; // in Chrome if user selects 'window' or 'tab' for sharing there is a strange bug with extra 7px offset from top

      if (browser === 'Chrome') {
        buggedOffset = 7 * window.devicePixelRatio;
      }

      return { ...coordinates,
        y: applyOffset ? coordinates.y + (0,_util__WEBPACK_IMPORTED_MODULE_1__.getBrowserHeaderSize)() + buggedOffset : coordinates.y - (0,_util__WEBPACK_IMPORTED_MODULE_1__.getBrowserHeaderSize)() - buggedOffset
      };
    }

    return coordinates;
  }

}

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserAgent": () => (/* binding */ getUserAgent),
/* harmony export */   "getBrowserHeaderSize": () => (/* binding */ getBrowserHeaderSize),
/* harmony export */   "getScreenOffset": () => (/* binding */ getScreenOffset)
/* harmony export */ });
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
} // returns the distance between the browser top-left corner and the top-left corner of the main monitor


function getScreenOffset() {
  return {
    // includes the browser's tab bar
    top: window.screenY + getBrowserHeaderSize(),
    left: window.screenX < 0 ? 0 : window.screenX
  };
}

function getBrowserHeaderSize() {
  return window.outerHeight - window.innerHeight;
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
___CSS_LOADER_EXPORT___.push([module.id, "#crms-container {\n  position: absolute;\n  top: 70px;\n  left: 0;\n  /* right: 0; */\n  /* width: 300px;\n  height: 300px; */\n  z-index: 10;\n  border-radius: 5px;\n  /* overflow: hidden; */\n  box-shadow: 1px 1px 7px 0px #343434;\n}\n\n#crms-popup {\n\t\n}\n\n#crms-preview-header {\n\theight: 30px;\n\tcursor: grab;\n}\n\n#crms-preview-footer {\n\theight: 50px;\n\tpadding: 5px 10px;\n}\n\n#crms-input {\n\tdisplay: none;\n\tvisibility: hidden;\n}\n\n#crms-output {\n\tdisplay: block;\n  \tbackground-color: #6a6a6a;\n}\n\n/* #sharingScreen.visible {\n  display: block;\n} */\n\n /* screen share area selector */\n #backdrop-wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n\n#drag-markers-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.draggable {\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  cursor: move;\n  z-index: 2;\n}\n\n.btn {\n\tdisplay: inline-block;\n\tfont-weight: 400;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tborder: 1px solid #f8f9fa;\n\tpadding: .375rem .75rem;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tborder-radius: .25rem;\n\ttransition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n\tcolor: #212529;\n\tbackground-color: #f8f9fa;\n\tcursor: pointer;\n}\n\n.btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.btn-primary {\n\tcolor: #fff;\n\tbackground-color: #007bff;\n\tborder-color: #007bff;\n}\n.btn-primary:hover {\n\tbackground-color: #0069d9;\n\tborder-color: #0062cc;\n}\n\n/* end screen share area selector */\n#buttons {\n  position: absolute;\n  bottom: 0;\n  padding: 1rem;\n  background: #6a6a6a;\n  z-index: 999;\n}\n\n.crms-hidden {\n\tdisplay: none !important;\n\tvisibility: hidden;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,cAAc;EACd;kBACgB;EAChB,WAAW;EACX,kBAAkB;EAClB,sBAAsB;EACtB,mCAAmC;AACrC;;AAEA;;AAEA;;AAEA;CACC,YAAY;CACZ,YAAY;AACb;;AAEA;CACC,YAAY;CACZ,iBAAiB;AAClB;;AAEA;CACC,aAAa;CACb,kBAAkB;AACnB;;AAEA;CACC,cAAc;GACZ,yBAAyB;AAC5B;;AAEA;;GAEG;;CAEF,+BAA+B;CAC/B;EACC,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;AACT;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,UAAU;AACZ;;AAEA;CACC,qBAAqB;CACrB,gBAAgB;CAChB,kBAAkB;CAClB,mBAAmB;CACnB,sBAAsB;CACtB,yBAAyB;CACzB,sBAAsB;CACtB,qBAAqB;CACrB,iBAAiB;CACjB,yBAAyB;CACzB,uBAAuB;CACvB,eAAe;CACf,gBAAgB;CAChB,qBAAqB;CACrB,8HAA8H;CAC9H,cAAc;CACd,yBAAyB;CACzB,eAAe;AAChB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,WAAW;CACX,yBAAyB;CACzB,qBAAqB;AACtB;AACA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA,mCAAmC;AACnC;EACE,kBAAkB;EAClB,SAAS;EACT,aAAa;EACb,mBAAmB;EACnB,YAAY;AACd;;AAEA;CACC,wBAAwB;CACxB,kBAAkB;AACnB","sourcesContent":["#crms-container {\n  position: absolute;\n  top: 70px;\n  left: 0;\n  /* right: 0; */\n  /* width: 300px;\n  height: 300px; */\n  z-index: 10;\n  border-radius: 5px;\n  /* overflow: hidden; */\n  box-shadow: 1px 1px 7px 0px #343434;\n}\n\n#crms-popup {\n\t\n}\n\n#crms-preview-header {\n\theight: 30px;\n\tcursor: grab;\n}\n\n#crms-preview-footer {\n\theight: 50px;\n\tpadding: 5px 10px;\n}\n\n#crms-input {\n\tdisplay: none;\n\tvisibility: hidden;\n}\n\n#crms-output {\n\tdisplay: block;\n  \tbackground-color: #6a6a6a;\n}\n\n/* #sharingScreen.visible {\n  display: block;\n} */\n\n /* screen share area selector */\n #backdrop-wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n\n#drag-markers-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.draggable {\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  cursor: move;\n  z-index: 2;\n}\n\n.btn {\n\tdisplay: inline-block;\n\tfont-weight: 400;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tborder: 1px solid #f8f9fa;\n\tpadding: .375rem .75rem;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tborder-radius: .25rem;\n\ttransition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n\tcolor: #212529;\n\tbackground-color: #f8f9fa;\n\tcursor: pointer;\n}\n\n.btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.btn-primary {\n\tcolor: #fff;\n\tbackground-color: #007bff;\n\tborder-color: #007bff;\n}\n.btn-primary:hover {\n\tbackground-color: #0069d9;\n\tborder-color: #0062cc;\n}\n\n/* end screen share area selector */\n#buttons {\n  position: absolute;\n  bottom: 0;\n  padding: 1rem;\n  background: #6a6a6a;\n  z-index: 999;\n}\n\n.crms-hidden {\n\tdisplay: none !important;\n\tvisibility: hidden;\n}\n"],"sourceRoot":""}]);
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