let brushSize = 20;
let f = 0.5;
let spring = 1; //friction
let friction = 0.45;
let v = 0.5;
let r = 0;
let vx = 0;
let vy = 0;
let splitNum = 100;
let diff = 10;
let x = 0;
let y = 0;

let newPath = true;

let oldR, oldX, oldY;

function setup() {
  createCanvas(600, 600);

  setInterval(() => {
    background(243, 244, 234);
    loadJSON("/wine", gotGraden);
  }, 10000);
}

function draw() {}

let drawing;
function gotGraden(data) {
  console.log(data);
  let drawing = data.image.drawing;
  let sentence = data.sentence;
  console.log(drawing);

  // p.html(sentence);

  // Make the drawing
  push();
  translate(200, 100);
  inkDrawing(drawing);
  pop();

  push();
  translate(200, 100);
  scale(1, 1.5);
  for (let path of drawing) {
    noFill();
    blendMode(MULTIPLY);
    strokeCap(ROUND);
    stroke(203, 201, 196, 80);
    strokeWeight(30);
    beginShape();
    for (let i = 0; i < path[0].length; i++) {
      let x = path[0][i];
      let y = path[1][i];
      vertex(x, y);
    }
    endShape();
  }
  pop();

  push();
  fill(0);
  textSize(14);
  textFont("Georgia");
  textAlign(CENTER, CENTER);
  rectMode(CENTER, CENTER);
  text(sentence, width / 2, height - height / 4, width - 100);
  pop();
}

function inkDrawing(drawing) {
  // transform drawing data structure for this function
  let mypaths = drawing.map((d) =>
    d[0].map((e, index) => {
      return { x: e, y: d[1][index] };
    })
  );

  for (let drawing of mypaths) {
    let i = 0;
    let path = drawing[0]; // first parth of drawing
    let pX = path.x;
    let pY = path.y;
    for (path of drawing) {
      if (i++ === 0) {
        continue; // Ignore the first pass
      }

      // Inking stroke settings
      // Setting value of x and y
      vx += (path.x - x) * spring;
      vy += (path.y - y) * spring;
      vx *= friction;
      vy *= friction;

      // Do something to v
      v += sqrt(vx * vx + vy * vy) - v;
      v *= 0.55;

      // Do something to r
      oldR = r;
      r = brushSize - v;

      // Random numbers
      var num = random(0.1, 0.8);
      var num2 = random(0.1, 0.8);

      // Do something to r
      oldR += (r - oldR) / splitNum;
      if (oldR < 1) {
        oldR = 1;
      }

      // Set variables
      x = path.x;
      y = path.y;
      let oldX = pX;
      let oldY = pY;

      // Change the diff (Affects stroke)
      diff = 4;

      // Setting the stroke part
      stroke("black");
      strokeWeight(oldR * 0.35);

      // Drawing Part
      line(pX, pY, path.x, path.y);
      line(path.x + num, path.y + num, pX + num, pY + num);
      line(
        x + diff * num2,
        y + diff * num2,
        oldX + diff * num2,
        oldY + diff * num2
      ); // ADD
      line(
        x - diff * num,
        y - diff * num,
        oldX - diff * num,
        oldY - diff * num
      ); // ADD

      // Update the points
      pX = path.x;
      pY = path.y;
    }
  }
}
