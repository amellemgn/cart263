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

$(document).ready(setup);

function setup() {
  $.getJSON("js/questions.json")
    .done(questionsLoaded) // successful load, calls this
    .fail(questionsNotLoaded); // calls this if load fails
  $('#download').on('click', saveImage);
}

function questionsLoaded(data) {
  questions = data; //now the questions variable contains the array that is in questions.json
  console.log("questions");
  askQuestion(questions);
}

function askQuestion(questions) {
  currentQuestion = questions.questions[currentQuestionIndex];
  responsiveVoice.speak(currentQuestion.phrase, "UK English Female");
  displayQuestion(currentQuestion);
  if (annyang) {
    // set up voice commands (no voice commands yet?)
    var command = {};
    // loop thru option1 array and add tocommand
    command[currentQuestion.option1] = displayOption1;
    command[currentQuestion.option2] = displayOption2;
    annyang.addCommands(command);
    annyang.start();
    console.log(currentQuestion.option1);
    console.log(currentQuestion.option2);
  }
}

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

function recallAskQuestion() {
  console.log(currentQuestionIndex);
  currentQuestionIndex += 1;
  askQuestion(questions);
}


function questionsNotLoaded(jqxhr, textStatus, error) {
  console.error(error);
}

function activateEvilEye() {
  $('#evilEye').css('display', "inline");
  $('#evilEye').on('click', displayEvilEyeFigure);
}

function displayEvilEyeFigure() {
  // figureImage = $(`<img src ="assets/images/figure.png">`);
  figureImage.appendTo('.postcard');
  setInterval(changeFigureSize, 3000);
}

function changeFigureSize() {
  let figureWidth = figureImage.width();
  figureWidth += width;
  figureImage.width(figureWidth);
}

function saveImage() { // working off of answers from : https://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
  let download = document.getElementById("download");
  let image = document.getElementById("postcard").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
}
