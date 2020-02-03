"use strict";

/********************************************************************

Project 1
Amelle Margaron

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

Mostly combines code from various in-class exercises.

*********************************************************************/
//Ask pippin: resistance

// Sabine questions: creating pull resistance: like slowing down frame rate?
// v2 isn't working
//random isn't ~feeling like super random : rule that if you get the same vulture twice your third has to be different
// or just: variable that saves last vulture: if last vulture = new vulture randomize again

//background color: one of those color animations
let $vulture;
let $liver;
let $button;

const UPDATE_FREQUENCY = 20;
const REVEAL_POSSIBILITY1 = 0.3;
const REVEAL_POSSIBILITY2 = 0.6;
const BIRD_SOUND = new Audio('assets/sounds/birds.mp3');
const BITE_SOUND = new Audio('assets/sounds/bite.wav');
let selectedVulture;


$(document).ready(setup);

function setup() {
  $(document).one('mousedown', startMusic);
  // code runs when page loads
  // get all liver objets (just one, could've used id here) + vulture objects
  selectedVulture = $('#v1');
  $liver = $('.liver');
  $vulture = $('.vulture');
  $button = $('.button');
  // make vultures droppable
  $vulture.droppable({
    drop: function(event, ui) {
      ui.draggable.remove();
      createAnew();
    }
  });

  //make liver draggable
  $liver.draggable({containment: (".box"), scroll: false});
  setInterval(callBackBounce, 1000);
  //  .hover (what happens mousein, what happens mouseout)
  $button.hover(function() {
    $button.css("background-color", "pink");
  }, function() {
    $button.css("background-color", "yellow");
  })
  $button.one('mousedown', clickButton);
  $('.big').hover(function() {
    $(this).css("width", 250 + "px");
  }, function() {
    $(this).css("width", 200 + "px");
  });
  $vulture.hover(function() {
    $(this).css("color", "transparent");
  }, function() {
    $button.css("color", "yellow");
  });

}

function startMusic() {
  BITE_SOUND.play();
  BIRD_SOUND.play();
}

function createAnew() {
  let newDiv = $('<div>');
  $(newDiv).attr("class", "liver");
  $(newDiv).draggable();
  $(".prometheus").append(newDiv);


  let r = Math.random();
  console.log(r);
  if (r < REVEAL_POSSIBILITY1) { // what gets passed through here
    selectedVulture = $('#v1');
  } else if ( r < REVEAL_POSSIBILITY2) {
    selectedVulture = $('#v2');
  } else {
    selectedVulture = $('#v3');
  }
}

function callBackBounce() {
  selectedVulture.effect("bounce", {
    direction: 'down',
    times: 3
  }, 500);
}

function clickButton() {
  console.log("button clicked");
}
