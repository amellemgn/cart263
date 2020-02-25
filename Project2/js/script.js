"use strict";

/********************************************************************

Project 2
Amelle Margaron

Description goes here.
Song: https://www.youtube.com/watch?v=ygqFqRM-syc

*********************************************************************/

// Declare all game variables
const backgroundMusic = new Audio("assets/sounds/backgroundMusic.mp3");
let $gif;
// Call setup at page load
$(document).ready(setup);

function setup() {
  backgroundMusic.loop = true;
  backgroundMusic.play();
  backgroundMusic.volume = 0.2;
  $gif = $('.gif');
  // inspired by https://codepen.io/calebgrove/pen/bIsqy
  $gif.hover(
         function()
         {
           var src = $(this).attr("src");
           $(this).attr("src", src.replace(/\.png$/i, ".gif"));
         },
         function()
         {
           var src = $(this).attr("src");
           $(this).attr("src", src.replace(/\.gif$/i, ".png"));
         });
  $gif.on('click', gifClicked);
  callAnnyang();
}

function gifClicked() {
  console.log("clicked!!");
  resizeGif();
  automatedSpeech();
}

function callAnnyang() {
  if (annyang) {
    console.log("annyang");
    var command = {
      "*I don't know": closeGif,
      "*Maybe": closeGif,
      "*Me": closeGif,
    };
    annyang.addCommands(command);
    annyang.start();
  }
}

function resizeGif(){
  console.log("gif resized");
  $(this).attr("width", "200px");
  $(this).attr("z-index", "2");
}

function automatedSpeech(){
  console.log("automated speech");
  let randomPitch, randomRate = Math.random();
  let options = {
    rate: randomRate,
    pitch: randomPitch
  };
  responsiveVoice.speak("hello world bla bla", "UK English Male", options)
}

function closeGif(){
  console.log("gif back to normal");
  $(this).attr("width", "100px");
  $(this).attr("z-index", "0");
}
