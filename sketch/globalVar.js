﻿
function GlobalVar() {

    this.particleForce = -0.2;
    this.particleRadius = 10;
    this.particleJitter = 0;

    this.springForce = 0.005;

    this.particleForceManupulation = 0.5;
    this.particleForceMinimum = 0.000000000001;

    this.showParticles = true;
    this.showLines = true;

    this.move = true;
    this.thisMouseX;
    this.thisMouseY;
    this.onHover = false;

    this.opacity = 10;
    this.linesLenght = 15;
    this.backgroundColor = 255;
    this.particalColor = 0;
    this.particleStroke = 2;

    this.textSize = 200;

    this.endSkatch = false;

    this.spacing = 5;
}