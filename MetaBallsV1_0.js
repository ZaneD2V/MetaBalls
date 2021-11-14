var grid = [];
var pixelSize = 1;
var threshhold = 0.5;
var x = 0;
var y = 0;

function setup() {
  createCanvas(500, 500, P2D);
}

function draw() {
  populateGrid();
  background(0, 50, 50);
  noStroke();
  //drawDebugPixels();
  drawContours();
}

function drawContours() {
  var a, b, c, d;
  stroke(255);
  strokeWeight(1);
  for (var i = 0; i < width / pixelSize - 1; i++) {
    for (var j = 0; j < height / pixelSize - 1; j++) {
      /*
      a---------------b
      |               |
      |               |
      |               |
      |               |
      d---------------c
      */
      a = grid[i][j] > threshhold;
      b = grid[i + 1][j] > threshhold;
      c = grid[i + 1][j + 1] > threshhold;
      d = grid[i][j + 1] > threshhold;

      //10                          ||01
      //00                          ||11        
      if (a && !b && !c && !d || !a && b && c && d) {
        line((i) * pixelSize, (j + 0.5) * pixelSize, (i + 0.5) * pixelSize, (j) * pixelSize);
      }
      //01                          ||10
      //00                          ||11        
      if (!a && b && !c && !d || a && !b && c && d) {
        line((i + 0.5) * pixelSize, (j) * pixelSize, (i + 1) * pixelSize, (j + 0.5) * pixelSize);
      }
      //00                          ||11
      //01                          ||10        
      if (!a && !b && c && !d || a && b && !c && d) {
        line((i + 1) * pixelSize, (j + 0.5) * pixelSize, (i + 0.5) * pixelSize, (j + 1) * pixelSize);
      }
      //00                          ||11
      //10                          ||01        
      if (!a && !b && !c && d || a && b && c && !d) {
        line((i + 0.5) * pixelSize, (j + 1) * pixelSize, (i) * pixelSize, (j + 0.5) * pixelSize);
      }
      //10
      //01       
      if (a && !b && c && !d) {
        line((i) * pixelSize, (j + 0.5) * pixelSize, (i + 0.5) * pixelSize, (j) * pixelSize);
        line((i + 1) * pixelSize, (j + 0.5) * pixelSize, (i + 0.5) * pixelSize, (j + 1) * pixelSize);
      }
      //01
      //10        
      if (!a && b && !c && d) {
        line((i + 0.5) * pixelSize, (j) * pixelSize, (i + 1) * pixelSize, (j + 0.5) * pixelSize);
        line((i + 0.5) * pixelSize, (j + 1) * pixelSize, (i) * pixelSize, (j + 0.5) * pixelSize);
      }
      //10                          ||01
      //10                          ||01        
      if (a && !b && !c && d || !a && b && c && !d) {
        line((i + 0.5) * pixelSize, (j) * pixelSize, (i + 0.5) * pixelSize, (j + 1) * pixelSize);
      }
      //11                          ||00
      //00                          ||11        
      if (a && b && !c && !d || !a && !b && c && d) {
        line((i) * pixelSize, (j + 0.5) * pixelSize, (i + 1) * pixelSize, (j + 0.5) * pixelSize);
      }

    }
  }
}

function keyPressed() {
  if (key == 'q') {
    threshhold += 1;
  }
  if (key == 'w') {
    threshhold -= 1;
  }
  if (key == '8') {

  }
}

//this function creates the grid from which the 
function populateGrid() {
  //location and size of each meta ball in the grid space[x, y, size]
  var metaBalls = [
    [mouseX / pixelSize, mouseY / pixelSize, 1000], 
    [width / (2 * pixelSize), height / (2 * pixelSize), 1000],
    [width / (4 * pixelSize), height / (4 * pixelSize), 1000],
    [width / (1.25 * pixelSize), height / (2 * pixelSize), 2000]
  ];

  //calculates for each pixel
  for (var i = 0; i < width / pixelSize; i++) {
    grid[i] = [];
    for (var j = 0; j < height / pixelSize; j++) {

      //the function to render
      //random noise
      //grid[i][j] = random(1);
      //circle in the middle of screen
      //grid[i][j] = sqrt(sq(i - width / (2 * pixelSize)) + sq(j - height / (2 * pixelSize)));
      //circle following mouse
      //grid[i][j] = sqrt(sq(i - mouseX / pixelSize) + sq(j - mouseY / pixelSize));
      //metaBalls!!!!!!
      
      grid[i][j] = 0;
      for (var m = 0; m < metaBalls.length; m++) {
        //grid[i][j] += Qa / sq(sqrt(sq(Cx - i) + sq(Cy - j)));
        grid[i][j] += metaBalls[m][2] / (sq(metaBalls[m][0] - i) + sq(metaBalls[m][1] - j));
      }
    }
  }
}

//draws pixels to debug
function drawDebugPixels() {
  for (var i = 0; i < width / pixelSize; i++) {
    for (var j = 0; j < height / pixelSize; j++) {
      if (grid[i][j] > threshhold) {
        fill(0, 155, 155);
      }
      else {
        fill(50);
      }
      circle(i * pixelSize, j * pixelSize, pixelSize / 2);
    }
  }
}
