const CENTRAL = 300;
const MOON = 350;

//for drawing timeline 
let r = 200; // circle radius
let cx = 300; // circle center x
let cy = 300; // circle center y
let x = 300;
let y = 100;

//moon phases
let start = 0;
let lastTime = 0;
let phase = -1;
let fadeStartTime = 0;
let duration = 20000;
let fadeDuration = 2850;
let lastCycle = -1;

function setup() {
  let c = createCanvas(600, 600);
  c.parent("p5-container"); 
}

function draw() {
  background(0);
  fill(255)
    
  noFill();
  stroke(255);
    
  changeMoon();
  drawTimeline();
  timeTracker();
  markFullMoons();

}

//creates the time tracker that follows the timeline
function timeTracker() {
  push();
  translate(width/2, height/2);
  let u = (millis() % duration) / duration;

  let x, y;
  
  //borrowed from chatGPT
  if (u < 0.6) {
    // first 60% of time follow circle arc
    let t = map(u, 0, 0.6, -1.6, PI);
    x = r * cos(t);
    y = r * sin(t);
  } else {
    // last 40% of time follow spiral/taper
    let v = map(u, 0.6, 1, 0, 1); 
    let lastAngle = PI;
    let x0 = r * cos(lastAngle);
    let y0 = r * sin(lastAngle);
    let tx = -sin(lastAngle);
    let ty = cos(lastAngle);

    let bend = pow(v, 2);
    x = x0 + tx * v * 300 + bend * 250;
    y = y0 + ty * v * 300 - bend * 60;
  }

  fill(0);
  stroke(255);
  ellipse(x, y, 10, 10);
  pop();

}

function drawTimeline() {
  
  beginShape();
  
  let start = -1.6;
  let stop = PI; // stop before full circle
  let steps = 200; // resolution
  

  for (let i = 0; i < steps; i++) {
    let t = map(i, 0, steps, start, stop); //mapping to radians
    let x = width/2 + r * cos(t);
    let y = height/2 + r * sin(t);
    vertex(x, y);
  }
    
  let lastAngle = stop;
  //get coordinates of last angle
  let x0 = cx + r * cos(lastAngle); 
  let y0 = cy + r * sin(lastAngle);

  // tangent vector calculations, from chatGPT
  let tx = -sin(lastAngle);
  let ty = cos(lastAngle);

  // add extension points bending outward
  let taperSteps = 90;
  for (let j = 0; j < taperSteps; j++) {
    let u = j / (taperSteps-1);
    let bend = pow(u, 2);  // controls curve outward
    let x = x0 + tx * u * 300 + bend * 250; // tangent + sideways bend
    let y = y0 + ty * u * 300 - bend * 60; // tangent + drift away
    curveVertex(x, y);
  }
    
  endShape();
  
}

//marks out full moons on map
function markFullMoons() {
  let moons = 6;
  for(let i = 0; i < moons; i++) {
    let angle = 2*PI * i / 6 - HALF_PI;
    let x = cx + r * cos(angle) ;
    let y = cy + r* sin(angle);
    
    let dx = cos(angle) * 40;
    let dy = sin(angle) * 40;
    
    line(x, y, x + dx, y + dy);
    fill(255);
    ellipse(x + dx * 1.5, y + dy * 1.5, 15, 15);
  }
}

//changes illumination and prompts of full moon 
function changeMoon() {
  let fadeCycle = (millis() % fadeDuration) / fadeDuration; 

  let alpha = map(fadeCycle, 0, 1, 0, 255);

  push();
  fill(255, alpha);
  noStroke();
  ellipse(CENTRAL, CENTRAL, MOON, MOON);
  pop();
  
  let currentCycle = floor(millis() / fadeDuration);

  //cycle btwn phases
  if (currentCycle !== lastCycle) {
    phase = (phase + 1) % 5; // loop between 5 phases
    lastCycle = currentCycle;
  }
  
  let cycleTime = millis() % fadeDuration;
  if (cycleTime < 3000) { 
    push();
    fill(0);
    noStroke();
    if(phase == 0) {
      text("what is no longer serving you?", CENTRAL - 80, CENTRAL);
    } if(phase == 1) {
      text("what do you hope to achieve?", CENTRAL - 80, CENTRAL);
    } if(phase == 2) {
      text("where are you going?", CENTRAL - 80, CENTRAL);
    } if(phase == 3) {
      text("what are you prioritising?", CENTRAL - 80, CENTRAL);
    } if(phase == 4) {
      text("who do you want to be?", CENTRAL - 80, CENTRAL);
    } 
    pop();
  }
  
}
