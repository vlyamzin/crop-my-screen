let withPrefix;
const doCallback = (callback, params) => {
  if (callback && typeof callback === 'function') {
    callback.call(this, params);
  }
};

export default class Cropper {
  containerEl;
  videoEl;
  canvas;

  _prefix;
  _containerId = 'container';

  constructor(prefix) {
    this._prefix = prefix;

    withPrefix = (id) => {
      return `${prefix}-${id}`;
    };
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
    const { x, y, dx, dy } = constraints;
    const context = this.canvas.getContext('2d');

    this.videoEl.ontimeupdate = () => {
      this._cropFrame(context, this.videoEl, x, y, dx, dy);
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

  onStreamStarted(stream) {console.log(stream);}

  onStreamStopped() {}

  _cropFrame(context, video, startX, startY, endX, endY) {
    if (!context) return;

    context.drawImage(
      video,
      startX,
      startY,
      endX,
      endY,
      0,
      0,
      endX,
      endY
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

    // HEADER BUTTONS
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
        // trigger onStreamCancel event
        this.stopStream();
        this.onStreamStopped();
      }
    };

    const shareArea = {
      id: withPrefix('btn-get-share-area'),
      text: 'Select Area',
      primary: false,
      visible: true,
      callback: () => console.log('Area selection is disabled')
    };
    const cancelArea = {
      id: withPrefix('btn-cancel-share-area'),
      text: 'Cancel',
      primary: false,
      callback: () => console.log('cancel'),
      visible: false
    };
    const shareStart = {
      id: withPrefix('btn-start-sharing'),
      text: 'Start presentation',
      primary: true,
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

    [cancelArea, shareArea, shareStart].forEach(btnSettings => {
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
  
  _initHeaderButton({id, text, callback}) {
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.innerText = text;
    btn.onclick = () => {
      doCallback(callback);
    };
    return btn;
  }

  _initPreviewButton({ id, text, primary, visible, callback }) {
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('type', 'button');
    btn.classList.add('btn');
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


}
