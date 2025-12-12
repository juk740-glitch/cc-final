//variables
const MIDDLE = 200;
const FACE_W = 250; //base face W
const FACE_H = 200; //base face H

let saved = false;
let blush = false;
let bowColor;
let lastX;
let lastY;
  
function setup() {
  let c = createCanvas(400, 400);
  c.parent("p5-container"); 
  bowColor = color(255, 0, 0);
}

function draw() {
  background(220);
  
  let x = constrain(mouseX, 50, 500);
  let y = constrain(mouseY, 50, 500);
  
  //scaling x & y values 
  let scaleX = (x/2 * 1.25) / FACE_W; 
  let scaleY = (y/2) / FACE_H; 
  
  //draws and saves the last face (when mouse is clicked)
  push(); 
  translate(MIDDLE, MIDDLE); 
  if(!saved) {
      scale(scaleX, scaleY); 
      drawKitty();
  } else if(saved) {
      scale(lastX, lastY);
      drawKitty();
  }
  pop();
}

//draws her face
function drawKitty() {
  //head
  strokeWeight(4);
  fill(255);
  ellipse(0, 0, FACE_W, FACE_H);
  
  //ears
  //ear vertices
  let v1x = -FACE_W * 0.44;
  let v2x = FACE_W * 0.44;
  let vy = -FACE_H * 0.25;
  //ear offsets
  let e1 = FACE_W * 0.24;
  let e2 = FACE_W * 0.16;
  let e3 = FACE_W * 0.04;
  
  fill(255);
  drawEars(v1x, v2x, vy, e1, e2, e3);

  //bow
  fill(bowColor);
  drawBow(70, -60);
  
  //nose
  fill(237, 200, 40);
  ellipse(0, FACE_H * 0.2, 25, 15);
  
  //eyes
  fill(0);
  ellipse(-FACE_W * 0.22, 20, 15, 20);
  ellipse(FACE_W * 0.22, 20, 15, 20);
  
  //blush
  noStroke();
  if(blush) {
    drawBlush();
  }

  //whiskas
  drawWhiskers();
}

//draws her ears
function drawEars(v1x, v2x, vy, e1, e2, e3) {
  beginShape();
  vertex(v1x, vy);  // outside ear (L)
  curveVertex(v1x, vy);  // outside ear (L)
  curveVertex(v1x + e3, vy - e1);  // ear tip 
  curveVertex(v1x + e1, vy - e2); // ear right
  curveVertex(v1x + e1, vy - e2); // ear right
  endShape();

  beginShape();
  vertex(v2x, vy);  // outside ear (R)
  curveVertex(v2x, vy);  // outside ear (R)
  curveVertex(v2x - e3, vy - e1); // ear tip
  curveVertex(v2x - e1, vy - e2);  // ear left
  curveVertex(v2x - e1, vy - e2);  // ear left
  endShape(); 
}

//draws her bow
function drawBow(x, y) {
  beginShape(); //right shape
  curveVertex(x - 10, y - 10);  
  curveVertex(x - 25, y - 35); 
  curveVertex(x - 40, y - 35);
  curveVertex(x - 50, y);
  curveVertex(x - 40, y + 10);
  curveVertex(x - 15, y);
  endShape(CLOSE);
  
  beginShape(); //left shape
  curveVertex(x + 10, y);  
  curveVertex(x + 35, y - 20); 
  curveVertex(x + 45, y - 20);
  curveVertex(x + 50, y);
  curveVertex(x + 45, y + 25);
  curveVertex(x + 15, y + 10);
  endShape(CLOSE);
  
  ellipse(52, -67, 10, 10);
  ellipse(88, -57, 10, 10);
  ellipse(70, -60, 30, 30);

}

//draws the whiskers
function drawWhiskers() {
  stroke(0);
  line(-FACE_W * 0.36, 20, - FACE_W * 0.58, 15);
  line(-FACE_W * 0.36, 40, - FACE_W * 0.54, 40);
  line(-FACE_W * 0.34, 55, - FACE_W * 0.5, 70);
  
  line(FACE_W * 0.36, 20, FACE_W * 0.58, 15);
  line(FACE_W * 0.36, 40, FACE_W * 0.54, 40);
  line(FACE_W * 0.34, 55, FACE_W * 0.5, 70);
}

//changes bow color to different shades of red & pink
function changeBowColor() {
  let r = random(240, 255);
  let b = constrain(random(0, 255), 40, r);
  let g = constrain(random(0, 255), 0, b);
  
  bowColor = color(r, g, b); 
}

//handles customizations to the face
function mousePressed() {
  if(!saved) {
    saved = true; 
    lastX = (constrain(mouseX, 50, 500) / 2 * 1.25) / FACE_W;
    lastY = (constrain(mouseY, 50, 500) / 2) / FACE_H;
  } else if(saved) {
    changeBowColor();
  }
}

//adds blush when mouse is dragged
function mouseDragged() {
  blush = true;
}

//draws the blush on kitty
function drawBlush() {
  let blush = color(255, 150, 150, 75);
  let transparent = color(255, 150, 150, 0);


  let maxHeight = map(mouseY, 0, 400, 15, 70);

  let blushCount = 6;
  let blushSize = maxHeight / blushCount;

  for(let i = 0; i < maxHeight; i += blushSize) {
    let amt = map(i, 0, maxHeight, 0, 1);
    let blushGradient = lerpColor(blush, transparent, amt);
    fill(blushGradient);
    ellipse((-FACE_W * 0.25), 50, (1.33*i), blushSize*(i*0.05));
    ellipse((FACE_W * 0.25), 50, (1.33*i), blushSize*(i*0.05));
  }
  
}
