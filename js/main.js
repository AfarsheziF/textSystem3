﻿
var skatch;
var globalVar = new GlobalVar();
var skatchWidth;
var skatchHeight;

function execute() {
    console.log("Execute");
    var skatchDiv = document.getElementById("sketch-holder");

    skatchWidth = skatchDiv.offsetWidth;
    skatchHeight = skatchDiv.offsetHeight;
    console.log("Div size", skatchWidth, skatchHeight);
    skatch = new p5(mySketch);
}


function startSystem() {

}

window.onresize = function (event) {
    var skatchDiv = document.getElementById("sketch-holder");
    skatchHeight = skatchDiv.offsetHeight;
    skatchWidth = skatchDiv.offsetWidth;
};


//listeners//


