
var input = "";
var debug = false;
var lastFpsPrint = 0;
var showFrameRate = false

var mySketch = function (p) {

    p.physics;
    p.system;

    //-----SETUP-----//
    p.setup = function () {
        p.createCanvas(skatchWidth, skatchHeight, "WEBGL").parent('sketch-holder');

        p.physics = new VerletPhysics2D();
        p.physics.setDrag(0.05);
        p.physics.setWorldBounds(p.rect(0, 0, p.width, p.height));

        p.system = new System(p);
        p.background(globalVar.backgroundColor);

    }

    //-----DRAW-----//
    p.draw = function () {
        p.fill(globalVar.backgroundColor, globalVar.opacity);
        p.stroke(0);
        p.strokeWeight(0);
        p.rect(0, 0, p.width, p.height);

        p.physics.update();

        p.system.run();

        if (debug || showFrameRate) {
            if (p.millis() > lastFpsPrint) {
                lastFpsPrint = p.millis() + 200;
                p.fill(0);
                p.stroke(0);
                p.text(p.frameRate(), 50, 50);
            }
        }
    }

    p.keyPressed = function () {
        switch (p.keyCode) {
            case 32:
                p.ptintSketch();
                break;

            case 70:
                p.system.clearSystem();
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
        if (p.system != null) {
            p.system.resizeSystem();
        }
    }


    p.ptintSketch = function () {
        console.log(
            "\Sketch print",
            "\nWidth:", p.canvas.width,
            "\nHeight:", p.canvas.height,
            "\nParticles:", p.physics.particles.length,
            "\nStarting Point", initialStartingPoint
            );
        //for (var i = 0; i < this.particles.length; i++) {
        //    console.log(i, this.particles[i]);
        //}
    }

};
