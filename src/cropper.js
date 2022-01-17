import AriaSelector from './aria-selector';
import {getUserAgent, getScreenOffset, getBrowserHeaderSize} from './util';
import xmarkSVG from './assets/xmark.svg';
import minimizeSVG from './assets/window-minimize.svg';
import restoreSVG from './assets/window-maximize.svg';

let withPrefix;
const doCallback = (callback, params) => {
  if (callback && typeof callback === 'function') {
    callback.call(this, params);
  }
};

export default class Cropper {
  constraints;
  ariaSelector;
  containerEl;
  videoEl;
  canvas;
  displaySurfaceType;
  buttonGroup = {
    1: [],
    2: []
  };

  _prefix;
  _containerId = 'container';

  constructor(prefix) {
    this._prefix = prefix;

    withPrefix = (id) => {
      return `${prefix}-${id}`;
    };
    this.ariaSelector = new AriaSelector();
  }

  render() {
    if (document.getElementById(`${this._prefix}-${this._containerId}`)) return;

    this.containerEl = this._createElement('div', withPrefix(this._containerId));
    this.videoEl = this._createElement('video', withPrefix('input'));
    this.canvas = this._createElement('canvas', withPrefix('output'));
    const { popup } = this._initPreviewer(this.canvas);

    this.videoEl.muted = true;

    this.containerEl.appendChild(this.videoEl);
    this.containerEl.appendChild(popup);

    this._togglePreviewer(false);

    document.body.appendChild(this.containerEl);
  }

  startStream(stream, constraints) {
    const { dx, dy } = constraints;
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
    const tracks = this.videoEl.srcObject.getTracks();
    (tracks || []).forEach(t => t.stop());
    this.videoEl.srcObject = null;
    this._togglePreviewer(false);
  }

  destroy() {
    this.containerEl.remove();
  }

  onStreamStarted(stream) {console.log(stream);}

  onStreamStopped() {}

  _cropFrame(context, video) {
    if (!context) return;

    const {x: startX, y: startY, dx: cropW, dy: cropH} = this.constraints;

    context.drawImage(
      video,
      startX,
      startY,
      cropW,
      cropH,
      0,
      0,
      cropW,
      cropH
    );
  }

  _createElement(type, id) {
    const el = document.createElement(type);
    el.setAttribute('id', id);
    return el;
  }

  _initPreviewer(canvas) {
    const popup = this._createElement('div', withPrefix('preview'));
    const popupHeader = this._createElement('div', withPrefix('preview-header'));
    const popupFooter = this._createElement('div', withPrefix('preview-footer'));

    this._headerButtonsConfig.forEach(btnSettings => {
      let btn = this._renderHeaderButton(btnSettings);
      popupHeader.appendChild(btn);
    });

    this._footerButtonsConfig.forEach(btnSettings => {
      let btn = this._initPreviewButton(btnSettings);
      popupFooter.appendChild(btn);
    });


    popup.appendChild(popupHeader);
    popup.appendChild(canvas);
    popup.appendChild(popupFooter);

    return {
      popup,
    };
  }
  
  _renderHeaderButton({id, icon, callback, iconSize}) {
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.classList.add('crms-control', 'icon-btn');
    iconSize && btn.classList.add(iconSize);
    btn.innerHTML = icon;
    btn.onclick = (event) => {
      doCallback(callback, event.currentTarget);
    };
    return btn;
  }

  _initPreviewButton({ id, text, primary, visible, group, callback }) {
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
    status
      ? this.containerEl.classList.remove(withPrefix('hidden'))
      : this.containerEl.classList.add(withPrefix('hidden'));
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
  }


  // correct coordinates based on screen-sharing type (the whole screen or browser/tab only)
  // 'monitor' is the whole screen
  // there might be a chance when displaySurface prop is not defined. It happens only in Firefox (version < 93)
  // as it does not support MediaTrackSettings.displaySurface
  _correctCoordinates(coordinates, applyOffset) {
    const browser = getUserAgent();

    if (!this.displaySurfaceType || this.displaySurfaceType === 'monitor') {
      let { top: screenOffsetTop, left: screenOffsetLeft } = getScreenOffset();

      return {
        ...coordinates,
        x: applyOffset ? (coordinates.x + screenOffsetLeft) : (coordinates.x - screenOffsetLeft),
        y: applyOffset ? (coordinates.y + screenOffsetTop) : (coordinates.y - screenOffsetTop),
      };
    }

    if (this.displaySurfaceType === 'window') {
      let buggedOffset = 0;

      // in Chrome if user selects 'window' or 'tab' for sharing there is a strange bug with extra 7px offset from top
      if (browser === 'Chrome') {
        buggedOffset = 7 * window.devicePixelRatio;
      }

      return {
        ...coordinates,
        y: applyOffset
          ? (coordinates.y + getBrowserHeaderSize() + buggedOffset)
          : (coordinates.y - getBrowserHeaderSize() - buggedOffset),
      };
    }

    return coordinates;
  }

  get _headerButtonsConfig() {
    const minimize = {
      id: withPrefix('btn-minimize'),
      icon: minimizeSVG,
      iconSize: 's20',
      callback: (() => {
        let minimized = false;
        return (button) => {
          const popupFooter = document.querySelector(`#${withPrefix('preview-footer')}`);
          if (minimized) {
            button.innerHTML = minimizeSVG;
            this.canvas.classList.remove(withPrefix('hidden'));
            popupFooter.classList.remove(withPrefix('hidden'));
          } else {
            button.innerHTML = restoreSVG;
            this.canvas.classList.add(withPrefix('hidden'));
            popupFooter.classList.add(withPrefix('hidden'));
          }
          minimized = !minimized;
        };
      })()
    };
    const close = {
      id: withPrefix('btn-close'),
      icon: xmarkSVG,
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
      },
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
      },
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
