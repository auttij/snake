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