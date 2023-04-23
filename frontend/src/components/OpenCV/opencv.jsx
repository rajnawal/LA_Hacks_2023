import React from 'react';

const OpenCV = () => {
  return (
    <>
        <canvas id="canvas" className="video" width="400" height="300"></canvas>
        
        <script async src="opencv.js" onload="onOpenCvReady();" type="text/javascript"></script>
        <script src="objectdetect.js"></script>
        {/* <script src="objectdetect.ub.js"></script> */}
        <script src="objectdetect.ff.js"></script>
        <script src="script.js" type="text/javascript"></script>
    </>
  );
};

export default OpenCV;
