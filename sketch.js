w = 640;
h = 480;

var s;          // Global variable for storing the Snake object
var scl = 20;   // Scale used for size of single block
var apos; //global variable for storing apple position

function setup() {
    createCanvas(w, h);
    frameRate(12);
    s = new Snake();
    apple();
}

function draw() {
    background(51);
    s.update();
    s.show();
    showApple();
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
