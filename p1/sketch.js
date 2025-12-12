//constants
const LENGTH = 800;
const WIDTH = 600;
const SKY = 200;
const SEA = 400;

let t = 0; //stall position
let person1x = -50;
let person2x = 650;

//loading images of fabric for stalls
function preload() {
  stall1 = loadImage('p1/kangas.jpg');
  stall2 = loadImage('p1/kenya.jpg');
  stall3 = loadImage('p1/uhh.png');
}

function setup() {
  let c = createCanvas(WIDTH, LENGTH);
  c.parent("p5-container"); 
}

function draw() {
  background(220);
  noStroke();
 
  //draw the sea
  drawSea();

  //draw the sand
  fill(250, 243, 236);
  rect(0, 600, WIDTH, 200);
    
  //adding swaying motion to stalls
  let sway = sin(t) * 5;
  let sway2 = sin(t + 1) * 5;
  
  //draw stalls 
  image(stall1, 150 + sway, 615, 50, 60);
  image(stall2, 400 + sway2, 650, 50, 60);
  image(stall3, 40 + sway, 700, 50, 60);
  image(stall2, 90 + sway2, 715, 50, 60);
  image(stall3, 450 + sway, 630, 50, 60);
  image(stall1, 330 + sway, 766, 50, 60);
  
  t+=0.02; //update position
  
  //draw person 1
  push();
  translate(person1x, 630);  // move based on personX
  drawPeople();
  
  person1x += 0.3; // walking speed
  if (person1x > WIDTH + 50) { // reset when off screen
    person1x = -50;
  }
  pop(); 
  
  //draw person 2
  push();
  translate(person2x, 730);  // move based on personX
  drawPeople();
  
  person2x -= 0.35; // walking speed
  if (person2x < 0) { // reset when off screen
    person2x = 650;
  }
  pop(); 

  //draw palm trees
  push();
  translate(100, 450);
  drawPalm();
  pop();
  
  push();
  translate(500, 500);
  drawPalm();
  pop();
  
  push();
  translate(250, 750);
  drawPalm();
  pop();
  
  push();
  translate(600, 700);
  drawPalm();
  pop();
  
  //draw sky
  fill(212, 230, 254);
  rect(0, 0, WIDTH, SKY);
  
  //draw sun
  drawSun();
}

//draws the ocean with gradient effect
function drawSea() {
  push();
  colorMode(HSB);
  let colorA = color(194, 96, 50);
  let colorB = color(185, 30, 97);
  let colorC = color(148, 28, 95);
  
  let stripeCount = 200;
  let stripeHeight = SEA / stripeCount;

  makeGradient(SEA, WIDTH, colorA, colorB);
  translate(0, 400);
  makeGradient(SEA, WIDTH, colorB, colorC);
  
  pop();
}

//makes a gradient
function makeGradient(formHeight, formWidth, colorA, colorB) {
  let stripeCount = 200;
  let stripeHeight = SEA / stripeCount;
  
  for(let y = 0; y < formHeight; y += stripeHeight) {
    let shift = sin(frameCount * 0.01 + y * 0.02) * 0.25;
    let fadeAmount = constrain((y / SEA) + shift, 0, 1);
    let gradient = lerpColor(colorA, colorB, fadeAmount);
    fill(gradient);
    rect(0, y, formWidth, stripeHeight);
  }
}

//draws palm tree
function drawPalm() {
  //left leaves
  push();
  fill(44, 172, 19);
  beginShape();
  vertex(0, 0);
  bezierVertex(-30, -30, -300, 50, 0, 0);
  endShape();
  rotate(QUARTER_PI/2);
  beginShape();
  vertex(0, 0);
  bezierVertex(-30, -30, -300, 50, 0, 0);
  endShape();
  rotate(QUARTER_PI/2);
  beginShape();
  vertex(0, 0);
  bezierVertex(-30, -30, -300, 50, 0, 0);
  endShape();
  rotate(QUARTER_PI/2);
  beginShape();
  vertex(0, 0);
  bezierVertex(-30, -30, -300, 50, 0, 0);
  endShape();
  rotate(QUARTER_PI/-2);
  beginShape();
  vertex(0, 0);
  bezierVertex(-30, -30, -300, 50, 0, 0);
  endShape();
  pop();
  
  //right leaves
  push();
  fill(44, 172, 19);
  beginShape();
  vertex(0, 0);
  bezierVertex(30, -30, 300, 50, 0, 0);
  endShape();
  rotate(QUARTER_PI/-2);
  beginShape();
  vertex(0, 0);
  bezierVertex(30, -30, 300, 50, 0, 0);
  endShape();
  rotate(QUARTER_PI/-2);
  beginShape();
  vertex(0, 0);
  bezierVertex(30, -30, 300, 50, 0, 0);
  endShape();
  rotate(QUARTER_PI/-2);
  beginShape();
  vertex(0, 0);
  bezierVertex(30, -30, 300, 50, 0, 0);
  endShape();
  pop();
  
  //trunks
  fill(82, 62, 43);
  rect(0, 0, 15, 300)
  
  //coconuts
  fill(169, 125, 60);
  ellipse(0, 0, 20, 20);
  ellipse(20, 0, 20, 20);
  ellipse(10, 10, 20, 20)
}

//draws people
function drawPeople() {
  fill(105, 65, 56)  
  ellipse(0, 0, 15, 15);
  fill(116, 41, 53);
  ellipse(0, 25, 20, 40);
}

//draws the sun using blendmode for sun glow 
function drawSun() {
  push();
  translate(500, 100);
  
  //sun glow around center
  fill(253, 232, 184);
  ellipse(0, 0, 150);

  fill(255, 218, 0)  
  ellipse(0, 0, 125);
  
  //makes bright center
  blendMode(SOFT_LIGHT); 
  fill(255, 204, 0);
  ellipse(0, 0, 110);

  pop();
}
