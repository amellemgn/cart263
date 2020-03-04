"use strict";

/********************************************************************

Project 2
Amelle Margaron

WELCOME TO THE INCUBATOR
Explore the strange niche of children's Youtube. Scroll through a selection of creepy videos extracts and
answer to the algorithm. Read comments to get different perspectives.

Description goes here.
Song: https://www.youtube.com/watch?v=ygqFqRM-syc

*********************************************************************/
// Declare all game variables
const backgroundMusic = new Audio("assets/sounds/backgroundMusic.mp3");
let $carousel;
let $gif;
let angle = 0;
let $chosenGif;
let randomizedSpeech;
let lastRandomizedSpeech;
let mouseX = 0;
let mouseY = 0;
let colors;
let animateLoop;
let i = 0;
let $commentTrigger;
let selectedComment;
let commentArray;
let closeGifCounter = 0;
let menuArray;
let menuArrayIndex = 0;
let $comment;
const ANIMATION_TIME = 500;

// Call setup at page load
$(document).ready(setup);

// setup
//
// On click, play music. Activate annyang. Assign jquery variables and event handlers
function setup() {
  $(document).one('mousedown', startMusic);
  callAnnyang();
  //Set the dialog widgets not to open upon initialization
  $comment = $('.comment');
  $comment.dialog({
    autoOpen: false
  });
  $chosenGif = $('.chosenGif');
  $carousel = $('.carousel');
  // Make sure hovering over comment trigger 'button' is visible
  $commentTrigger = $('.commentTrigger');
  $commentTrigger.hover(
    function() {
      $(this).css("background-color", "yellow");
    },
    function() {
      $(this).css({
        "background-color": ''
      });
    });
  // Hovering over carousel gifs plays them by switching out a png for a gif
  $gif = $('.gif');
  $gif.hover(
    function() {
      var src = $(this).attr("src");
      $(this).attr("src", src.replace(/\.png$/i, ".gif"));
    },
    function() {
      var src = $(this).attr("src");
      $(this).attr("src", src.replace(/\.gif$/i, ".png"));
    });
  // Update carousel position every 100ms
  setInterval(updateCarousel, 100);
  // Check mouse position every 100ms
  setInterval(gaugeMousePosition, 100);
  // Assign mouseX and Y to variables
  $(document).on('mousemove', updateMouse);
  // If a carousel gif is clicked, call corresponding events: automated voice question and displaying a large
  // overlay of the same gif
  $gif.on('click', gifClicked);
  // If the comment trigger 'button' is clicked, display comments
  $commentTrigger.on('click', commentTriggerClicked);
  animateBackground();
}
//callAnnyang
//
//ativate annyang and assign keyword commands that will be recognized if spoken by user
function callAnnyang() {
  if (annyang) {
    console.log("annyang");
    var command = {
      "ok": cycleMenuArray,
      "repeat": repeatSpeech,
      "me": closeGif,
      "yes": closeGif,
      "no": closeGif,
    };
    annyang.addCommands(command);
    annyang.start();
  }
}
// startMusic
//
// plays music on first player click
function startMusic() {
  backgroundMusic.loop = true;
  backgroundMusic.play();
  backgroundMusic.volume = 0.2;
}
//animate background
//
// Background animation: Using remainder formula, cycle through array of background colors.
//  Use animate effect to ensure smooth transition.
// Code inspired by last project.
function animateBackground() {
  colors = ["#FDDFDF", "#FCF7DE", "#DEFDE0", "#DEF3FD", "#F0DEFD"];
  animateLoop = function() {
    $('.background').animate({
      backgroundColor: colors[i++ % colors.length] // find the remainder of
    }, ANIMATION_TIME, function() {
      animateLoop();
    });
  };
  animateLoop();
}
//cycleMenuArray
//
// called by a certain annyang response: when the user says OK.
// this moves through an array of instructions, displaying them one at a time with user confirmation.
function cycleMenuArray() {
  menuArray = ["1- Cycle through these videos with your mouse! Ok?", "2- Click on the video if it seems interesting. Answer the question. Ok?", "3-If you don't understand, say 'repeat'! Ok? "];
  let newDiv = $('<div>' + menuArray[menuArrayIndex] + '</div>');
  newDiv.appendTo('.intro');
  menuArrayIndex += 1;
  if (menuArrayIndex >= menuArray.length) {
    // Set timeout to allow user to see the final instruction, then call the function that reveals the 'game' part
    // of the project
    setTimeout(loadGame, 1500);
  }
}
//loadGame
//
// hides the introduction title and reveals the game part of the project
function loadGame() {
  $('.intro').hide();
  $('.container').fadeIn(500);
}
//updateMouse
//
//Assigns mouseX and mouse Y to more easily kept values
function updateMouse(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}
//gaugeMousePosition
//
//check whether mouse is to the left or right of carousel
function gaugeMousePosition(e) {
  if (mouseX < 450) {
    angle += 2;
  } else {
    angle -= 2;
  }
}
//updateCarousel
//
// move the carousel left or right accordingly to where the mouse is

