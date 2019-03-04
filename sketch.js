w = 640;
h = 480;

var s;          // Global variable for storing the Snake object
var scl = 20;   // Scale used for size of single block
var apos = { 'x': 0, 'y':0 };

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
    apos['x'] = floor(random(width / scl)) * scl;
    apos['y'] = floor(random(height / scl)) * scl;
}

function showApple() {
    fill('red');
    rect(apos['x'], apos['y'], scl, scl);
}


function Snake() {
    this.x = 0;
    this.y = 240;
    this.xspeed = 1;
    this.yspeed = 0;
    this.length = 0;
    this.tail = [];

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function() {
        if ((this.x - apos['x']) == 0 && (this.y - apos['y']) == 0) {
            this.length++;
            apple();
        }
    }

    this.update = function() {
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
        
        // constrain x and y values so snake doesn't go offscreen 
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);

        this.eat();

        if (this.tail.length > this.length) {            
            this.tail = _.dropRight(this.tail, 1);
        }
        this.tail.unshift([this.x, this.y]);
    }

    this.show = function() {
        // Draw tail first, then head block
        for (i = 1; i < this.tail.length; i++) {
            fill(200);
            block = this.tail[i];
            rect(block[0], block[1], scl, scl);
        }
        
        fill(255)
        rect(this.x, this.y, scl, scl);
    }
}