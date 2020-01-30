"use strict";

/********************************************************************

Project 1
Amelle Margaron

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let $vulture;
let $liver;
$(document).ready(setup);

function setup() {
  // code runs when page loads
  // get all liver objets (just one, could've used id here) + vulture objects
  $liver = $('.liver');
  $vulture = $('.vulture');
  // make vultures droppable
  $vulture.droppable({
    drop: onDrop
  });
  //make liver draggable
  $liver.draggable({
    //nothing here right now, what do i want to happend when liver starts or stops being dropped?
  });
}
//
function onDrop(event, ui){
  ui.draggable.remove();
  setTimeout(revert, 250);
}

function revert(){
  console.log("revert");
  let $liver = document.createElement('div');
  $liver.setAttribute('class', 'liver');
  let $prometheus = $('.prometheus');
  $prometheus.append($liver);
  //$('.prometheus').append($liver);
  $liver.draggable({});
}
