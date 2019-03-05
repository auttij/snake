w = 640;
h = 480;

var s;          // Global variable for storing the Snake object
var scl = 20;   // Scale used for size of single block
var apos;       // Global variable for storing apple position
var running = true  // Toggles pausing the game

function setup() {
    createCanvas(w, h);
    frameRate(12);
    s = new Snake();
    apple();
}

function draw() {
    background(51);
    
    s.death();
    if (running) {
        s.update();
    } 
    s.show();
    showApple();

    if (!running) {
        drawPause();
    }
}

function drawPause() {
    textSize(32);
    fill(255);
    strokeWeight(4);
    stroke(0); // Black stroke for the text
    textAlign(CENTER);
    text('Paused', w/2, h/3);

    // Reset stroke thickness for other things.
    strokeWeight(1);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW || keyCode === "A") {
        s.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW || keyCode === 'D') {
        s.dir(1, 0);
    }  else if (keyCode === UP_ARROW || keyCode === 'W') {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW || keyCode === 'S') {
        s.dir(0, 1);
    } else if (keyCode == ESCAPE) {
        running = !running; // Toggles paused
    }
}

function apple() {
    apos = [floor(random(width / scl)) * scl,
            floor(random(height / scl)) * scl];
}

function showApple() {
    fill('red');
    rect(apos[0], apos[1], scl, scl);
}
