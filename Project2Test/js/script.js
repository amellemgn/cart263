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
let mouseX = 0;
let mouseY = 0;
let colors;
let animateLoop;
let i = 0;
const ANIMATION_TIME = 500;
let $commentTrigger;
let selectedComment;
let commentArray;
let closeGifCounter = 0;
let menuArray;
let menuArrayIndex = 0;
let $comment;

$(document).ready(setup);

function setup() {
  $(document).one('mousedown', startMusic);
  callAnnyang();

  $comment = $('.comment');
  //Set the dialog widgets not to open upon initialization
  $comment.dialog(
    {
    autoOpen: false
  });
  // Math.random()*($(document).width())


  $chosenGif = $('.chosenGif');
  $carousel = $('.carousel');
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
  setInterval(updateCarousel, 100);
  setInterval(gaugeMousePosition, 100);
  $(document).on('mousemove', updateMouse);

  $gif.on('click', gifClicked);
  $commentTrigger.on('click', commentTriggerClicked);

  // Background animation
  // Using remainder formula, cycle through array of background colors. Use animate effect to ensure smooth transition.
  // Code from - http://jsfiddle.net/bHEVr/
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

function cycleMenuArray() {
  menuArray = ["1- Cycle through these videos with your mouse! Ok? (Please answer)", "2- Click on the video if it seems interesting :o Ok? (Please answer)?", "3-If you don't understand, say 'repeat'! Ok? "];

  let newDiv = $('<div>' + menuArray[menuArrayIndex] + '</div>');
  newDiv.appendTo('.intro');
  menuArrayIndex += 1;
  if (menuArrayIndex >= menuArray.length) {
    setTimeout(loadGame, 1000);


  }

}

function loadGame() {
  $('.intro').hide();
  $('.container').fadeIn(500);
}

function startMusic() {
  backgroundMusic.loop = true;
  backgroundMusic.play();
  backgroundMusic.volume = 0.2;
}

function updateMouse(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}

function updateCarousel() {
  $carousel.css("transform", 'translateZ(-288px) rotateY(' + angle + 'deg)');
}

function gaugeMousePosition(e) {
  if (mouseX < 450) {
    angle += 2;
  } else {
    angle -= 2;
  }
}

function callAnnyang() {
  if (annyang) {
    console.log("annyang");
    var command = {
      "ok": cycleMenuArray,
      "repeat": repeatSpeech,
      "me": closeGif,
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

function largeGifAppears(e) {
  console.log("large gif appears");
  console.log(e.src);
  let src = $(e).attr('src');
  $chosenGif.attr("src", src); // can i do this
  $chosenGif.show();
  // efffects
  // $chosenGif.css("display", "in-line");
}

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

function repeatSpeech() {
  let randomPitch, randomRate = Math.random();
  let options = {
    rate: randomRate,
    pitch: randomPitch
  };
  responsiveVoice.speak(randomizedSpeech, "UK English Male", options)
}

function selectSpeech() {
  let r = Math.random();
  console.log(r);
  if (r < 0.2) {
    randomizedSpeech = "Do you think that the way you fear is rational?";
  } else if (r < 0.4) {
    randomizedSpeech = "Do the children not have any excuse for being gullible?";
  } else if (r < 0.6) {
    randomizedSpeech = "In the war for attention are we all not just doing our best?";
  } else if (r < 0.8) {
    randomizedSpeech = "Are you afraid of The Mouse?";
  } else {
    randomizedSpeech = "";
    // say booger three times
  }
}

function closeGif() {
  console.log("close gif");
  $chosenGif.hide();
  console.log(closeGifCounter);
  closeGifCounter += 1;
  // make some cute draggable things appear
}

function commentTriggerClicked() {
  setInterval(callComment, 500);
}

function callComment() {
  commentArray = [$('#comment1'), $('#comment2'), $('#comment3'), $('#comment4'), $('#comment5'), $('#comment6'), $('#comment7'), $('#comment8'), $('#comment9'), $('#comment10'), $('#comment11'), $('#comment12')];
  selectedComment = commentArray[Math.floor(Math.random() * commentArray.length)];
  selectedComment.dialog('open');

  $comment.parent().offset({
    top: Math.random() * ($(window).height() - $comment.parent().height()),
    left: Math.random() * ($(window).width() - $comment.parent().width())
  });
}
