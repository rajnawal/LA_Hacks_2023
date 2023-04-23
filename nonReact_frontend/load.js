function onOpenCvReady() {
    document.body.classList.remove('loading');

    navigator.mediaDevices.getUserMedia({ video:true})
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(error => {
      console.error(error);
    });

  // Start processing frames from video stream
  setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    detector = new objectdetect.detector(canvas.width, canvas.height, 1.2, classifier);
	detectFaces(canvas);
  }, 1000 / 30);
}