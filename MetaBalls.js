//houses the value of each "pixel" baced on the given formula.
var grid = [];
//the size of each pixel
var pixelSize = 1;
//the value of the pixels that will form the line
var threshhold = 0.5;
//variable that stores the state of the menu
var menuState = 0;
//
var menuScroll = 0;
//
var menuWidth = 200;
//location and size of each meta ball in the grid space[x, y, size, momentumX, momentumY]
/*
var metaBalls = [
  [mouseX / pixelSize, mouseY / pixelSize, 1000, 0],
  [width / (2 * pixelSize), height / (2 * pixelSize), 1000, 0],
  [width / (4 * pixelSize), height / (4 * pixelSize), 1000, 0],
  [width / (1.25 * pixelSize), height / (2 * pixelSize), 1000, 0]
];
*/
var metaBalls = [];
//amount of metaballs
var metaBallAmount = 5;
//the distance from the edge at which the balls will "bounce"  back
var edgeSpace = 50;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  //animates the metaballs
  if (menuState == 0) {
    animateMetaBalls();
    populateGrid();
    background(0, 50, 50);
    noStroke();
    //drawDebugPixels();
    drawContours();
    drawMenuButton();
  }
  else if (menuState == 1) {
    background(0, 50, 50);
    drawMenu();
    drawContours();
  }

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
}

//this function creates the grid from which the 
function populateGrid() {

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

function mouseClicked() {
  if (mouseX < 25 && mouseY < 25) {
    menuState = 1;
  }
  return false;
}

function drawMenuButton() {
  if (mouseX < 25 && mouseY < 25) {
    stroke(10, 200, 180);
  }
  else {
    stroke(10, 150, 150);
  }

  strokeWeight(3);
  line(10, 10, 20, 10);
  line(10, 15, 20, 15);
  line(10, 20, 20, 20);
}

function drawMenu() {

  if (mouseX < menuWidth) {
    if (menuScroll < menuWidth) {
      menuScroll += 20;
    }
  }
  else {
    menuScroll -= 20;
    if (menuScroll <= 0) {
      menuState = 0;
    }
  }

  strokeWeight(1);
  fill(0, 70, 70);
  rect(1, 1, menuScroll - 1, height - 1);
}

function animateMetaBalls() {
  if (metaBalls.length < metaBallAmount) {
    //location and size of each meta ball in the grid space[x, y, size, momentumX, momentumY]
    metaBalls.push([
      /* X */               random(edgeSpace + 1, width - edgeSpace - 1),
      /* Y */               random(edgeSpace + 1, height - edgeSpace - 1),
      /* size */            1000,
      /* momentumX */       random(-3, 3),
      /* momentumY */       random(-3, 3)
    ]);
  }

  for (var i = 0; i < metaBalls.length; i++) {
    metaBalls[i][0] += metaBalls[i][3];
    metaBalls[i][1] += metaBalls[i][4];

    //edge detection
    //if X close to 0 or width, flip the momentumX with * -1
    if (metaBalls[i][0] < edgeSpace || metaBalls[i][0] > width - edgeSpace) {
      metaBalls[i][3] = metaBalls[i][3] * (-1);
    }
    //if Y close to 0 or width, flip the momentumY with * -1
    if (metaBalls[i][1] < edgeSpace || metaBalls[i][1] > width - edgeSpace) {
      metaBalls[i][4] = metaBalls[i][4] * (-1);
    }
  }


}
