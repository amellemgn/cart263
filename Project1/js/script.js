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


let vultureBounce = false;
let currentVulture;
let animation;

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
  selectVulture();
  animation = setInterval(updateVulture,UPDATE_FREQUENCY);


}

//updateVultures
//
//fsflsdflds
function updateVulture() {
  currentVulture.toggle("bounce",{ times: 1}, "slow");
  //console.log("bounce : " +$(currentVulture).attr("id"));

}

function selectVulture() {

  let r = Math.random();
  console.log(r);
  if (r < REVEAL_POSSIBILITY1) { // what gets passed through here
    currentVulture = $('#v1');
  } else if (r < REVEAL_POSSIBILITY2) {
    currentVulture = $('#v2');
  } else {
    currentVulture = $('#v3');
  }
}
//onDrop
//
//
function onDrop(event, ui) {
//clearInterval(animation);
  ui.draggable.remove();
  setTimeout(revert, 500);
 $(currentVulture).stop().toggle("bounce",{ times: 1}, "slow");
  selectVulture();
  //setInterval(updateVulture, UPDATE_FREQUENCY);
}
//revert
//
// creates new liver div at the original location. transitions in through pulse effect bc it's a liver!
function revert() {

  let liver = document.createElement('div'); // this is js. there's a way of using jquery for this that i dont know lol (this is why it kept fucking up when i was using $liver)
  liver.setAttribute('class', 'liver');
  let $prometheus = $('.prometheus');
  $(liver).toggle("pulsate"); // $(liver) is recognized
  $prometheus.append(liver);
  //$('.prometheus').append($liver);
  $(liver).draggable({});
}
