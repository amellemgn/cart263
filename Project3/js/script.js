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
  $('#colorPicker').on('click', showPalette);
}

function showPalette() {
  console.log("showpalette");
  $('.color').css('display', 'inline');
  //reference from this codepen: https://codepen.io/sosuke/pen/Pjoqqp
  $('#red').on('click', function() {
    $('img').css('filter', "invert(16%) sepia(63%) saturate(7183%) hue-rotate(3deg) brightness(101%) contrast(127%)")
  });
  $('#blue').on('click', function() {
    $('img').css('filter', "invert(7%) sepia(97%) saturate(7438%) hue-rotate(246deg) brightness(112%) contrast(133%)")
  });
  // $('#yellow').on('click', function(){$('img').css('filter', "invert(85%) sepia(83%) saturate(2294%) hue-rotate(0deg) brightness(106%) contrast(108%)")});
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
function saveImage() { // https://github.com/niklasvh/html2canvas/issues/1313
  var element = $("#postcard")[0];
  html2canvas(element).then(function(canvas) {
    var myImage = canvas.toDataURL();
    downloadURI(myImage, "P3 image");
  });
}
//downloadURI
//
//
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  // clearDynamicLink(link);
}
//checkRepeat
//
//
function checkRepeat() {
  responsiveVoice.speak(currentQuestion.phrase, "UK English Female");
  displayQuestion(currentQuestion);
}
