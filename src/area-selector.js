import {withPrefix} from './util';

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
export default class AreaSelector {
  resizing = false;
  drawing = false;
  dragPoint;
  backdropCanvas;
  backdropCtx;
  START_X;
  START_Y;
  END_X;
  END_Y;
  CROP_W;
  CROP_H;
  BACKDROP_COLOR;

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

    this._drawBackDrop(true);

    // screen-sharing area selection start
    this.areaSelectionStart = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // prevent area selection if a user initiated area resizing or clicks on buttons in the previewer
      if (e.target.classList.contains(withPrefix('control')) || this.resizing) {
        return;
      }

      document.querySelectorAll('.draggable').forEach(el => el.remove());
      this.drawing = true;
      this.START_X = e.clientX;
      this.START_Y = e.clientY;
    };

    // screen-sharing area selection end
    this.areaSelectionEnd = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // prevent area selection if a user clicks on buttons in the previewer
      if (e.target.classList.contains(withPrefix('control'))) {
        return;
      }

      if (this.resizing) {
        this.resizing = false;

        this._swapCoordinates();
        this._drawResizeMarkers(this.backdropCtx);
      }

      if (this.drawing) {
        this.drawing = false;

        // if user did not move the mouse
        if (e.clientX === this.START_X && e.clientY === this.START_Y) {
          return;
        }

        this._swapCoordinates();
        this._drawResizeMarkers(this.backdropCtx);
      }
    };

    // screen-sharing area selection
    this.areaSelectionMouseMove = e => {
      e.preventDefault();
      e.stopPropagation();

      if (this.resizing) {
        this._areaResize(e);
        this._drawArea();
        return;
      }

      if (!this.drawing) { return; }

      // calculate the rectangle width/height based
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
   * Remove UI elements and clear event listeners
   */
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

    this.backdropCtx.globalCompositeOperation = 'destination-out';

    // cut area from backdrop
    this.backdropCtx.fillStyle = 'red';
    this.backdropCtx.fillRect(this.START_X, this.START_Y, this.CROP_W, this.CROP_H);

    this.backdropCtx.globalCompositeOperation = 'source-over';

    // draw selected area border
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
        values: [this.START_X + ((this.CROP_W / 2) - offset), this.START_Y - offset]
      },
      topRight: {
        type: 0,
        values: [this.END_X - offset, this.START_Y - offset]
      },
      rightCenter: {
        type: 1,
        values: [this.END_X - offset, this.START_Y + ((this.CROP_H / 2) - offset)]
      },
      bottomRight: {
        type: 0,
        values: [this.END_X - offset, this.END_Y - offset]
      },
      bottomCenter: {
        type: 1,
        values: [this.START_X + ((this.CROP_W / 2) - offset), this.END_Y - offset]
      },
      bottomLeft: {
        type: 0,
        values: [this.START_X - offset, this.END_Y - offset]
      },
      leftCenter: {
        type: 1,
        values: [this.START_X - offset, this.START_Y + ((this.CROP_H / 2) - offset)]
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
    case 'topLeft': {
      const deltaX = e.clientX - this.START_X;
      const deltaY = e.clientY - this.START_Y;
      this.CROP_W = this.CROP_W - deltaX;
      this.CROP_H = this.CROP_H - deltaY;
      this.START_X = e.clientX;
      this.START_Y = e.clientY;
      break;
    }
    case 'topCenter': {
      const deltaY = e.clientY - this.START_Y;
      this.CROP_H = this.CROP_H - deltaY;
      this.START_Y = e.clientY;
      break;
    }
    case 'topRight': {
      const deltaX = e.clientX - this.END_X;
      const deltaY = e.clientY - this.START_Y;
      this.CROP_W = this.CROP_W + deltaX;
      this.CROP_H = this.CROP_H - deltaY;
      this.END_X = e.clientX;
      this.START_Y = e.clientY;
      break;
    }
    case 'rightCenter': {
      const deltaX = e.clientX - this.END_X;
      this.CROP_W = this.CROP_W + deltaX;
      this.END_X = e.clientX;
      break;
    }
    case 'bottomRight': {
      const deltaX = e.clientX - this.END_X;
      const deltaY = e.clientY - this.END_Y;
      this.CROP_W = this.CROP_W + deltaX;
      this.CROP_H = this.CROP_H + deltaY;
      this.END_X = e.clientX;
      this.END_Y = e.clientY;
      break;
    }
    case 'bottomCenter': {
      const deltaY = e.clientY - this.END_Y;
      this.CROP_H = this.CROP_H + deltaY;
      this.END_Y = e.clientY;
      break;
    }
    case 'bottomLeft': {
      const deltaX = e.clientX - this.START_X;
      const deltaY = e.clientY - this.END_Y;
      this.CROP_W = this.CROP_W - deltaX;
      this.CROP_H = this.CROP_H + deltaY;
      this.START_X = e.clientX;
      this.END_Y = e.clientY;
      break;
    }
    case 'leftCenter': {
      const deltaX = e.clientX - this.START_X;
      this.CROP_W = this.CROP_W - deltaX;
      this.START_X = e.clientX;
      break;
    }
    }
  }
}
