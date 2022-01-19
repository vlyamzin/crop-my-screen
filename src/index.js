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
  static prefix = 'crms';
  settings;
  cropper;


  constructor(options) {
    this.settings = { ...this._defaultOptions(), ...(options || {}) };
  }

  /**
   * Prepare and render all elements of the plugin in DOM
   */
  init() {
    if (!this.cropper) {
      this.cropper = new Cropper(CropMyScreen.prefix);
    }

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
    this.cropper.destroy();
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
}

export default CropMyScreen;
