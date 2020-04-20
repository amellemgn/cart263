"use strict";
/********************************************************************
CART263 Project 3: re:Memory
Amelle Margaron

Recompose an oniric scene with re:Memory! Our 'chatbot' will ask you questions and
recreate the scene before your very eyes.
-> load hand-written JSON data
-> ask questions that presents user with two choices
-> according to user choice, add, one visual element to the 'postcard'
-> additional elements:
-- triggering an 'evil eye' event through a question answer
-- tint images with filter
-- save image to desktop
*********************************************************************/

// Declare project variables (avoiding global variables is good practice)
let questions;
let currentQuestionIndex = 0;
let currentQuestion;
let chimeSound = new Audio("assets/sounds/chime.wav");
let figureImage = $(`<img src ="assets/images/figure.png">`);
let width = 10;

//Call setup when page loads
$(document).ready(setup);

//setup
//
//Loads JSON data, manages intro/instruction display, handles interactive page elements
function setup() {
//Call JSON questions array. Call different functions depending on whether data loads successfully.
  $.getJSON("js/questions.json")
    .done(questionsLoaded) // successful load, calls this
    .fail(questionsNotLoaded); // calls this if load fails
//Create fade-in effect for intro title text
    $('.intro p').fadeIn(900).fadeOut(200).fadeIn(300);
    $('.intro p1').fadeIn(900).fadeOut(200).fadeIn(300);
//When user clicks 'i'm ready', hide intro title and load game. Make sure flexbox display setting is added.
  $('#enterGameButton').on('click', function() {
    $('.intro').hide();
    $('.centralContainer').show();
    $('.centralContainer').css("display", "flex");
    $('#dialogueBox').show();
    $('#dialogueBox').css("display", "flex");
  });
// Manage interactive elements on page: clicking each div/icon, really, calls corresponding function
  $('#download').on('click', saveImage);
  $('#colorPicker').on('click', showPalette);
  $('#dialogueBox').on('click', activateEvilEye);
//Display explanatory text when user hovers on interactive elements using 'visibility' CSS property
  $('.hover').mouseover(function() {
    $('.text').css("visibility", "visible");
  });
  $('.hover').mouseout(function() {
    $('.text').css("visibility", "hidden");
  });
}
//showPalette
//
//Clicking this interactive elements activates a palette of colors. Selecting each color tints the postcard's image elements a certain color.
function showPalette() {
  $('.color').css('display', 'inline');
  //Filter color technique referenced from  codepen filter generator: https://codepen.io/sosuke/pen/Pjoqqp
  $('#red').on('click', function() {
    $('.postcard img').css('filter', "invert(16%) sepia(63%) saturate(7183%) hue-rotate(3deg) brightness(101%) contrast(127%)")
  });
  $('#blue').on('click', function() {
    $('img').css('filter', "invert(7%) sepia(97%) saturate(7438%) hue-rotate(246deg) brightness(112%) contrast(133%)")
  });
   $('#yellow').on('click', function(){$('img').css('filter', "invert(85%) sepia(83%) saturate(2294%) hue-rotate(0deg) brightness(106%) contrast(108%)")});
}
//questionsNotLoaded
//
//JSON data has loaded correctly. Transfer JSON questions array to askQuestion, which is the central mechanism of the game
function questionsLoaded(data) {
  questions = data;
  askQuestion(questions);
}
//askQuestions
//
//Receives JSON questions array data. States question and manages user response.
function askQuestion(questions) {
//Select the question that user is on from array.
  currentQuestion = questions.questions[currentQuestionIndex];
// Feed it to responsiveVoice, which states it to user
  responsiveVoice.speak(currentQuestion.phrase, "UK English Female");
//Call function that displays function onscreen.
  displayQuestion(currentQuestion);
//Declare regular annyang commands in case user needs to repeat question
  if (annyang) {
    var command = {
      "repeat": checkRepeat,
      "can you repeat the question": checkRepeat,
      "repeat the question": checkRepeat,
      "say it again": checkRepeat,
      "can you say it again": checkRepeat,
    };
//Identify the specifics answers associated to each array question as annyang commands and call function that will display specific image accordingly.
// Use a for loop to check for several versions of same answer.
    for (let i = 0; i < currentQuestion.option1.length; i++) {
      command[currentQuestion.option1[i]] = displayOption1;
    }
    for (let i = 0; i < currentQuestion.option2.length; i++) {
      command[currentQuestion.option2[i]] = displayOption2;
    }
// Add all annyang commands and load annyang
    annyang.addCommands(command);
    annyang.start();
  }
}
//displayQuestions
//
//Display received question with a typewriter effect
function displayQuestion(currentQuestion) { //inspired from w3schools tutorial
//Clear dialogue box before starting
  document.getElementById("dialogueBox").innerHTML = ""; // clearing the dialogue box
//declare relevant variables, including specific array question and call typewriter effects.
  let i = 0;
  let text = currentQuestion.phrase;
  let speed = 50;
  typewriter();
//print each individual character of current question
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
//Play sound and display relevant animation with a slide animation. Check for boolean and call evil eye function if true.
// After a pause, call next question from array.
function displayOption1() {
  chimeSound.play();
  let $appendedImage = $(`<img src =" ${currentQuestion.option1Image}">`);
  // // Append image to postcard and set it's CSS by pulling from the JSON data
  $appendedImage.appendTo('.postcard');
  $appendedImage.css('position', 'absolute');
  // $appendedImage.css('z-index', currentQuestion.option1ZIndex);
  //Create a slide effect to display img. Make sure an 'image buildup' is impossible with queue off.
  $appendedImage
    .css('opacity', 0)
    .slideDown('300000')
    .animate({
      opacity: 1
    }, {
      queue: false,
      duration: 'slow'
    });
  //Call relevant function if evil eye boolean is not undefined
  if (currentQuestion.evilEyeCheck !== undefined) {
    activateEvilEye();
  }
// After set amount of time,call next array question.
  setTimeout(recallAskQuestion, 2000);
}
//displayOption2
//
//Play sound and display relevant animation with a slide animation.
// After a pause, call next question from array.
function displayOption2() {
  chimeSound.play();
  console.log("display2");
  let $appendedImage = $(`<img src =" ${currentQuestion.option2Image}">`);
  // // Append image to postcard and set it's CSS by pulling from the JSON data
  $appendedImage.appendTo('.postcard');
  $appendedImage.css('position', 'absolute');
  // $appendedImage.css('z-index', currentQuestion.option1ZIndex);
  //Create a slide effect to display img. Make sure an 'image buildup' is impossible with queue off.
  $appendedImage
    .css('opacity', 0)
    .slideDown('slow')
    .animate({
      opacity: 1
    }, {
      queue: false,
      duration: 'slow'
    });
// After set amount of time,call next array question.
  setTimeout(recallAskQuestion, 2000);
}
//recallAskQuestion
//
//Increase array position by one and repeat process with new question.
function recallAskQuestion() {
  console.log(currentQuestionIndex);
  currentQuestionIndex += 1;
  askQuestion(questions);
}
//questionsNotLoaded
//
//In case JSON data doesn't load, show why in console.
function questionsNotLoaded(jqxhr, textStatus, error) {
  console.error(error);
}
//activateEvilEye
//
//Show evil eye icon in toolbar and display an image in postcard when clicked.
function activateEvilEye() {
  $('#evilEye').css('display', "inline");
  $('#evilEye').on('click', displayEvilEyeFigure);
}
//displayEvilEyeFigure
//
//Attach image to postcard and every 3 seconds, change its position.
function displayEvilEyeFigure() {
  figureImage.appendTo('.postcard');
  setInterval(changeFigureSize, 1000);
}
//changeFigureSize
//
//Increase image  width by certain amount
function changeFigureSize() {
  let figureWidth = figureImage.width();
  figureWidth += width;
  figureImage.width(figureWidth);
}
//saveImage
//
//Converts html to canvas and then returns data URI (with todDataURL) that can then be downloaded
// ref from this html2canvas solution thread: https://github.com/niklasvh/html2canvas/issues/1313
function saveImage() {
  var element = $("#postcard")[0]; // the 0 is there bc div not recognized otherwise
  html2canvas(element).then(function(canvas) {
    var myImage = canvas.toDataURL();
    downloadURI(myImage, "P3 image"); // Pass URI data to fucntion that downloads canvas and select title of downloaded image
  });
}
//downloadURI
//
//Actual download process of image
function downloadURI(uri, name) {
  //Create and append a link with data of the image we want downloaded and automatically trigger it
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
}
//checkRepeat
//
//Repeat reponsiveVoice question if prompted by user and display question again.
function checkRepeat() {
  responsiveVoice.speak(currentQuestion.phrase, "UK English Female");
  displayQuestion(currentQuestion);
}
