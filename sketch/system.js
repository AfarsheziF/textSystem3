
var initialStartingPoint;
var startingPointX = 50;
var startingPointY = 50;
var lastWord;
var lastLetter;
var letterHight;
var wordsCount = 0;
var rowsCount = 0;
var poemArray;

var sentencesCount = 0;
var sentenceIsReady = false;
var sentenceToSort;

var printPoemSentence = false;
var poemSentenceIndex;
var onPrintSentence = false;
var wordInSentenceIndex;
var thisSentence;
var onLoadingWord = false;

function System(p5) {

    this.p5 = p5;
    this.particles = [];
    this.containers = [];
    this.sentences = {};

    this.setStartingPoint = function () {
        if (!globalVar.onHebrew) {
            if (this.p5.width >= 1050) {
                initialStartingPoint = new Vec2D(this.p5.width / 6.25, this.p5.height / 5.5);
            } else {
                initialStartingPoint = new Vec2D(this.p5.width / 10.25, this.p5.height / 5.5);
            }
        } else {
            if (this.p5.width >= 1050) {
                initialStartingPoint = new Vec2D(this.p5.width - (this.p5.width / 6.25), this.p5.height / 5.5);
            } else {
                initialStartingPoint = new Vec2D(this.p5.width - (this.p5.width / 10.25), this.p5.height / 5.5);
            }
        }
        console.log("setStartingPoint:", initialStartingPoint);
    }

    this.setStartingPoint();

    this.addParticle = function (x, y, related, letterToPrint, isLastParticle) {
        var p = new LetterParticle(this.p5, new Vec2D(x, y), this.particles.length, related);
        //this.particles.push(p);
        var letterName;
        if (!isLastParticle) {
            letterName = letterToPrint + lettersCount;
            if (this.letters[letterName] == null) {
                this.letters[letterName] = { letter: letterToPrint, particles: [] };
            }
        } else {
            letterName = letterToPrint + lettersCount;
            lettersCount++;
        }

        this.letters[letterName].particles.push(p);
        lastLetterVec = new Vec2D(x, y);
        console.log("Add particle", x, y, letterToPrint, this.letters);
    }

    this.calculateSystemDistance = function (p1, p2) {
        var thisXdis = p2.x - p1.x;
        if (thisXdis === Number.POSITIVE_INFINITY || thisXdis === Number.NEGATIVE_INFINITY) {
            p2.pervXdis = 0;
        } else {
            p2.pervXdis = thisXdis;
        }

        var thisYdis = p2.y - p1.y;
        if (thisYdis === Number.POSITIVE_INFINITY || thisYdis === Number.NEGATIVE_INFINITY) {
            p2.pervYdis = 0;
        } else {
            p2.pervYdis = thisYdis;
        }
    }

    this.saveLetter = function () {
        savethisLetter(input, this.particles);
    }

    this.printWord = function (index, word, sentenceSize) {
        var wordLetterArray = [];
        var wordArray = word.split("");
        var p5 = this.p5;
        var loadCount = 0;

        //console.log("printWord", wordArray);

        for (var i = 0; i < wordArray.length; i++) {
            var letterToPrint = wordArray[i];

            function loadLetter(index, letterToPrint) {
                //console.log("print letter", letterToPrint);
                var address = location.href + "sketch/letters/";
                if (location.href.indexOf("http://localhost") !== -1) {
                    address = "../sketch/letters/";
                }

                if (fileExists((address + letterToPrint.toUpperCase() + ".json"))) {
                    onLoadingWord = true;
                    $.getJSON(address + letterToPrint.toUpperCase() + ".json",
                        function (data) {
                            wordLetterArray.push(new LetterParticle(p5, index, data));
                            loadCount++;
                            //console.log("Letter file loaded", data, index, loadCount);
                            if (loadCount === wordArray.length) {
                                setWord();
                            };
                        });
                }
            }

            loadLetter(i, letterToPrint);
        }

        function setWord() {
            wordLetterArray.sort(function (a, b) {
                return a.index - b.index;
            });

            var wordTotalWitdh = 0;
            for (var i = 0; i < wordLetterArray.length; i++) {
                wordTotalWitdh += globalVar.spacing * wordLetterArray[i].gridCount + globalVar.spacing * 2;
            }

            var thisWord = {
                index: index,
                word: word,
                letters: wordLetterArray,
                width: wordTotalWitdh
            }

            wordsCount++;
            thisSentence.push(thisWord);

            //console.log("setWord", wordLetterArray, wordsCount, sentenceSize);

            if (wordsCount === sentenceSize) {
                sentenceToSort = thisSentence;
                sentenceIsReady = true;
                onLoadingWord = false;
            }
        }
    }

    this.printSentence = function (sentence) {
        //printPoemSentence = false;
        if (thisSentence == null) {
            thisSentence = [];
            wordsCount = 0;
        }

        //if (sentence.indexOf(" ") < 0) {
        //    sentence = sentence + " ";
        //}

        var senArray = sentence.split(" ");
        if (wordInSentenceIndex < senArray.length) {
            //console.log("print sentence", sentence, senArray, wordInSentenceIndex);
            var wordToPrint = senArray[wordInSentenceIndex];
            if (wordToPrint !== "") {
                this.printWord(wordInSentenceIndex, wordToPrint, senArray.length);
            }
            wordInSentenceIndex++;
        } else {
            if (!onLoadingWord) {
                onPrintSentence = false;
                wordInSentenceIndex = 0;
                thisSentence = null;
            }
        }
        //for (var i = 0; i < senArray.length; i++) {
        //    this.printWord(i, senArray[i], senArray.length, thisSentence);
        //}

    }

    this.setSetntence = function () {
        sentenceToSort.sort(function (a, b) {
            return a.index - b.index;
        });

        console.log("setSentence", sentenceToSort);
        sentenceIsReady = false;

        if (rowsCount > 0) {
            //console.log(lastWord);
            var wordLastLetter = lastWord.letters[lastWord.letters.length - 1];
            var lastGridVec = wordLastLetter.container[wordLastLetter.container.length - 1];
            startingPointY = lastGridVec.y + globalVar.spacingY;
        }

        startingPointX = initialStartingPoint.x;
        //Arrange letters//
        for (var i = 0; i < sentenceToSort.length; i++) {
            var wordObj = sentenceToSort[i];
            //console.log("wordObj", wordObj);
            if (i > 0) {
                var prevWordObj = sentenceToSort[i - 1];
                //console.log("Sorting word", wordObj.word, wordObj.index);

                if (prevWordObj !== "") {
                    lastLetter = prevWordObj.letters[prevWordObj.letters.length - 1];
                    if (!globalVar.onHebrew) {
                        startingPointX = lastLetter.position.x + lastLetter.totalWidth + globalVar.spacing * 4;
                        //console.log("prevWordObj", prevWordObj, "startingPointX", startingPointX);
                    } else {
                        startingPointX = lastLetter.position.x - lastLetter.totalWidth - globalVar.spacing * 4;
                    }
                }
            }

            var wordLetterArray = wordObj.letters;
            for (var y = 0; y < wordLetterArray.length; y++) {
                var pos = startingPointX;
                if (y > 0) {
                    var thisLastLetter = wordLetterArray[y - 1];
                    if (!globalVar.onHebrew) {
                        pos = thisLastLetter.position.x + thisLastLetter.totalWidth + globalVar.spacing;
                    } else {
                        pos = thisLastLetter.position.x - thisLastLetter.totalWidth - globalVar.spacing;
                    }
                }
                wordLetterArray[y].setLetter(new Vec2D(pos, startingPointY));
            }

            lastWord = wordObj;
        }

        rowsCount++;
        sentencesCount++;
        this.sentences[sentencesCount] = sentenceToSort;
        printPoemSentence = true;
    }

    this.printThisPoem = function (pomArray) {
        printPoemSentence = true;
        this.clearSystem();

        poemSentenceIndex = 0;
        startingPointY = initialStartingPoint.y;
        wordsCount = 0;
        rowsCount = 0;
        wordInSentenceIndex = 0;
        onPrintSentence = true;
        thisSentence = null;

        poemArray = pomArray;
    }

    this.onPrintPoem = function () {
        if (poemArray != null) {
            if (poemSentenceIndex < poemArray.length) {
                this.printSentence(poemArray[poemSentenceIndex]);
            } else {
                if (poemSentenceIndex >= poemArray.length) {
                    poemArray = null;
                }
            }
            if (!onPrintSentence) {
                poemSentenceIndex++;
                onPrintSentence = true;
            }
        } else {
            printPoemSentence = false;
        }
    }

    this.clearSystem = function () {
        this.sentences = {};
        this.p5.physics.particles = [];
        this.p5.physics.springs = [];
        this.p5.physics.behaviors = [];
        console.log("System cleared");
    }

    this.resizeSystem = function () {
        this.setStartingPoint();
        startingPointX = initialStartingPoint.x;
        var abort = false;

        var sentences = this.sentences;
        for (var sentenceIndex in sentences) {
            if (sentences.hasOwnProperty(sentenceIndex)) {
                var sentenceObj = sentences[sentenceIndex];
                for (var word in sentenceObj) {
                    if (sentenceObj.hasOwnProperty(word) && !abort) {
                        var wordObj = sentenceObj[word];
                        var prevWordObj = null;
                        if (word > 0) {
                            prevWordObj = sentenceObj[wordObj, wordObj.index - 1];
                        }
                        var posX = startingPointX;
                        for (var i = 0; i < wordObj.letters.length; i++) {
                            var thisLastLetter;
                            if (i === 0) {
                                if (prevWordObj != null) {
                                    thisLastLetter = prevWordObj.letters[prevWordObj.letters.length - 1];
                                    posX = thisLastLetter.position
                                        .x +
                                        thisLastLetter.totalWidth +
                                        globalVar.spacing * 4;
                                }
                            } else {
                                thisLastLetter = wordObj.letters[i - 1];
                                posX = thisLastLetter.position.x + thisLastLetter.totalWidth + globalVar.spacing;
                            }
                            if (wordObj.letters[i].position.y == null) {
                                abort = true;
                                printThisPoem(poemArray);
                                break;
                            } else {
                                wordObj.letters[i].moveLetter(new Vec2D(posX, wordObj.letters[i].position.y));
                            }
                        }
                    }
                }
            }
        }
    }

    this.run = function () {

        this.update();

        if (printPoemSentence) {
            this.onPrintPoem();
        }

        if (sentenceIsReady) {
            this.setSetntence();
        }

        if (debug) {
            this.debug();
        }


    }

    this.update = function () {
        var sentences = this.sentences;
        for (var sentenceIndex in sentences) {
            if (sentences.hasOwnProperty(sentenceIndex)) {
                var sentenceObj = sentences[sentenceIndex];
                for (var word in sentenceObj) {
                    if (sentenceObj.hasOwnProperty(word)) {
                        var wordObj = sentenceObj[word];
                        for (var i = 0; i < wordObj.letters.length; i++) {
                            wordObj.letters[i].update();
                            wordObj.letters[i].display();
                        }
                    }
                }
            }
        }
    }

    this.displayLine = function (p1, p2) {
        this.p5.stroke(globalVar.particalColor);
        this.p5.strokeWeight(0.5);
        this.p5.line(p1.x, p1.y, p2.x, p2.y);
    }

    this.debug = function () {
        this.p5.stroke(255, 0, 0);
        this.p5.strokeWeight(10);
        this.p5.point(initialStartingPoint.x, initialStartingPoint.y);

        this.p5.textSize(15);
        this.p5.fill(255, 0, 0);
        this.p5.strokeWeight(0);
        this.p5.text("X: " + initialStartingPoint.x + " Y: " + initialStartingPoint.y,
            initialStartingPoint.x, initialStartingPoint.y - 10);
    }
}

function fileExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
}