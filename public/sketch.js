let p;

function setup() {
  createCanvas(300, 300);

  p = createP("");
  p.style("width", "300px");
  setInterval(() => {
    background(200);
    loadJSON("/garden", gotGraden);
  }, 3000);
}

function gotGraden(data) {
  console.log(data);
  let drawing = data.image.drawing;
  let sentence = data.sentence;
  console.log(drawing);

  p.html(sentence);
  for (let path of drawing) {
    noFill();
    stroke(0);
    strokeWeight(3);
    beginShape();
    for (let i = 0; i < path[0].length; i++) {
      let x = path[0][i];
      let y = path[1][i];
      vertex(x, y);
    }
    endShape();
  }
}
