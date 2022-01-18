var CropMyScreen;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/aria-selector.js":
/*!******************************!*\
  !*** ./src/aria-selector.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AriaSelector)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
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

      if (e.target.classList.contains((0,_util__WEBPACK_IMPORTED_MODULE_0__.withPrefix)('control')) || this.resizing) {
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

      if (e.target.classList.contains((0,_util__WEBPACK_IMPORTED_MODULE_0__.withPrefix)('control'))) {
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
  }

}

/***/ }),

/***/ "./src/cropper.js":
/*!************************!*\
  !*** ./src/cropper.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cropper)
/* harmony export */ });
/* harmony import */ var _aria_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aria-selector */ "./src/aria-selector.js");
/* harmony import */ var _window_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./window-manager */ "./src/window-manager.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _assets_xmark_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/xmark.svg */ "./src/assets/xmark.svg");
/* harmony import */ var _assets_xmark_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_xmark_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_window_minimize_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/window-minimize.svg */ "./src/assets/window-minimize.svg");
/* harmony import */ var _assets_window_minimize_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_window_minimize_svg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_window_maximize_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/window-maximize.svg */ "./src/assets/window-maximize.svg");
/* harmony import */ var _assets_window_maximize_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_window_maximize_svg__WEBPACK_IMPORTED_MODULE_5__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // let withPrefix;

const doCallback = (callback, params) => {
  if (callback && typeof callback === 'function') {
    callback.call(undefined, params);
  }
};

