"use strict";

/********************************************************************

Project 1: Pecking Order
Amelle Margaron


Play as a vulture parent who must pull out some dude's liver everyday to feed their kids.
If you start to have doubts, maybe take a step back and have a bit of a look at yourself - you're just a little funky bird after all.

This project uses jQuery library as well as some regular Javascrip and HTML DOM. It focuses on creating interactive jQuery animations, draggable and droppable elements, and a cool aesthetic through html and css.


Squelch sound: https://freesound.org/people/Adam_N/sounds/148975/
Chiptune: https://freesound.org/people/bombstu/sounds/159053/
Bird sound: https://freesound.org/people/Mr.JJ/sounds/474359/
Chick image: https://imgbin.com/png/ZAbvE8X0/yellow-chick-png
Liver image: https://holisticferretforum.com/natural-diet/raw-diet-the-meat-of-the-site/organ-meats/
Prometheus image: https://sites.google.com/site/anthonysmythology/prometheus/introduction
*********************************************************************/

//Declare game variables
let $vulture;
let $liver;
let $button;
let animateLoop;
let colors;
let i = 0;
let selectedVulture;
let selectedQuery;
//Declare game constants
const UPDATE_FREQUENCY = 20;
const REVEAL_POSSIBILITY1 = 0.3;
const REVEAL_POSSIBILITY2 = 0.6;
const BIRD_SOUND = new Audio('assets/sounds/birds.mp3');
const BITE_SOUND = new Audio('assets/sounds/squelch.wav');
const CHIPTUNE_SOUND = new Audio('assets/sounds/background.wav');
const ANIMATION_TIME = 2000;

// Load setup function when page loads
$(document).ready(setup);

// setup
//
// Loads with page.
function setup() {
  //Only called once: if player clicks, play the background/looping music through startMusic function
  $(document).one('mousedown', startMusic);
  // If player clicks on part of the introduction screen, it disappears and reveals the game
  $('.intro').on('click', function() {
    $('.intro').hide();
    $('.container').show();
  });
  //Set the dialog widgets not to open upon initialization
  $('#yes, #no, #uh').dialog({
    autoOpen: false
  });
  //Create new liver
  createAnew();
  // Define default hungry vulture
  selectedVulture = $('#v1');
  // Find + assign all particular objects into simplified single variable
  $liver = $('.liver');
  $vulture = $('.vulture');
  $button = $('.button');
  // Make vultures droppable to receive liver objects. When the object is dropped, play sound and regenerate liver.
  $vulture.droppable({
    drop: function(event, ui) {
      ui.draggable.remove();
      createAnew();
      BITE_SOUND.volume = 1.0;
      BITE_SOUND.play();
    }
  });
  // Make liver draggable, but only within the confines of the central game element.
  $liver.draggable({
    containment: $(".box"),
    scroll: false
  });
  //Create a loop to call the bounce animation of our particular hungry vulture with bounce animation through setInterval
  setInterval(callBackBounce, 1000);
  //Hovering over the button changes its color
  $button.hover(function() { // Format:  .hover(mousein event,mouseoutvevent)
    $button.css("background-color", "yellow");
  }, function() {
    $button.css("background-color", "red");
  })
  //Clicking on the button calls a function that loads dialog widgets
  $button.on('mousedown', clickButton);
  //Hovering over the baby vultures increases their size
  $('.big').hover(function() {
    $(this).css("width", 170 + "px");
  }, function() {
    $(this).css("width", 150 + "px");
  });
  // Hovering over Prometheus triggers a shake animations
  $('.prometheus').hover(function() {
    $('.prometheus').effect("shake");
  });
  // Background animation
  // Using remainder formula, cycle through array of background colors. Use animate effect to ensure smooth transition.
  // Code from - http://jsfiddle.net/bHEVr/
  colors = ["green", "blue", "yellow"];
  animateLoop = function() {
    $('.background').animate({
      backgroundColor: colors[i++ % colors.length] // find the remainder of
    }, ANIMATION_TIME, function() {
      animateLoop();
    });
  };
  animateLoop();
}
//startMusic
//
/// calls and loops soundtrack + sets volume
function startMusic() {
  BIRD_SOUND.volume = 0.1;
  BIRD_SOUND.loop = true;
  BIRD_SOUND.play();
  CHIPTUNE_SOUND.volume = 0.1;
  CHIPTUNE_SOUND.loop = true;
  CHIPTUNE_SOUND.play();
}
// createAnew
//
// creates a new liver image that is draggable once again. also resets the hungry bouncing vulture.
function createAnew() {
  // create and append draggable liver object
  let newImg = $('<img>');
  $(newImg).attr("class", "liver");
  $(newImg).attr("src", "assets/images/liver.png");
  $(newImg).draggable();
  $(".prometheus").append(newImg);
  //randomly select hungry vulture
  let r = Math.random();
  if (r < REVEAL_POSSIBILITY1) { // what gets passed through here
    selectedVulture = $('#v1');
  } else if (r < REVEAL_POSSIBILITY2) {
    selectedVulture = $('#v2');
  } else {
    selectedVulture = $('#v3');
  }
}
//callBackBounce
//
//call bounce effect on hungry vulture
function callBackBounce() {
  selectedVulture.effect("bounce", {
    direction: 'up',
    distance: 20,
    times: 3
  }, 500);
}
//clickButton
//
// randomly select + open widget dialog message when button is clicked
function clickButton() {
  let q = Math.random();
  console.log(q);
  if (q < REVEAL_POSSIBILITY1) { // what gets passed through here
    selectedQuery = $('#uh');
  } else if (q < REVEAL_POSSIBILITY2) {
    selectedQuery = $('#yes');
  } else {
    selectedQuery = $('#no');
  }
  console.log("button clicked");
  selectedQuery.dialog('open');
}
