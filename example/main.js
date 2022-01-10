(function () {

  const startBtn = document.querySelector('#start-screenshare');
  const cropper = new CropMyScreen({
    previewerClass: 'test'
  });

  cropper.init();

  startBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });
      const videoTrack = stream.getVideoTracks()[0];

      cropper.start(stream)
        .then((stream) => {
          // send stream to peerjs room
          console.log(stream);
        })
        .catch(() => {
          console.error('Unable to get cropped stream');
          cropper.destroy();
        });

      videoTrack.onended = () => cropper.stop();
    } catch (error) {
      console.log('Error: ' + error);
    }
  });

})();
