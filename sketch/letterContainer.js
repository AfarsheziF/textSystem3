
function LetterContainer(_p5, position, index, size) {

    this.p5 = _p5;
    this.index = index;

    this.positions = [];
    this.positions.push(position);
    //this.positions.push(new Vec2D(
    //    this.positions[this.positions.length - 1].x + size, 
    //    this.positions[this.positions.length - 1].y));
    //this.positions.push(new Vec2D(
    //    this.positions[this.positions.length - 2].x, 
    //    this.positions[this.positions.length - 1].y + size));
    //this.positions.push(new Vec2D(
    //    this.positions[this.positions.length - 1].x + size,
    //    this.positions[this.positions.length - 1].y));

    for (var i = 0; i <= 5; i++) {
        
    }

    this.update = function() {

    }

    this.display = function() {
        for (var i = 0; i < this.positions.length; i++) {
            this.p5.stroke(0,255,0);
            this.p5.strokeWeight(5);
            this.p5.point(this.positions[i].x, this.positions[i].y);
        }

        if (true) {
            this.debug();
        }
    }

    this.debug = function () {
        for (var i = 0; i < this.positions.length; i++) {
            this.p5.textSize(15);
            this.p5.stroke(0, 255, 0);
            this.p5.fill(0, 255, 0);
            this.p5.strokeWeight(0);
            this.p5.text(i, this.positions[i].x, this.positions[i].y - 10);
        }
    }
};