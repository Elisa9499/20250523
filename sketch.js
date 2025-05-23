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

    // Additional points for new array
    const additionalPoints = [
      76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11,
      72, 73, 74, 184,
    ];

    // Fill the area between the two arrays with green
    fill(0, 255, 0); // Green fill
    beginShape();
    for (let i = 0; i < lipPoints.length; i++) {
      const [x, y] = keypoints[lipPoints[i]];
      vertex(x, y);
    }
    for (let i = additionalPoints.length - 1; i >= 0; i--) {
      const [x, y] = keypoints[additionalPoints[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw the first array (lips)
    noFill();
    stroke(255, 0, 0); // Red color
    beginShape();
    for (let i = 0; i < lipPoints.length; i++) {
      const [x, y] = keypoints[lipPoints[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw the second array
    fill(255, 255, 0); // Yellow fill
    beginShape();
    for (let i = 0; i < additionalPoints.length; i++) {
      const [x, y] = keypoints[additionalPoints[i]];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
