class Sender {
  peer;
  peerId;
  connection;
  connectionStatusLabel;

  constructor() {
    try {
      this.peer = new Peer();
      this.connectionStatusLabel = document.querySelector('#connection-status > span');
    } catch (e) {
      console.error(e);
    }

  }

  connect(id) {
    this.connection = this.peer.connect(id, { reliable: true });

    this.connection.on('open', () => {
      this.updateConnectionStatus(1);
      this.peerId = id;
    });

    // Firefox does not support this event yet
    this.connection.on('close', () => this.updateConnectionStatus(2));

    this.connection.on('error', () => this.updateConnectionStatus(3));
  }

  startSharing(stream) {
    if (!this.peerId) {
      console.log('Peer id is absent');
      return;
    }

    this.peer.call(this.peerId, stream);
  }

  updateConnectionStatus(status) {
    switch (status) {
    case 1:
      this.connectionStatusLabel.innerHTML = 'Connected';
      break;
    case 2:
      this.connectionStatusLabel.innerHTML = 'Closed';
      break;
    case 3:
      this.connectionStatusLabel.innerHTML = 'Error';
      break;
    default:
      this.connectionStatusLabel.innerHTML = '';
    }
  }
}


(function () {
  const connectionIdEl = document.getElementById('input-id');
  const connectBtn = document.getElementById('start-connection');
  const startBtn = document.querySelector('#start-screenshare');
  const iframe = document.querySelector('iframe');
  const constraints = iframe.getClientRects()[0];
  const sender = new Sender();
  const cropper = new CropMyScreen({
    previewerClass: 'test',
    cropX: constraints.x,
    cropY: constraints.y,
    cropW: constraints.width,
    cropH: constraints.height,
  });

  connectBtn.addEventListener('click', () => {
    const id = connectionIdEl.value;

    if (!id) {
      alert('Connection id is empty');
      return;
    }

    sender.connect(id);
  });

  startBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });
      const videoTrack = stream.getVideoTracks()[0];
      const constraints = {
        width: screen.width,
        height: screen.height
      };
      await videoTrack.applyConstraints(constraints);

      cropper.start(stream)
        .then((stream) => {
          // send stream to peerjs room
          sender.startSharing(stream);
        })
        .catch(() => {
          console.error('Unable to get cropped stream');
        });

      videoTrack.onended = () => cropper.stop();
    } catch (error) {
      console.log('Error: ' + error);
    }
  });

})();
