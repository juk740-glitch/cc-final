const center = 200;
const headCenterY = 150;
const headBottomY = 200;

function setup() {
  let c = createCanvas(400, 600);
  c.parent("p5-container"); 
}
}

function draw() {
  background(205, 166, 205);
  
  noStroke();
  
  drawBody(0, 200);
  drawHead();
  drawBraids();
  addCharm();
  makeLegs();
}

//adds charm
function addCharm() {
  fill(0, 255, 0);
  ellipse(center, headBottomY + 3, 30, 15);
}

//santi's body
function drawBody(x, y) {
  push();
  translate(x, y);
  fill('rgb(173,39,173)');

  // draw a filled triangle body
  triangle(200, 0, 80, 200, 320, 200);

  pop();
}

//draws her face and head
function drawHead() {
 fill(255);
  ellipse(center, headCenterY, 125, 100);
  
  //bangs
  fill(0);
  arc(center, headCenterY - 20, 125, 100, -PI, 0);
  
  fill(255);
  triangle(170, 130, 180, 110, 175, 130);
  triangle(220, 130, 215, 110, 225, 130);
  
  //face
  push();
  translate(center, headCenterY);
  
  let eyeSize = 30;
  let pupilSize = 12;
  
  //left eye
  fill(0);
  stroke(0);
  arc(30, 0, eyeSize, eyeSize, 0, PI, CHORD);
  fill(255);
  stroke(0, 255, 0);
  strokeWeight(2);
  arc(30, 0, pupilSize, pupilSize, 0, PI, CHORD);
  
  //right eye
  fill(0);
  stroke(0);
  arc(-30, 0, eyeSize, eyeSize, 0, PI, CHORD);
  fill(255);
  stroke(0, 255, 0);
  strokeWeight(2);
  arc(-30, 0, pupilSize, pupilSize, 0, PI, CHORD);
  
  //lips
  fill(255, 111, 168);
  noStroke();
  ellipse(0, 30, 20, 13);
  stroke(0);
  line(-10, 30, 10, 30);
  
  pop();
}

//draws her braids
function drawBraids() {
  push();
  translate(150, 100);
  
  //left braids
  rotate(QUARTER_PI * 0.35);
  for(let i = 0; i < 10; i++) {
    fill(0);
    ellipse(0, 20 * i, 15, 20);
  }
  pop();
  
  //right braids
  push();
  translate(250, 100);
  rotate(-QUARTER_PI * 0.35);
  for(let i = 0; i < 10; i++) {
    fill(0);
    ellipse(0, 20 * i, 15, 20);
  }
  pop();
  
  //bow
  push();
  translate(103, 265);
  fill(255);
  triangle(0, 0, -20, -10, -20, 10);
  triangle(0, 0, 20, -10, 20, 15);
  pop();
  
  push();
  translate(296, 265);
  fill(255);
  triangle(0, 0, -20, -10, -20, 10);
  triangle(0, 0, 20, -10, 20, 15);
  pop();
  
}

//makes ghost body
function makeGhost() {
  let topY = headBottomY - 30;
  let bottomY = 500;
  let steps = 60; 
  
  //handles y value of each stripe
  for(let i = 0; i < steps; i++) {
    let inter = i / steps;
    let y = lerp(topY, bottomY, inter);
  
    let alpha = lerp(200, 0, inter);

    fill(255, alpha);
    let leftX = lerp(center, center - 150, inter);
    let rightX = lerp(center, center + 150, inter);

    quad(center, topY, leftX, y, rightX, y, center, topY);
  }
}

//angela's legs
function makeLegs() {
  stroke(0);
  fill(208,208,218);
  rect(140,400,50, 170);
  rect(110,570,80, 30);
  rect(210,400,50, 170);
  rect(210,570,80, 30);
  line(160,500,140,500);
  line(240,500,260,500);
  
}
