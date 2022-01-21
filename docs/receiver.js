
class Receiver {
  lastPeerId;
  peer;
  connection;
  video;

  constructor() {
    this.peer = new Peer();
  }

  init() {
    this.video = document.getElementById('received-content');

    // connect to Peerjs Cloud server and obtain peer/room Id
    // this id will be used by the host of screensharing session to join correct room
    this.peer.on('open', (id) => {
      if (this.peer.id === null) {
        console.log('Received null id from peer open');
      } else {
        this.lastPeerId = this.peer.id;
      }

      const connectionIdEl = document.getElementById('input-id');
      connectionIdEl.value = id;
    });

    // signal when host is joined to the peer/room
    // create connection between host and receiver
    this.peer.on('connection', (conn) => {
      console.log('peer connected');

      if (this.connection && this.connection.open) {
        conn.on('open', function () {
          conn.send('Already connected to another client');
          setTimeout(function () { conn.close(); }, 500);
        });
        return;
      }

      this.connection = conn;
      console.log('Connected to: ' + conn.peer);

      this.ready();
    });

    // listen for media stream
    this.peer.on('call', (call) => {
      call.answer();
      call.on('stream', (stream) => {
        this.renderStream(stream);
      });
    });
  }

  ready() {
    this.connection.on('data', (data) => {
      console.log(data);
    });

    this.connection.on('close', () => {
      console.log('Connection is terminated');
      this.connection = null;
    });
  }

  renderStream(data) {
    if (this.video) {
      this.video.srcObject = data;
    }
  }

}



(function () {
  const receiver = new Receiver();
  receiver.init();
})();
