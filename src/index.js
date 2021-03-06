import Cropper from './cropper';
import './css/styles.css';

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
  settings;
  cropper;


  constructor(options) {
    try {
      this.settings = { ...this._defaultOptions(), ...(options || {}) };
      this._validateOptions(this.settings);
    } catch (e) {
      throw new Error('CropMyScreen: Plugin initialization error. Some of the provided options are invalid');
    }

    this.cropper = new Cropper(CropMyScreen.prefix);
    this.cropper.render({
      customClass: this.settings.previewerClass,
      backdropColor: this.settings.backdropColor,
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
      this.cropper.onStreamStarted = (stream) => {
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

  _validateOptions({backdropColor, cropX, cropY, cropW, cropH}) {
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

export default CropMyScreen;
