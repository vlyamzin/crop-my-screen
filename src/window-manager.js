import {getRatio, withPrefix} from './util';

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
export default class WindowManager {
  _isMoving;
  _startCoords;
  _translateOffset;
  _deltaX;
  _deltaY;
  _dragZone;
  _container;

  constructor(container) {
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
    this._startCoords = {x: 0, y: 0};
    this._translateOffset = {x: 0, y: 0};
    this._deltaX = this._deltaY = 0;

    this._limitCanvasWrap();

    this._dragZone.addEventListener('mousedown', this._mouseDown.bind(this));
    document.addEventListener('mousemove', this._moveMove.bind(this));
    document.addEventListener('mouseup', this._mouseUp.bind(this));
  }

  /**
   * Prevent the canvas from moving outside the parent container.
   * If the aspect ratio of the preview window is bigger than the canvas aspect ratio -
   * the canvas must be aligned vertically (grey zones appear on the left and right sides).
   * Otherwise the canvas must be aligned horizontally (grey zones appear on the top and bottom sides)
   * @param {HTMLCanvasElement} canvasEl - Cropping canvas
   */
  fitCanvas(canvasEl) {
    let offset;

    try {
      offset = this._getHeaderFooterOffset();
    } catch (_) {
      offset = 0;
    }

    const containerWidth = this._container.clientWidth;
    const containerHeight = this._container.clientHeight - offset;
    const containerRatio = getRatio(containerWidth,containerHeight);
    const canvasRatio = getRatio(canvasEl.width, canvasEl.height);


    if (containerRatio > canvasRatio) {
      canvasEl.classList.add('h100');
      canvasEl.classList.remove('w100');
    } else {
      canvasEl.classList.add('w100', 'h100');
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
    this._dragZone.removeEventListener('mousedown', this._mouseDown);
    document.removeEventListener('mousemove', this._moveMove);
    document.removeEventListener('mouseup', this._mouseUp);
    this._dragZone.remove();
    this._container = null;
    this._dragZone = null;
  }

  /**
   * Start moving the window.
   * Collect starting points
   * @param {MouseEvent} event
   * @private
   */
  _mouseDown(event) {
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
  _mouseUp() {
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
