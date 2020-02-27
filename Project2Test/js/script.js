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
  setInterval(updateCarousel, 800);
  $gif.on('click', gifClicked);
  callAnnyang();
}

function updateCarousel() {
  $carousel.on('mousemove', gaugeMousePosition);
  $carousel.css("transform", 'translateZ(-288px) rotateY(' + angle + 'deg)');
}

function gaugeMousePosition(e){
  if(e.pageX < 100){
    angle += 0.2;
  }
  else{
      angle -= 0.2;
  }
}

function callAnnyang() {
  if (annyang) {
    console.log("annyang");
    var command = {
      "*Me": closeGif,
      "*I am the problem": closeGif,
      "*Yes": closeGif,
      "*No": closeGif,
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
$chosenGif.attr("src", e.src); // can i do this
// can also do like $chosenGif.show();
$chosenGif.css("display", "in-line");
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
  if ( 0.2< r < 0.4){
    randomizedSpeech = "do the children at least have the excuse of being gullible";
  }
  if ( 0.4< r < 0.6){
    randomizedSpeech = "in the war for attention is this not a just cause";
  }
  if ( 0.6< r < 0.8){
    randomizedSpeech = "are you aware that indeed kids yt ediitng jobs pay better than average";
  }
  if (r >0.8){
    randomizedSpeech = "are you aware or are you sick";
  }
}

function closeGif(){
  console.log("close gif");
  // $chosenGif.hide();
  // in this one .. i dont need to be using e or this right?
}
