
var input = "";
var debug = false;

var mySketch = function (p) {

    p.physics;
    p.system;

    //-----SETUP-----//
    p.setup = function () {
        p.createCanvas(skatchWidth, skatchHeight).parent('sketch-holder');

        p.physics = new VerletPhysics2D();
        p.physics.setDrag(0.05);
        p.physics.setWorldBounds(p.rect(0, 0, p.width, p.height));

        p.system = new System(p);

    }

    //-----DRAW-----//
    p.draw = function () {
        //p.background(200);
        p.fill(globalVar.backgroundColor, 100);
        p.stroke(0);
        p.strokeWeight(5);
        p.rect(0, 0, p.width, p.height);

        p.textSize(globalVar.textSize);
        p.fill(255);
        p.strokeWeight(5);
        p.text(input, globalVar.textSize + 10, globalVar.textSize + 30);

        p.physics.update();

        p.system.run();
 
    }

    p.keyPressed = function () {
        switch (p.keyCode) {
            case 32:
                p.ptintSketch();
                break;
        }
    }

    p.mousePressed = function () {
        //p.system.addParticle(p.mouseX, p.mouseY);
    }

    p.mouseReleased = function () {

    }

    p.windowResized = function () {
        p.resizeCanvas(skatchWidth, skatchHeight);
        p.system.resizeSystem();
    }


    p.ptintSketch = function () {
        console.log(
            "\Sketch print",
            "\nWidth:", p.canvas.width,
            "\nHeight:",p.canvas.height,
            "\nParticles:", p.physics.particles.length,
            "\nStarting Point", initialStartingPoint
            );
        //for (var i = 0; i < this.particles.length; i++) {
        //    console.log(i, this.particles[i]);
        //}
    }

};