function updateCarousel() {
  $carousel.css("transform", 'translateZ(-288px) rotateY(' + angle + 'deg)');
}
// gifClicked
//
// if a carousel gif is clicked, a large overlay of that gif appears and an automated question plays
function gifClicked() {
  largeGifAppears(this);
  automatedSpeech();
}
//largeGifAppears
//
//make sure that the gif that has been clicked is the one that is displayed
// by assigning it to a div that has been hidden up till now. It's revealed here and hosts a large gif
function largeGifAppears(e) {
  let src = $(e).attr('src');
  $chosenGif.attr("src", src); // can i do this
  $chosenGif.show();
}
//automatedSpeech
//
//randomize pitch and rate and use responsiveSpeech to play a randomly selected string from selectSpeech()
function automatedSpeech() {
  console.log("automated speech");
  selectSpeech();
  let randomPitch, randomRate = Math.random();
  let options = {
    rate: randomRate,
    pitch: randomPitch
  };
  responsiveVoice.speak(randomizedSpeech, "UK English Male", options)
}
//repeatSpeech
//
//play the same string again with a different pitch and rate
function repeatSpeech() {
  let randomPitch, randomRate = Math.random();
  let options = {
    rate: randomRate,
    pitch: randomPitch
  };
  responsiveVoice.speak(randomizedSpeech, "UK English Male", options)
}
//selectSpeech
//
// randomly select one of these cryptic strings to be articulated by responsiveVoice
function selectSpeech() {
  let r = Math.random();
  console.log(r);
  if (r < 0.1) {
    randomizedSpeech = "Do you think that the way you fear is rational?";
  } else if (r < 0.2) {
    randomizedSpeech = "Do the children not have any excuse for being gullible?";
  } else if (r < 0.3) {
    randomizedSpeech = "In the war for attention are we all not just doing our best?";
  } else if (r < 0.4) {
    randomizedSpeech = "Are you perhaps unable to sift through your own nostalgia?";
  } else if (r < 0.5) {
    randomizedSpeech = "Can you remember the last time you felt awake?";
  } else if (r < 0.6) {
    randomizedSpeech = "Is it already too late?";
  } else if (r < 0.7) {
    randomizedSpeech = "Would you gently place your hand on your child's shoulder and tell them to stop pretending?";
  } else if (r < 0.8) {
    randomizedSpeech = "Are you afraid of The Mouse?";
  } else if (r < 0.9) {
    randomizedSpeech = "Are you afraid of The Mouse?";
  } else {
    randomizedSpeech = "Is it already too late?";
  }
}
//closeGif
//
// hide the div that contains the large gif
function closeGif() {
  $chosenGif.hide();
}
//commentTriggerClicked
//
// call a new comment every 700ms
function commentTriggerClicked() {
  setInterval(callComment, 700);
}
//callComment
//
// fill the array with the id tags of presently- hidden dialog boxes. Select them randomly and display them at random locations
function callComment() {
  commentArray = [$('#comment1'), $('#comment2'), $('#comment3'), $('#comment4'), $('#comment5'), $('#comment6'), $('#comment7'), $('#comment8'), $('#comment9'), $('#comment10'), $('#comment11'), $('#comment12')];
  selectedComment = commentArray[Math.floor(Math.random() * commentArray.length)];
  selectedComment.dialog('open');
  $comment.parent().offset({
    top: Math.random() * ($(window).height() - $comment.parent().height()),
    left: Math.random() * ($(window).width() - $comment.parent().width())
  });
}
