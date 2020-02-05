"use strict";

/********************************************************************

Project 1
Amelle Margaron

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

Mostly combines code from various in-class exercises.

*********************************************************************/
// TO DO:
// free sound: screaming prometheus and chicken eating.
// comments
// 500 words
// credit the sounds

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
const BITE_SOUND = new Audio('assets/sounds/squelch.wav');
const CHIPTUNE_SOUND = new Audio('assets/sounds/background.wav');
const ANIMATION_TIME = 2000;
let selectedVulture;
let selectedQuery;


$(document).ready(setup);

function setup() {
  $(document).one('mousedown', startMusic);
  // code runs when page loads

$('#title').on('click', function(){
  $('.intro').hide();
  $('.container').show();
});

  $('#yes, #no, #uh').dialog({
    autoOpen: false
  });

  createAnew();
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
      BITE_SOUND.volume = 1.0;
      BITE_SOUND.play();
    }

  });

  //make liver draggable
  $liver.draggable({containment: $(".box"), scroll: false});
  setInterval(callBackBounce, 1000);
  //  .hover (what happens mousein, what happens mouseout)
  $button.hover(function() {
    $button.css("background-color", "pink");
  }, function() {
    $button.css("background-color", "yellow");
  })
  $button.on('mousedown', clickButton);
  $('.big').hover(function() {
    $(this).css("width", 170 + "px");
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

  $('.prometheus').hover(function() {
  $( '.prometheus' ).effect( "shake" );
});
  }


function startMusic() {
  BIRD_SOUND.volume = 0.1;
   BIRD_SOUND.loop = true;
   BIRD_SOUND.play();
   CHIPTUNE_SOUND.volume = 0.1;
   CHIPTUNE_SOUND.loop=true;
   CHIPTUNE_SOUND.play();
}

function createAnew() {
  let newDiv = $('<img>');
  $(newDiv).attr("class", "liver");
  $(newDiv).attr("src", "assets/images/liver.png");
  $(newDiv).draggable();
  $(".prometheus").append(newDiv);


  let r = Math.random();
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
    direction: 'up',
    distance: 20,
    times: 3
  }, 500);
}

function clickButton() {
  let q = Math.random();
  console.log(q);
  if (q < REVEAL_POSSIBILITY1) { // what gets passed through here
    selectedQuery = $('#uh');
  } else if ( q < REVEAL_POSSIBILITY2) {
    selectedQuery = $('#yes');

  } else {
    selectedQuery = $('#no');
  }
  console.log("button clicked");
  selectedQuery.dialog('open');

}
