
function Particle(p5, index, gridIndex, target, related) {
    this.index = index;
    this.gridIndex = gridIndex;
    this.related = related;
    this.target = target;

    this.p = new VerletParticle2D(p5.random(p5.width), p5.random(p5.height));
    p5.physics.addParticle(this.p);

    this.spring = new VerletSpring2D(new VerletParticle2D(target), this.p, 1, 1);
    this.spring.lockA(true);
    p5.physics.addSpring(this.spring);

    this.attractionBehavior = new AttractionBehavior(this.p, globalVar.particleRadius, globalVar.particleForce);
    p5.physics.addBehavior(this.attractionBehavior);

    this.updatePosition = function (newPosition) {
        this.target.x = newPosition.x;
        this.target.y = newPosition.y;

        p5.physics.removeSpring(this.spring);
        this.spring = new VerletSpring2D(new VerletParticle2D(target), this.p, 1, 1);
        this.spring.lockA(true);
        p5.physics.addSpring(this.spring);
    }
}

function LetterParticle(p5, index, data) {
    //console.log("On create letter", data);
    this.p5 = p5;

    this.particles = [];
    this.container = [];
    this.totalWidth = 0;
    this.gridCount = data.gridCount;
    this.position;

    this.createContainer = function (position, widthCount) {
        var count = 0;
        this.container.push(new Vec2D(position));
        while (count < widthCount) {
            count++;
            this.container.push(new Vec2D(position.x + globalVar.spacing * count, position.y));
        }

        count = 0;
        var y1 = new Vec2D(position.x, position.y + globalVar.spacing);
        this.container.push(y1);
        while (count < widthCount) {
            count++;
            this.container.push(new Vec2D(y1.x + globalVar.spacing * count, y1.y));
        }

        count = 0;
        y1 = new Vec2D(position.x, position.y + globalVar.spacing * 2);
        this.container.push(y1);
        while (count < widthCount) {
            count++;
            this.container.push(new Vec2D(y1.x + globalVar.spacing * count, y1.y));
        }

        count = 0;
        y1 = new Vec2D(position.x, position.y + globalVar.spacing * 3);
        this.container.push(y1);
        while (count < widthCount) {
            count++;
            this.container.push(new Vec2D(y1.x + globalVar.spacing * count, y1.y));
        }

        count = 0;
        y1 = new Vec2D(position.x, position.y + globalVar.spacing * 4);
        this.container.push(y1);
        while (count < widthCount) {
            count++;
            this.container.push(new Vec2D(y1.x + globalVar.spacing * count, y1.y));
        }


        this.totalWidth = this.p5.dist(this.container[0].x, this.container[0].y, this.container[widthCount].x, this.container[widthCount].y);
        if (letterHight == null && widthCount === 3) {
            letterHight = this.totalWidth;
            console.log("Letter height set to:", letterHight);
        }
        //console.log("Container created. Total width: ", this.totalWidth, position);
    }

    this.createLetter = function (data) {
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            this.particles.push(new Particle(
                this.p5,
                i,
                data[i].gridIndex,
                new Vec2D(this.container[data[i].gridIndex].x, this.container[data[i].gridIndex].y),
                data[i].rel));
        }
    }

    this.setLetter = function (position) {
        //console.log("Set letter", position);
        this.position = position;
        this.createContainer(position, this.gridCount);
        this.createLetter(data.data, this.container);
    }

    this.moveLetter = function (position) {
        this.position = position;
        this.container = [];
        this.createContainer(position, this.gridCount);

        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            var gridVec = new Vec2D(this.container[this.particles[i].gridIndex].x, this.container[this.particles[i].gridIndex].y);
            p.updatePosition(gridVec);
        }
    }

    this.index = index;
    this.color = globalVar.particalColor;

    this.update = function () {
        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.attractionBehavior.setStrength(globalVar.particleForce);
            particle.attractionBehavior.setJitter(globalVar.particleForce);
            particle.attractionBehavior.setRadius(globalVar.particleRadius);
            particle.spring.setStrength(globalVar.springForce);
        }
    }

    this.display = function () {
        if (!debug) {
            for (var i = 0; i < this.particles.length; i++) {
                var thisParticle = this.particles[i];
                this.p5.stroke(this.color);
                this.p5.strokeWeight(globalVar.particleStroke);
                this.p5.point(thisParticle.p.x, thisParticle.p.y);

                if (globalVar.showLines) {
                    if (thisParticle.related != null && thisParticle.related !== "") {
                        var related;
                        if ($.isArray(thisParticle.related)) {
                            for (var y = 0; y < thisParticle.related.length; y++) {
                                related = this.particles[thisParticle.related[y]];
                                this.p5.line(thisParticle.p.x, thisParticle.p.y, related.p.x, related.p.y);
                            }
                        } else {
                            related = this.particles[thisParticle.related];
                            this.p5.line(thisParticle.p.x, thisParticle.p.y, related.p.x, related.p.y);
                        }
                    }
                }
            }
        }

        else {
            this.debug();
        }

    }

    this.debug = function () {
        //this.p5.textSize(15);
        //this.p5.stroke(this.color);
        //this.p5.fill(this.color);
        //this.p5.strokeWeight(0);
        //this.p5.text(this.index + " | X: " + this.pervXdis + " Y: " + this.pervYdis, this.x, this.y - 10);

        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];

            //this.p5.stroke(255);
            //this.p5.strokeWeight(globalVar.particleStroke);
            //this.p5.point(particle.p.x, particle.p.y);

            this.p5.stroke(0, 255, 0);
            this.p5.strokeWeight(globalVar.particleStroke);
            this.p5.point(particle.target.x, particle.target.y);

            //this.p5.stroke(255, 0, 0);
            //this.p5.strokeWeight(3);
            //this.p5.line(particle.spring.a.x, particle.spring.a.y, particle.spring.b.x, particle.spring.b.y);
        }

        //Show container//
        //for (var i = 0; i < this.container.length; i++) {
        //    this.p5.stroke(0, 255, 0);
        //    if (this.index === 0) {
        //        this.p5.stroke(0, 0, 255);
        //    }
        //    this.p5.strokeWeight(2);
        //    this.p5.point(this.container[i].x, this.container[i].y);
        //}
    }

}
