"use strict";

/********************************************************************

Project 2
Amelle Margaron

Description goes here.
Song: https://www.youtube.com/watch?v=ygqFqRM-syc

https://3dtransforms.desandro.com/carousel
*********************************************************************/

// Declare all game variables
const backgroundMusic = new Audio("assets/sounds/backgroundMusic.mp3");
let $gif;
let rotation = 0;
let rotationSpeed = 100;
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
  $gif.on('click', gifClicked); //event listener tied to 'this', which then transmits to gifclickd but not any following functions
  callAnnyang();
  // setInterval(updateRotation, rotationSpeed);
}

// function updateRotation(){
//   // $('.row').css("transform", "rotateY(" + rotation + "deg)");
//   // rotation+=1;
//   $('.rowobject').css("transform", "rotateY(" + rotation + "deg)");
//   rotation+=1;
// }

function gifClicked() {
  console.log("clicked!!");
  console.log(this);
  resizeGif(this);
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

function resizeGif(e){
  console.log("gif resized");
  console.log(e);
  $(e).css("width", "800px");
  $(e).css("transform","rotateY(0deg)");

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

}
