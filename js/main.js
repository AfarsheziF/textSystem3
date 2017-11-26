
var skatch;
var globalVar = new GlobalVar();
var skatchWidth;
var skatchHeight;

function execute() {
    console.log("Execute");
    var skatchDiv = document.getElementById("sketch-holder");
    skatchHeight = skatchDiv.offsetHeight;
    skatchWidth = skatchDiv.offsetWidth;
    console.log("Div size", skatchWidth, skatchHeight);
    skatch = new p5(mySketch);
}


window.onresize = function (event) {
    var skatchDiv = document.getElementById("sketch-holder");
    skatchHeight = skatchDiv.offsetHeight;
    skatchWidth = skatchDiv.offsetWidth;
};


//listeners//

window.addEventListener('message', function (event) {

    //console.log("Incoming message", event);
    var messegeObj = event.data;

    switch (messegeObj.order) {
        case "printThisPoem":
            if (globalVar.diraction !== null) {
                globalVar.diraction = messegeObj.diraction;
            }
            skatch.system.setStartingPoint();
            skatch.system.printThisPoem(messegeObj.data);
            break;

        case "setGlobarVar":
            if (messegeObj.data.metric === "init") {
                globalVar = new GlobalVar();
            } else {
                globalVar[messegeObj.data.metric] = messegeObj.data.value;
                console.log("glovalVar", messegeObj.data.metric, "set to", messegeObj.data.value);
            }
            break;
    }

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

$('document').ready(function () {
    console.log(window.opener);
    if (window.opener != null) {
        function sendCallBack(callback) {
            window.opener.postMessage(callback, "*");
            console.log("ready sent");
        }

        sendCallBack("ready");
    }
});