class Cropper {
  constructor() {
    _defineProperty(this, "constraints", void 0);

    _defineProperty(this, "ariaSelector", void 0);

    _defineProperty(this, "windowManager", void 0);

    _defineProperty(this, "containerEl", void 0);

    _defineProperty(this, "videoEl", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "displaySurfaceType", void 0);

    _defineProperty(this, "buttonGroup", {
      1: [],
      2: []
    });

    _defineProperty(this, "_containerId", 'container');

    this.ariaSelector = new _aria_selector__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  render() {
    if (document.getElementById((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)(this._containerId))) return;
    this.containerEl = this._createElement('div', (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)(this._containerId));
    this.videoEl = this._createElement('video', (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('input'));
    this.canvas = this._createElement('canvas', (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('output'));

    const popup = this._initPreviewer(this.canvas);

    this.videoEl.muted = true;
    this.containerEl.appendChild(this.videoEl);
    this.containerEl.appendChild(popup);

    this._togglePreviewer(false);

    document.body.appendChild(this.containerEl);
    this.windowManager = new _window_manager__WEBPACK_IMPORTED_MODULE_1__["default"](this.containerEl);
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

    this.windowManager.fitCanvas(this.canvas);
  }

  stopStream() {
    const tracks = this.videoEl.srcObject.getTracks();
    (tracks || []).forEach(t => t.stop());
    this.videoEl.srcObject = null;

    this._togglePreviewer(false);
  }

  destroy() {
    this.ariaSelector.destroy();
    this.windowManager.destroy();
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
    const popup = this._createElement('div', (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('preview'));

    const canvasWrap = this._createElement('div', (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('canvas-wrap'));

    const popupHeader = this._createElement('div', (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('preview-header'));

    const popupFooter = this._createElement('div', (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('preview-footer'));

    popupHeader.classList.add('window-move');

    this._headerButtonsConfig.forEach(btnSettings => {
      let btn = this._renderHeaderButton(btnSettings);

      popupHeader.append(btn);
    });

    this._footerButtonsConfig.forEach(btnSettings => {
      let btn = this._initPreviewButton(btnSettings);

      popupFooter.append(btn);
    });

    canvasWrap.append(canvas);
    popup.append(popupHeader, canvasWrap, popupFooter);
    return popup;
  }

  _renderHeaderButton(_ref) {
    let {
      id,
      icon,
      callback,
      iconSize
    } = _ref;
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.classList.add('crms-control', 'icon-btn');
    iconSize && btn.classList.add(iconSize);
    btn.innerHTML = icon;

    btn.onclick = event => {
      event.stopPropagation();
      doCallback(callback, event.currentTarget);
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
      btn.classList.add((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden'));
    }

    return btn;
  }

  _togglePreviewer(status) {
    status ? this.containerEl.classList.remove((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden')) : this.containerEl.classList.add((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden'));
  }

  _toggleButtons(status) {
    if (status === 1) {
      this.buttonGroup['1'].forEach(btn => btn.classList.remove((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden')));
      this.buttonGroup['2'].forEach(btn => btn.classList.add((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden')));
      return;
    }

    if (status === 2) {
      this.buttonGroup['2'].forEach(btn => btn.classList.remove((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden')));
      this.buttonGroup['1'].forEach(btn => btn.classList.add((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden')));
    }
  } // correct coordinates based on screen-sharing type (the whole screen or browser/tab only)
  // 'monitor' is the whole screen
  // there might be a chance when displaySurface prop is not defined. It happens only in Firefox (version < 93)
  // as it does not support MediaTrackSettings.displaySurface


  _correctCoordinates(coordinates, applyOffset) {
    const browser = (0,_util__WEBPACK_IMPORTED_MODULE_2__.getUserAgent)();

    if (!this.displaySurfaceType || this.displaySurfaceType === 'monitor') {
      let {
        top: screenOffsetTop,
        left: screenOffsetLeft
      } = (0,_util__WEBPACK_IMPORTED_MODULE_2__.getScreenOffset)();
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
        y: applyOffset ? coordinates.y + (0,_util__WEBPACK_IMPORTED_MODULE_2__.getBrowserHeaderSize)() + buggedOffset : coordinates.y - (0,_util__WEBPACK_IMPORTED_MODULE_2__.getBrowserHeaderSize)() - buggedOffset
      };
    }

    return coordinates;
  }

  get _headerButtonsConfig() {
    const minimize = {
      id: (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('btn-minimize'),
      icon: (_assets_window_minimize_svg__WEBPACK_IMPORTED_MODULE_4___default()),
      iconSize: 's20',
      callback: (() => {
        let minimized = false;
        return button => {
          const popupFooter = document.querySelector(`#${(0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('preview-footer')}`);

          if (minimized) {
            button.innerHTML = (_assets_window_minimize_svg__WEBPACK_IMPORTED_MODULE_4___default());
            this.canvas.classList.remove((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden'));
            popupFooter.classList.remove((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden'));
          } else {
            button.innerHTML = (_assets_window_maximize_svg__WEBPACK_IMPORTED_MODULE_5___default());
            this.canvas.classList.add((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden'));
            popupFooter.classList.add((0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('hidden'));
          }

          minimized = !minimized;
        };
      })()
    };
    const close = {
      id: (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('btn-close'),
      icon: (_assets_xmark_svg__WEBPACK_IMPORTED_MODULE_3___default()),
      iconSize: 's24',
      callback: () => {
        this.stopStream();
        this.onStreamStopped();
      }
    };
    return [minimize, close];
  }

  get _footerButtonsConfig() {
    const selectArea = {
      id: (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('btn-select-area'),
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
      id: (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('btn-cancel-selection'),
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
      id: (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('btn-apply-selection'),
      text: 'Apply',
      primary: true,
      visible: false,
      group: this.buttonGroup['2'],
      callback: () => {
        this.constraints = this._correctCoordinates(this.ariaSelector.getCoords(), true);
        this.ariaSelector.remove();
        this.canvas.width = this.constraints.dx;
        this.canvas.height = this.constraints.dy;
        this.windowManager.fitCanvas(this.canvas);

        this._toggleButtons(1);
      }
    };
    const shareStart = {
      id: (0,_util__WEBPACK_IMPORTED_MODULE_2__.withPrefix)('btn-start-sharing'),
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

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserAgent": () => (/* binding */ getUserAgent),
/* harmony export */   "getBrowserHeaderSize": () => (/* binding */ getBrowserHeaderSize),
/* harmony export */   "getScreenOffset": () => (/* binding */ getScreenOffset),
/* harmony export */   "getRatio": () => (/* binding */ getRatio),
/* harmony export */   "withPrefix": () => (/* binding */ withPrefix)
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

function getRatio(width, height) {
  return width > height ? width / height : height / width;
}

function withPrefix(id) {
  return `${window.CropMyScreen.prefix}-${id}`;
}



/***/ }),

/***/ "./src/window-manager.js":
/*!*******************************!*\
  !*** ./src/window-manager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WindowManager)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class WindowManager {
  constructor(container) {
    _defineProperty(this, "_isMoving", void 0);

    _defineProperty(this, "_startCoords", void 0);

    _defineProperty(this, "_translateOffset", void 0);

    _defineProperty(this, "_deltaX", void 0);

    _defineProperty(this, "_deltaY", void 0);

    _defineProperty(this, "_dragZone", void 0);

    _defineProperty(this, "_container", void 0);

    this._container = container;
    this._dragZone = container.querySelector('.window-move');

    if (!this._container || !this._dragZone) {
      console.error('WindowManager: Container is not available');
      throw new Error('WindowManager: Container is not available');
    }

    this.init();
  }

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

    this._dragZone.addEventListener('mousedown', this._mouseDown.bind(this), false);

    document.addEventListener('mousemove', this._moveMove.bind(this), false);
    document.addEventListener('mouseup', this._mouseUp.bind(this), false);
  }

  fitCanvas(canvasEl) {
    let headerHeight, footerHeight;

    try {
      headerHeight = this._container.querySelector(`#${(0,_util__WEBPACK_IMPORTED_MODULE_0__.withPrefix)('preview-header')}`).clientHeight;
      footerHeight = this._container.querySelector(`#${(0,_util__WEBPACK_IMPORTED_MODULE_0__.withPrefix)('preview-footer')}`).clientHeight;
    } catch (e) {
      console.error(e);
      throw new Error('WindowManager: Can\'t obtaint header & footer height');
    }

    const containerWidth = this._container.clientWidth;
    const containerHeight = this._container.clientHeight - (headerHeight + footerHeight);
    const containerRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getRatio)(containerWidth, containerHeight);
    const canvasRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getRatio)(canvasEl.width, canvasEl.height);

    if (containerRatio > canvasRatio) {
      canvasEl.classList.add('h100');
      canvasEl.classList.remove('w100');
    } else {
      canvasEl.classList.add('w100', 'h100');
    }
  }

  destroy() {
    this._dragZone.removeEventListener('mousedown', this._mouseDown);

    document.removeEventListener('mousemove', this._moveMove);
    document.removeEventListener('mouseup', this._mouseUp);
    this._container = null;
    this._dragZone = null;
  }

  _mouseDown(event) {
    this._isMoving = true;
    this._dragZone.style.cursor = 'grabbing';
    this._startCoords.x = event.clientX;
    this._startCoords.y = event.clientY;
  }

  _moveMove(event) {
    if (!this._isMoving) {
      return;
    }

    this._deltaX = event.clientX - this._startCoords.x;
    this._deltaY = event.clientY - this._startCoords.y;
    this._container.style.transform = `translate(${this._deltaX + this._translateOffset.x}px, ${this._deltaY + this._translateOffset.y}px)`;
  }

  _mouseUp() {
    if (this._isMoving) {
      this._isMoving = false;
      this._dragZone.style.cursor = 'grab';
      this._translateOffset.x += this._deltaX;
      this._translateOffset.y += this._deltaY;
    }
  }

}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/styles.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, "#crms-container {\n\tposition: absolute;\n\tleft: 0;\n\tz-index: 10;\n\tbackground: #fff;\n\tborder-radius: 5px;\n\toverflow: hidden;\n\tbox-shadow: 1px 1px 7px 0 #343434;\n\twidth: 500px;\n\theight: 400px;\n}\n\n#crms-canvas-wrap {\n\tdisplay: flex;\n\tjustify-content: center;\n\tbackground: #d3d3d3;\n\tmax-width: 500px;\n\tmax-height: 320px;\n}\n\n#crms-preview {\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: space-between;\n\tbackground: #d3d3d3;\n}\n\n#crms-preview-header {\n\theight: 30px;\n\tcursor: grab;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tbackground: #fff;\n}\n\n#crms-preview-footer {\n\theight: 50px;\n\tpadding: 5px 10px;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tbackground: #fff;\n}\n\n#crms-input {\n\tdisplay: none;\n\tvisibility: hidden;\n}\n\n#crms-output {\n\tdisplay: block;\n\tbackground-color: #6a6a6a;\n}\n\n/* #sharingScreen.visible {\n  display: block;\n} */\n\n/* screen share area selector */\n#backdrop-wrapper {\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1;\n}\n\n#drag-markers-container {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n}\n\n.draggable {\n\tposition: absolute;\n\twidth: 16px;\n\theight: 16px;\n\tcursor: move;\n\tz-index: 2;\n}\n\n.btn {\n\tdisplay: inline-block;\n\tfont-weight: 400;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tborder: 1px solid #f8f9fa;\n\tmargin: 0 .75rem;\n\tpadding: .375rem .75rem;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tborder-radius: .25rem;\n\ttransition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;\n\tcolor: #212529;\n\tbackground-color: #f8f9fa;\n\tcursor: pointer;\n}\n\n.btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.btn-primary {\n\tcolor: #fff;\n\tbackground-color: #007bff;\n\tborder-color: #007bff;\n}\n\n.btn-primary:hover {\n\tbackground-color: #0069d9;\n\tborder-color: #0062cc;\n}\n\n.icon-btn {\n\tbackground: none;\n\tborder: none;\n\toutline: none;\n\tpadding: 2px 7px;\n\tcursor: pointer;\n}\n\n.icon-btn.s20 {\n\tpadding: 4px 9px;\n}\n\n.icon-btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.icon-btn.s24 > svg {\n\twidth: 24px;\n\theight: 24px;\n}\n\n.icon-btn.s20 > svg {\n\twidth: 20px;\n\theight: 20px;\n}\n\n/* end screen share area selector */\n#buttons {\n\tposition: absolute;\n\tbottom: 0;\n\tpadding: 1rem;\n\tbackground: #6a6a6a;\n\tz-index: 999;\n}\n\n.crms-hidden {\n\tdisplay: none !important;\n\tvisibility: hidden;\n}\n\n.w100 {\n\twidth: 100%;\n}\n\n.h100 {\n\theight: 100%;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;CACC,kBAAkB;CAClB,OAAO;CACP,WAAW;CACX,gBAAgB;CAChB,kBAAkB;CAClB,gBAAgB;CAChB,iCAAiC;CACjC,YAAY;CACZ,aAAa;AACd;;AAEA;CACC,aAAa;CACb,uBAAuB;CACvB,mBAAmB;CACnB,gBAAgB;CAChB,iBAAiB;AAClB;;AAEA;CACC,WAAW;CACX,YAAY;CACZ,aAAa;CACb,sBAAsB;CACtB,8BAA8B;CAC9B,mBAAmB;AACpB;;AAEA;CACC,YAAY;CACZ,YAAY;CACZ,aAAa;CACb,yBAAyB;CACzB,mBAAmB;CACnB,gBAAgB;AACjB;;AAEA;CACC,YAAY;CACZ,iBAAiB;CACjB,aAAa;CACb,yBAAyB;CACzB,mBAAmB;CACnB,gBAAgB;AACjB;;AAEA;CACC,aAAa;CACb,kBAAkB;AACnB;;AAEA;CACC,cAAc;CACd,yBAAyB;AAC1B;;AAEA;;GAEG;;AAEH,+BAA+B;AAC/B;CACC,eAAe;CACf,MAAM;CACN,OAAO;CACP,WAAW;CACX,YAAY;CACZ,UAAU;AACX;;AAEA;CACC,kBAAkB;CAClB,MAAM;CACN,OAAO;AACR;;AAEA;CACC,kBAAkB;CAClB,WAAW;CACX,YAAY;CACZ,YAAY;CACZ,UAAU;AACX;;AAEA;CACC,qBAAqB;CACrB,gBAAgB;CAChB,kBAAkB;CAClB,mBAAmB;CACnB,sBAAsB;CACtB,yBAAyB;CACzB,sBAAsB;CACtB,qBAAqB;CACrB,iBAAiB;CACjB,yBAAyB;CACzB,gBAAgB;CAChB,uBAAuB;CACvB,eAAe;CACf,gBAAgB;CAChB,qBAAqB;CACrB,iIAAiI;CACjI,cAAc;CACd,yBAAyB;CACzB,eAAe;AAChB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,WAAW;CACX,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,gBAAgB;CAChB,YAAY;CACZ,aAAa;CACb,gBAAgB;CAChB,eAAe;AAChB;;AAEA;CACC,gBAAgB;AACjB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,WAAW;CACX,YAAY;AACb;;AAEA;CACC,WAAW;CACX,YAAY;AACb;;AAEA,mCAAmC;AACnC;CACC,kBAAkB;CAClB,SAAS;CACT,aAAa;CACb,mBAAmB;CACnB,YAAY;AACb;;AAEA;CACC,wBAAwB;CACxB,kBAAkB;AACnB;;AAEA;CACC,WAAW;AACZ;;AAEA;CACC,YAAY;AACb","sourcesContent":["#crms-container {\n\tposition: absolute;\n\tleft: 0;\n\tz-index: 10;\n\tbackground: #fff;\n\tborder-radius: 5px;\n\toverflow: hidden;\n\tbox-shadow: 1px 1px 7px 0 #343434;\n\twidth: 500px;\n\theight: 400px;\n}\n\n#crms-canvas-wrap {\n\tdisplay: flex;\n\tjustify-content: center;\n\tbackground: #d3d3d3;\n\tmax-width: 500px;\n\tmax-height: 320px;\n}\n\n#crms-preview {\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: space-between;\n\tbackground: #d3d3d3;\n}\n\n#crms-preview-header {\n\theight: 30px;\n\tcursor: grab;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tbackground: #fff;\n}\n\n#crms-preview-footer {\n\theight: 50px;\n\tpadding: 5px 10px;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tbackground: #fff;\n}\n\n#crms-input {\n\tdisplay: none;\n\tvisibility: hidden;\n}\n\n#crms-output {\n\tdisplay: block;\n\tbackground-color: #6a6a6a;\n}\n\n/* #sharingScreen.visible {\n  display: block;\n} */\n\n/* screen share area selector */\n#backdrop-wrapper {\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1;\n}\n\n#drag-markers-container {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n}\n\n.draggable {\n\tposition: absolute;\n\twidth: 16px;\n\theight: 16px;\n\tcursor: move;\n\tz-index: 2;\n}\n\n.btn {\n\tdisplay: inline-block;\n\tfont-weight: 400;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tborder: 1px solid #f8f9fa;\n\tmargin: 0 .75rem;\n\tpadding: .375rem .75rem;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tborder-radius: .25rem;\n\ttransition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;\n\tcolor: #212529;\n\tbackground-color: #f8f9fa;\n\tcursor: pointer;\n}\n\n.btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.btn-primary {\n\tcolor: #fff;\n\tbackground-color: #007bff;\n\tborder-color: #007bff;\n}\n\n.btn-primary:hover {\n\tbackground-color: #0069d9;\n\tborder-color: #0062cc;\n}\n\n.icon-btn {\n\tbackground: none;\n\tborder: none;\n\toutline: none;\n\tpadding: 2px 7px;\n\tcursor: pointer;\n}\n\n.icon-btn.s20 {\n\tpadding: 4px 9px;\n}\n\n.icon-btn:hover {\n\tbackground-color: #e2e6ea;\n\tborder-color: #dae0e5;\n}\n\n.icon-btn.s24 > svg {\n\twidth: 24px;\n\theight: 24px;\n}\n\n.icon-btn.s20 > svg {\n\twidth: 20px;\n\theight: 20px;\n}\n\n/* end screen share area selector */\n#buttons {\n\tposition: absolute;\n\tbottom: 0;\n\tpadding: 1rem;\n\tbackground: #6a6a6a;\n\tz-index: 999;\n}\n\n.crms-hidden {\n\tdisplay: none !important;\n\tvisibility: hidden;\n}\n\n.w100 {\n\twidth: 100%;\n}\n\n.h100 {\n\theight: 100%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
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

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
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

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
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

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
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

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
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

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
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

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
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

/***/ "./src/assets/window-maximize.svg":
/*!****************************************!*\
  !*** ./src/assets/window-maximize.svg ***!
  \****************************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M7.724 65.49C13.36 55.11 21.79 46.47 32 40.56C39.63 36.15 48.25 33.26 57.46 32.33C59.61 32.11 61.79 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 93.79 .112 91.61 .3306 89.46C1.204 80.85 3.784 72.75 7.724 65.49V65.49zM48 416C48 424.8 55.16 432 64 432H448C456.8 432 464 424.8 464 416V224H48V416z\"></path></svg>"

/***/ }),

/***/ "./src/assets/window-minimize.svg":
/*!****************************************!*\
  !*** ./src/assets/window-minimize.svg ***!
  \****************************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M0 456C0 442.7 10.75 432 24 432H488C501.3 432 512 442.7 512 456C512 469.3 501.3 480 488 480H24C10.75 480 0 469.3 0 456z\"></path></svg>"

/***/ }),

/***/ "./src/assets/xmark.svg":
/*!******************************!*\
  !*** ./src/assets/xmark.svg ***!
  \******************************/
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