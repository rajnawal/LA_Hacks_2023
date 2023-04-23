document.body.classList.add('loading');
let video = document.createElement('video');
video.width = 400;
video.height = 300;
video.autoplay = true;
let canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d', { willReadFrequently: true });

var detector;
// var classifier = objectdetect.ub;
var classifier = objectdetect.ff;
// var mirrorImage = objectdetect.mirrorImage

function detectFaces(canvas) {
    // Detect faces in the image:
    var rects = detector.detect(canvas);

    var prev = []

    // Draw rectangles around detected faces:
    for (var i = rects.length - 1; i >= 0; i--) {
        var overlap = false;

        var coord = rects[i];
        const currx = coord[0]+coord[2]/2;
        const curry = coord[1]+coord[3]/2;

        for (let i = 0; i < prev.length; i++) {
            var x = prev[i][0];
            var y = prev[i][1];
            const dist = (currx - x) * (currx - x) +
                (curry - y) * (curry - y);

            if (dist < 30*30 && Math.random() < .7) {
                overlap = true;
                break;
            }

        }

        if (overlap) {
            break;
        }

        prev.push([currx, curry]);
        // console.log([currx], [curry]);

        ctx.beginPath();
        ctx.lineWidth = '' + 2;
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.75)';
        ctx.rect(coord[0], coord[1], coord[2], coord[3]);
        ctx.stroke();
    }

    // console.log(prev);
}

// document.body.appendChild(video);
