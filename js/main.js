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

window.addEventListener('message', function (event) {

    console.log("Incoming message", event);

    //// IMPORTANT: Check the origin of the data! 
    //if (~event.origin.indexOf('http://yoursite.com')) {
    //    // The data has been sent from your site 

    //    // The data sent with postMessage is stored in event.data 
    //    console.log(event.data);
    //} else {
    //    // The data hasn't been sent from your site! 
    //    // Be careful! Do not use it. 
    //    return;
    //}

});

