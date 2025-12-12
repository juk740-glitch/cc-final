let cols = 24; // 24 hours
let rows = 7;  // 7 days

let pattern = [
  [],                 // fri 
  [ [1, 1], [10, 2], [20, 2] ], // sat
  [ [22, 2] ],        // sun
  [ [0, 4] ],         // mon
  [ [23, 1] ],        // tue
  [ [22, 2] ],        // wed
  [ [0, 3] ]          // thur
];

let cellSize;
let filledCells = [];
let fadeDuration = 40;
let xOffset 
let yOffset 


function setup() {
  let c = createCanvas(600, 600);
  c.parent("p5-container"); 
  frameRate(30);
  noStroke();

  // calculate square cell size and center grid
  cellSize = min(width / cols, height / rows);
  let gridW = cols * cellSize;
  let gridH = rows * cellSize;
  xOffset = (width - gridW) / 2;
  yOffset = (height - gridH) / 2;

  // generate pattern
  for (let r = 0; r < rows; r++) {
    
    let dayPattern = pattern[r]; 

    for (let j = 0; j < dayPattern.length; j++) {
      let start = dayPattern[j][0];
      let hours = dayPattern[j][1];

      // fill squares
      for (let h = 0; h < hours; h++) {
        let cell = {
          r: r,
          c: start + h,
          startFrame: filledCells.length * 6,
          alpha: 0
        };
        filledCells.push(cell);
      }
    }
  }
}

function draw() {
  background(245);

  // draw crochet mesh grid
  stroke(210);
  strokeWeight(1);
  noFill();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rect(xOffset + c * cellSize, yOffset + r * cellSize, cellSize, cellSize);
    }
  }

  fillGrid();
  drawLabels();
  
}

//fills in grid
function fillGrid() {
  // fade-in animation for filled cells
  noStroke();
  for (let cell of filledCells) {
    let elapsed = frameCount - cell.startFrame;
    if (elapsed >= 0) {
      cell.alpha = constrain(map(elapsed, 0, fadeDuration, 0, 255), 0, 255);
      fill(70, 140, 255, cell.alpha);
      rect(xOffset + cell.c * cellSize, yOffset + cell.r * cellSize, 
           cellSize, cellSize, 3);
    }
  }
  
  let done = true;
  for (let i = 0; i < filledCells.length; i++) {
    if (filledCells[i].alpha < 255) {
      done = false; 
      break; //stops fade
    }
  }

  if (done) {
    noLoop();
  }
}

//hours of the day
function drawLabels() {
  noStroke();
  fill(60);
  textSize(14);
  
  textAlign(CENTER, BOTTOM);
  for (let hr = 0; hr < cols; hr ++) {
    text(hr, xOffset + hr * cellSize + cellSize / 2, yOffset - 4);
  }
}
