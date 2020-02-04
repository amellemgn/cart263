"use strict";

/********************************************************************

Project 1
Amelle Margaron

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

Mostly combines code from various in-class exercises.

*********************************************************************/
// set message when click button
// bounce effect... how to constrain
//background color: one of those color animations
let $vulture;
let $liver;
let $button;
let animateLoop;
let colors;
let i = 0;

const UPDATE_FREQUENCY = 20;
const REVEAL_POSSIBILITY1 = 0.3;
const REVEAL_POSSIBILITY2 = 0.6;
const BIRD_SOUND = new Audio('assets/sounds/birds.mp3');
const BITE_SOUND = new Audio('assets/sounds/bite.wav');
const ANIMATION_TIME = 2000;
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
    $(this).css("width", 200 + "px");
  }, function() {
    $(this).css("width", 150 + "px");
  });
  // if you were working like this, you'd have to specify parent/child instead of,say, specifying img
  $vulture.hover(function() {
    $(this).css("color", "transparent");
  }, function() {
    $(this).css("color", "yellow");
  });

  //code from: https://howilearnedrails.wordpress.com/2015/03/08/use-jquery-to-animate-background-color/
  // and http://jsfiddle.net/bHEVr/
  colors = ["green", "blue", "yellow"];
  animateLoop = function(){
    $('.background').animate({
      backgroundColor: colors[i++ % colors.length] // find the remainder of
    }, ANIMATION_TIME, function(){ animateLoop();
    });
  };
  animateLoop();
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
