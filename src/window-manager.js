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

    if (!this._container || !this._dragZone){
      console.error('WindowManager: Container is not available');
      throw new Error('WindowManager: Container is not available');
    }

    this.init();
  }

  init() {
    this._isMoving = false;
    this._startCoords = {x: 0, y: 0};
    this._translateOffset = {x: 0, y: 0};
    this._deltaX = this._deltaY = 0;

    this._dragZone.addEventListener('mousedown', this._mouseDown.bind(this), false);
    document.addEventListener('mousemove', this._moveMove.bind(this), false);
    document.addEventListener('mouseup', this._mouseUp.bind(this), false);
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
