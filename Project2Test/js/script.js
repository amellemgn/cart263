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
let $carousel;
let $gif;
let angle = 0;
let $chosenGif;
let randomizedSpeech;
let lastRandomizedSpeech;
let mouseX =0;
let mouseY = 0;

$(document).ready(setup);

function setup() {
  backgroundMusic.loop = true;
  backgroundMusic.play();
  backgroundMusic.volume = 0.2;
  $chosenGif = $('.chosenGif');
  $carousel = $('.carousel');
  $gif = $('.gif');
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
  setInterval(updateCarousel, 100);
  setInterval(gaugeMousePosition, 100);
  $(document).on('mousemove', updateMouse);

  $gif.on('click', gifClicked);
  callAnnyang();
}
function updateMouse(e){
mouseX = e.pageX;
mouseY = e.pageY;
}

function updateCarousel() {
  $carousel.css("transform", 'translateZ(-288px) rotateY(' + angle + 'deg)');
}

function gaugeMousePosition(e){
  console.log(mouseX);
  if(mouseX < 100){
    angle += 2;
  }
  else{
      angle -= 2;
  }
}

function callAnnyang() {
  if (annyang) {
    console.log("annyang");
    var command = {
      "Me": closeGif,
      "I am the *problem": closeGif,
      "yes": closeGif,
      "no": closeGif,
    };
    annyang.addCommands(command);
    annyang.start();
  }
}

function gifClicked() {
  console.log("clicked!!");
  // resizeGif(this);
  largeGifAppears(this);
  automatedSpeech();
}

function largeGifAppears(e){
console.log("large gif appears");
console.log(e.src);
let src = $(this).attr('src');
$chosenGif.attr("src", src); // can i do this
$chosenGif.show(); // efffects
// $chosenGif.css("display", "in-line");
}

function automatedSpeech(){
  console.log("automated speech");
  selectSpeech();
  let randomPitch, randomRate = Math.random();
  let options = {
    rate: randomRate,
    pitch: randomPitch
  };
  responsiveVoice.speak(randomizedSpeech, "UK English Male", options)
}

function selectSpeech(){
  let r = Math.random();
  console.log(r);
  if (r < 0.2){
    randomizedSpeech = "do you not think this could be qualified as a matter of perception";
  }
  else if ( r < 0.4){
    randomizedSpeech = "do the children at least have the excuse of being gullible";
  }
  else if (  r < 0.6){
    randomizedSpeech = "in the war for attention is this not a just cause";
  }
  else if ( r < 0.8){
    randomizedSpeech = "is your fear of the mouse cynical";
  }
  else {
    randomizedSpeech = "are you aware or are you sick";
  }
}

function closeGif(){
  console.log("close gif");
   $chosenGif.hide();
  // in this one .. i dont need to be using e or this right?
}
