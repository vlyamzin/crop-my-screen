import Cropper from './cropper';
import './css/styles.css';

class CropMyScreen {
  static prefix = 'crms';
  // BACKDROP_COLOR;
  // CROP_X;
  // CROP_Y;
  // CROP_W;
  // CROP_H;
  // START_X;
  // START_Y;
  // END_X;
  // END_Y;

  settings;
  cropper;


  constructor(options) {
    this.settings = { ...this._defaultOptions(), ...(options || {}) };
  }

  init() {
    // prepare and render all elements in DOM
    if (!this.cropper) {
      this.cropper = new Cropper(CropMyScreen.prefix);
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
      this.cropper.onStreamStarted = (stream) => {
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

export default CropMyScreen;