(function () {

  const startBtn = document.querySelector('#start-screenshare');
  const iframe = document.querySelector('iframe');
  const constraints = iframe.getClientRects()[0];
  const cropper = new CropMyScreen({
    previewerClass: 'test',
    cropX: constraints.x,
    cropY: constraints.y,
    cropW: constraints.width,
    cropH: constraints.height,
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
          console.log(stream);
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
