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

$(document).ready(setup);

function setup() {
  $.getJSON("js/questions.json")
    .done(questionsLoaded) // successful load, calls this
    .fail(questionsNotLoaded); // calls this if load fails
}

function questionsLoaded(data) {
  questions = data; //now the questions variable contains the array that is in questions.json
  console.log("questions");
  askQuestion(questions);
}

function askQuestion(questions) {
  let currentQuestion = questions.questions[currentQuestionIndex];

  responsiveVoice.speak(currentQuestion.phrase, "UK English Female");
  if (annyang) {
    // set up voice commands (no voice commands yet?)
    var command = {};
    command[currentQuestion.option1] = displayOption1(currentQuestion);
    command[currentQuestion.option2] = displayOption2(currentQuestion);
    annyang.addCommands(command);
    annyang.start();
  }
}

function displayOption1(currentQuestion) {
  let $appendedImage = $(`<img src =" ${currentQuestion.option1Image}">`);
  $appendedImage.css('display', 'none');
  // set $appendedImage's CSS by pulling from the JSON data
  $appendedImage.appendTo('.postcard');
  $appendedImage.fadeIn("slow");
  $appendedImage.animate({
    'display': 'inline'
  }, 2000);

}

function displayOption2(currentQuestion) {
  let $appendedImage = $(`<img src =" ${currentQuestion.option2Image}">`);
  $appendedImage.css('display', 'none');
  // set $appendedImage's CSS by pulling from the JSON data
  $appendedImage.appendTo('.postcard');
  $appendedImage.fadeIn("slow");
  $appendedImage.animate({
    'display': 'inline'
  }, 2000);
}

function questionsNotLoaded(jqxhr, textStatus, error) {
  console.error(error);
}
