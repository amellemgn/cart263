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
  setTimeout(revert, 500);
}
//revert
//
// creates new liver div at the original location. transitions in through pulse effect bc it's a liver! 
function revert(){
  let liver = document.createElement('div'); // this is js. there's a way of using jquery for this that i dont know lol (this is why it kept fucking up when i was using $liver)
  liver.setAttribute('class', 'liver');
  let $prometheus = $('.prometheus');
  $(liver).toggle("pulsate");// $(liver) is recognized
  $prometheus.append(liver);
  //$('.prometheus').append($liver);
  $(liver).draggable({});
}
