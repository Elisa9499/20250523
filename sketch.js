let faceMesh;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh = ml5.facemesh(video, modelReady);
  faceMesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("FaceMesh model loaded!");
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  stroke(255, 0, 0); // Red color
  strokeWeight(15); // Line thickness
  noFill();

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // Lip points based on FaceMesh keypoints
    const lipPoints = [
      409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405,
      321, 375, 291,
    ];

    beginShape();
    for (let i = 0; i < lipPoints.length; i++) {
      const [x, y] = keypoints[lipPoints[i]];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
