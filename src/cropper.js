import AreaSelector from './area-selector';
import WindowManager from './window-manager';
import {getUserAgent, getScreenOffset, getBrowserHeaderSize, withPrefix, doCallback} from './util';
import xmarkSVG from './assets/xmark.svg';
import minimizeSVG from './assets/window-minimize.svg';
import restoreSVG from './assets/window-maximize.svg';

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
export default class Cropper {
  constraints;
  areaSelector;
  windowManager;
  containerEl;
  videoEl;
  canvas;
  displaySurfaceType;
  buttonGroup = {
    1: [],
    2: []
  };

  constructor() {
    this.areaSelector = new AreaSelector();
  }

  /**
   * Initialize and render UI elements.
   * Initialize additional modules like WindowManager and AreaSelector
   * @param {string} customClass - CSS class attached to the main container
   * @param {string} backdropColor - HEX color for the canvas backdrop of the AreaSelector
   */
  render({customClass, backdropColor}) {
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
    const {dx, dy} = constraints;
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
    const tracks = this.videoEl.srcObject.getTracks();
    (tracks || []).forEach(t => t.stop());
    this.videoEl.srcObject = null;
    this._togglePreviewer(false);
  }

  /**
   * Delete all plugin modules. Clear the UI
   */
  destroy() {
    this.areaSelector.destroy();
    this.windowManager.destroy();
    this.containerEl.remove();
  }

  /**
   * Event. Notifies when crop is done and stream is ready
   * @param {MediaStream} stream - Cropped stream
   */
  // eslint-disable-next-line
  onStreamStarted(stream) {
  }

  /**
   * Event. Notifies when crop is stopped
   */
  onStreamStopped() {
  }

  /**
   * Modify the canvas element
   * @param {CanvasRenderingContext2D} context - Canvas context object
   * @param {HTMLVideoElement} video - Video element with original stream
   * @private
   */
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
  _renderHeaderButton({id, icon, callback, iconSize}) {
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.classList.add('crms-control', 'icon-btn');
    iconSize && btn.classList.add(iconSize);
    btn.innerHTML = icon;
    // prevent window reposition event fire
    btn.onmousedown = (event) => {
      event.stopPropagation();
    };
    btn.onclick = (event) => {
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
  _renderFooterButton({id, text, primary, visible, group, callback}) {
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
    status
      ? this.containerEl.classList.remove(withPrefix('hidden'))
      : this.containerEl.classList.add(withPrefix('hidden'));
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
      let {top: screenOffsetTop, left: screenOffsetLeft} = getScreenOffset();

      return {
        ...coordinates,
        x: applyOffset ? (coordinates.x + screenOffsetLeft) : (coordinates.x - screenOffsetLeft),
        y: applyOffset ? (coordinates.y + screenOffsetTop) : (coordinates.y - screenOffsetTop),
      };
    }

    if (this.displaySurfaceType === 'window' || this.displaySurfaceType === 'browser') {
      console.warn('CropMyScreen does support cropping of the entire screen.\nIt does not crop browser window or tab well enough.\nPlease, use \'Entire screen\' option instead.');
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
      icon: minimizeSVG,
      iconSize: 's20',
      callback: (() => {
        let minimized = false;
        return (button) => {
          if (minimized) {
            button.innerHTML = minimizeSVG;
            this.windowManager.minimize(false);
          } else {
            button.innerHTML = restoreSVG;
            this.windowManager.minimize(true);
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
      },
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
