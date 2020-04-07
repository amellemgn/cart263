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
  displayQuestion(currentQuestion);
  if (annyang) {
    // set up voice commands (no voice commands yet?)
    var command = {};
    command[currentQuestion.option1] = displayOption1(currentQuestion);
    command[currentQuestion.option2] = displayOption2(currentQuestion);
    annyang.addCommands(command);
    annyang.start();
  }
  currentQuestionIndex +=1; // here? should there be a return, no right? bc they just end and come back to main function?
}
function displayQuestion(currentQuestion){ // drawn from w3 schools
  document.getElementById("dialogueBox").innerHTML = ""; //clearing the dialogue box
  let i = 0;
  let text = currentQuestion.phrase; // its already a string right?
  console.log(text);
  let speed = 50;
  function typewriter(){
  if (i <text.length){
    document.getElementById("dialogueBox").innerHTML += text.charAt(i);
    console.log(text.charAt(i));
    i++
    setTimeout(typewriter, speed);
  }
}

}
function displayOption1(currentQuestion) {
  let $appendedImage = $(`<img src =" ${currentQuestion.option1Image}">`);
  // // set $appendedImage's CSS by pulling from the JSON data
  $appendedImage.appendTo('.postcard');
  $appendedImage
  .css('opacity', 0)
  .slideDown('300000')
  .animate(
    { opacity: 1 },
    { queue: false, duration: 'slow' }
  );
}

function displayOption2(currentQuestion) {
  let $appendedImage = $(`<img src =" ${currentQuestion.option2Image}">`);
  // // set $appendedImage's CSS by pulling from the JSON data
  $appendedImage.appendTo('.postcard');
  $appendedImage
  .css('opacity', 0)
  .slideDown('slow')
  .animate(
    { opacity: 1 },
    { queue: false, duration: 'slow' }
  );
}

function questionsNotLoaded(jqxhr, textStatus, error) {
  console.error(error);
}
