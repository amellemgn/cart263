"use strict";

/********************************************************************

Project 1
Amelle Margaron

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

Mostly combines code from various in-class exercises.

*********************************************************************/

let $vulture;
let $liver;
const UPDATE_FREQUENCY = 20;
const REVEAL_POSSIBILITY1 = 0.3;
const REVEAL_POSSIBILITY2 = 0.6;
let selectedVulture;



$(document).ready(setup);

function setup() {
  // code runs when page loads
  // get all liver objets (just one, could've used id here) + vulture objects
  selectedVulture = $('#v1');
  $liver = $('.liver');
  $vulture = $('.vulture');
  // make vultures droppable
  $vulture.droppable({
    drop: function(event, ui){
      ui.draggable.remove();
      createAnew();
    }
  });
  //make liver draggable
  $liver.draggable({});
  setInterval(callBackBounce, 1000);
}

function createAnew(){
  let newDiv = $('<div>');
  $(newDiv).attr("class", "liver");
  $(newDiv).draggable();
  $(".prometheus").append(newDiv);


    let r = Math.random();
    console.log(r);
    if (r < REVEAL_POSSIBILITY1) { // what gets passed through here
      selectedVulture = $('#v1');
    } else if ( REVEAL_POSSIBILITY1 < r < REVEAL_POSSIBILITY2) {
      selectedVulture = $('#v2');
    } else {
      selectedVulture = $('#v3');
    }
}

function callBackBounce(){
  selectedVulture.effect("bounce", {direction: 'down', times:3}, 500);
}
