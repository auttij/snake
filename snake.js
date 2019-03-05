function Snake() {
    this.x = 0;
    this.y = 240;
    this.xspeed = 1;
    this.yspeed = 0;
    this.length = 2;
    this.tail = [];

    this.dir = function(x, y) {
        // If player turns twice quick enough, it's possible to do 180 turns
        if (this.xspeed != -x && this.yspeed != -y) {
            this.xspeed = x;
            this.yspeed = y;
        }
    }

    this.eat = function() {
        d = dist(this.x, this.y, apos[0], apos[1])
        if (d < 1) {
            this.length++;
            apple();
        }
    }

    // Checks if the snake is colliding with itself and kills part
    // of the snake if it happens.
    this.death = function() {
        for (i = 0; i < this.tail.length; i++) {
            pos = this.tail[i];
            d = dist(this.x, this.y, pos[0], pos[1])
            if (d < 1) {
                this.tail = _.take(this.tail, i);
                this.length = i;
            }
        }
    }

    this.update = function() {
        // If we ate ate an apple, the oldest block doesn't get deleted
        this.tail.unshift([this.x, this.y]);
        if (this.tail.length > this.length) {            
            this.tail = _.dropRight(this.tail, 1);
        }

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
        
        // constrain x and y values so snake doesn't go offscreen 
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);

        this.eat();
    }

    this.show = function() {
        // Draw tail first, then head block
        for (i = 0; i < this.tail.length; i++) {
            fill(200);
            pos = this.tail[i];
            rect(pos[0], pos[1], scl, scl);
        }
        
        fill(255)
        rect(this.x, this.y, scl, scl);
    }
}