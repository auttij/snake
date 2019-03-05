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
        if ((this.x - apos[0]) == 0 && (this.y - apos[1]) == 0) {
            this.length++;
            apple();
        }
    }

    this.death = function() {

    }

    this.update = function() {
        // If we ate ate an apple, the oldest block doesn't get deleted
        if (this.tail.length > this.length) {            
            this.tail = _.dropRight(this.tail, 1);
        }
        this.tail.unshift([this.x, this.y]);

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
            block = this.tail[i];
            rect(block[0], block[1], scl, scl);
        }
        
        fill(255)
        rect(this.x, this.y, scl, scl);
    }
}