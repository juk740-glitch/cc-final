let angle = 0; 
let counter = 0;

function setup() {
  let c = createCanvas(600, 600);
  c.parent("p5-container"); 
}

function draw() {
  background(255);
  
  stroke(0);
    
  drawSquares();
  
  stroke(255, 255, 0);
  strokeWeight(2);

  // loop through 3 rows and 3 columns
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {

      // color for each column
      if (col === 0) {
        fill(255, 0, 0); // red
      } else if (col === 1) {
        fill(0, 163, 0); // green
      } else {
        fill(0, 100, 255); // blue
      }

      // kanizsa block pos
      let baseX = 50 + col * 200;
      let baseY = 50 + row * 200;

      // 4 arcs for each block
      for (let corner = 0; corner < 4; corner++) {

        let offsetX = 0;
        let offsetY = 0;
        let rotation = 0;

        if (corner === 0) {
          offsetX = 0;
          offsetY = 0;
          rotation = HALF_PI + angle;
        } else if (corner === 1) {
          offsetX = 100;
          offsetY = 0;
          rotation = HALF_PI * 2 - angle;
        } else if (corner === 2) {
          offsetX = 100;
          offsetY = 100;
          rotation = HALF_PI * 3 + angle;
        } else if (corner === 3) {
          offsetX = 0;
          offsetY = 100;
          rotation = HALF_PI * 4 - angle;
        }

        push();
        translate(baseX + offsetX, baseY + offsetY);
        rotate(rotation);
        arc(0, 0, 80, 80, PI, HALF_PI);
        pop();
      }
    }
  }

  // animate
  angle += 0.009;
  
}

function drawSquares() {
  rectMode(CENTER);
  noFill();
  stroke(255, 0, 0);
  
  for(let row=0; row < 7; row++) {
    for(let col=0; col < 7; col++) {
      square(100 * col, 100 * row, 40);
    }
  }
}


