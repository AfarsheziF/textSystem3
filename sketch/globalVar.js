
function GlobalVar() {

    this.particleForce = -0.2;
    this.particleRadius = 0.5;
    this.particleJitter = 0.2;

    this.springForce = 0.0005;

    this.particleForceManupulation = 0.5;
    this.particleForceMinimum = 0.000000000001;

    this.showParticles = false;
    this.showLines = true;
    this.updateParticles = true;

    this.move = true;
    this.thisMouseX;
    this.thisMouseY;
    this.onHover = false;

    this.opacity = 35;
    this.linesLenght = 15;
    this.backgroundColor = 255;
    this.particalColor = 0;
    this.particleStroke = 2;

    this.textSize = 200;

    this.endSkatch = false;

    this.spacing = 5;
    this.spacingY = 25;

    this.diraction = "ltr";

    this.historySize = 10;
}