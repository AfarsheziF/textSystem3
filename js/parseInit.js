
Parse.initialize(
       "mePlZcG5fODbUvj19DGboB5iHCP7BVVOTz5C3R9z",
       "x32xV13HUSCJCS9kkt6uTm1zQPVn8RCVO9fzB5a7"
   );
Parse.serverURL = 'https://pg-app-1cltxnshjksg0clafdwxiw4ark8dvr.scalabl.cloud/1/';


var data;
var activeObject;

loadObject();

function loadObject() {
    var query = new Parse.Query("Uncertainty");
    query.descending("createdAt");
    query.find().then(
        function (results) {
            data = results;
            setActiveObject(0);
            console.log("Uncertainty data:", data);
            execute();
        }, function (error) {
            console.log(error);
        }
    );
}

function setActiveObject(pos) {
    activeObject = data[pos];
    globalVar.resolution = activeObject.get("resolution");
    console.log("");
    console.log("Active object", activeObject.get("name"));
    console.log("Resolution", globalVar.resolution);
}

function savethisLetter(letterName, particles) {

    var masterMap = activeObject.get("masterMap");
    console.log("savethisLetter", letterName, particles);

    if (masterMap[letterName] == null) {
        masterMap[letterName] = {};
    }

    masterMap[letterName].name = letterName;
    masterMap[letterName].data = [];

    for (var i = 0; i < particles.length; i++) {
        var leterVec;
        if (i === 0) {
            leterVec = {
                index: i,
                x: particles[i].pervXdis,
                y: particles[i].pervYdis
            };
        }

        else {
            leterVec = {
                index: i,
                rel: i - 1,
                x: particles[i].pervXdis,
                y: particles[i].pervYdis
            };
        }

        masterMap[letterName].data.push(leterVec);
    }

    activeObject.set("masterMap", masterMap);
    activeObject.save().then(
        function () {
            console.log("Master map saved", masterMap);
        },
        function (error) {
            console.log(error);
        }
    );

    console.log(masterMap, letterName, particles);
}

function sendEmail(subject, name, email, text) {

    Parse.Cloud.run("sendMail", {
        param1: subject,
        param2:
            "New messege sent from Joliba site! :) <br><br>" +
            "<b> Name: </b>" + name + "<br>" +
            "<b>Email: </b>" + email + "<br>" +
            "<b>Text: </b>" + text
    })
        .then(function (result) {
            console.log("result :" + JSON.stringify(result))
        }, function (error) {
            console.log("result :" + result);
        }
    );

}