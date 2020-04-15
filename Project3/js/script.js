"use strict";
/********************************************************************
CART263 Project 3: re:Memory
Amelle Margaron

Recompose an oniric scene with re:Memory! Our 'chatbot' will ask you questions and
recreate the scene before your very eyes.
-> load hand-written JSON data
-> ask questions that presents user with two choices
-> according to user choice, add, one visual element to the 'postcard'
*********************************************************************/
// declare project variables (avoiding global variables is good practice)
let questions;
let currentQuestionIndex = 0;
let currentQuestion;
let figureImage = $(`<img src ="assets/images/figure.png">`);
let width = 50;
//Loading setup when page loads
$(document).ready(setup);
//setup
//
//
function setup() {
  $.getJSON("js/questions.json")
    .done(questionsLoaded) // successful load, calls this
    .fail(questionsNotLoaded); // calls this if load fails

  $('#download').on('click', saveImage);

  // html2canvas(document.body).then(function(canvas) {
  //   document.body.appendChild(canvas);
  // });

}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    // clearDynamicLink(link);
}
//questionsNotLoaded
//
//
function questionsLoaded(data) {
  questions = data; //now the questions variable contains the array that is in questions.json
  console.log("questions");
  askQuestion(questions);
}
//askQuestions
//
//
function askQuestion(questions) {
  currentQuestion = questions.questions[currentQuestionIndex];
  responsiveVoice.speak(currentQuestion.phrase, "UK English Female");
  displayQuestion(currentQuestion);
  if (annyang) {
    // set up voice commands (no voice commands yet?)
    var command = {
      "repeat": checkRepeat,
      "can you repeat the question": checkRepeat,
      "repeat the question": checkRepeat,
      "say it again": checkRepeat,
      "can you say it again": checkRepeat,
    };
    for (let i = 0; i < currentQuestion.option1.length; i++) {
      command[currentQuestion.option1[i]] = displayOption1;
    }
    for (let i = 0; i < currentQuestion.option2.length; i++) {
      command[currentQuestion.option2[i]] = displayOption2;
    }
    annyang.addCommands(command);
    annyang.start();
    console.log(currentQuestion.option1);
    console.log(currentQuestion.option2);
  }
}
//displayQuestions
//
//
function displayQuestion(currentQuestion) { // drawn from w3 schools
  document.getElementById("dialogueBox").innerHTML = ""; //clearing the dialogue box
  let i = 0;
  let text = currentQuestion.phrase; // its already a string right?
  console.log(text);
  let speed = 50;
  typewriter();

  function typewriter() {
    if (i < text.length) {
      document.getElementById("dialogueBox").innerHTML += text.charAt(i);
      i++
      setTimeout(typewriter, speed);
    }
  }

}
//displayOption1
//
//
function displayOption1() {
  console.log("display1");
  let $appendedImage = $(`<img src =" ${currentQuestion.option1Image}">`);
  // // set $appendedImage's CSS by pulling from the JSON data
  $appendedImage.appendTo('.postcard');
  $appendedImage.css('position', 'absolute');
  $appendedImage
    .css('opacity', 0)
    .slideDown('300000')
    .animate({
      opacity: 1
    }, {
      queue: false,
      duration: 'slow'
    });
  if (currentQuestion.evilEyeCheck !== undefined) {
    activateEvilEye();
  }
  setTimeout(recallAskQuestion, 2000);
}
//displayOption2
//
//
function displayOption2() {
  console.log("display2");
  let $appendedImage = $(`<img src =" ${currentQuestion.option2Image}">`);
  // // set $appendedImage's CSS by pulling from the JSON data
  $appendedImage.appendTo('.postcard');
  $appendedImage.css('position', 'absolute');
  $appendedImage
    .css('opacity', 0)
    .slideDown('slow')
    .animate({
      opacity: 1
    }, {
      queue: false,
      duration: 'slow'
    });
  setTimeout(recallAskQuestion, 2000);
}
//recallAskQuestion
//
//
function recallAskQuestion() {
  console.log(currentQuestionIndex);
  currentQuestionIndex += 1;
  askQuestion(questions);
}
//questionsNotLoaded
function questionsNotLoaded(jqxhr, textStatus, error) {
  console.error(error);
}
//activateEvilEye
//
//
function activateEvilEye() {
  $('#evilEye').css('display', "inline");
  $('#evilEye').on('click', displayEvilEyeFigure);
}
//displayEvilEyeFigure
//
//
function displayEvilEyeFigure() {
  // figureImage = $(`<img src ="assets/images/figure.png">`);
  figureImage.appendTo('.postcard');
  setInterval(changeFigureSize, 3000);
}
//changeFigureSize
//
//
function changeFigureSize() {
  let figureWidth = figureImage.width();
  figureWidth += width;
  figureImage.width(figureWidth);
}
//saveImage
//
//
function saveImage() {
//   console.log("save image");
//   html2canvas($('#postcard'[0]), {
//   onrendered: function(canvas) {
//     var img = canvas.toDataURL()
//     window.open(img);
//   }
// });
var element = $("#postcard")[0];
  html2canvas(element).then(function (canvas) {
      var myImage = canvas.toDataURL();
      downloadURI(myImage, "P3 image");
  });
}
//checkRepeat
//
//
function checkRepeat() {
  responsiveVoice.speak(currentQuestion.phrase, "UK English Female");
  displayQuestion(currentQuestion);
}
