"use strict";


$(document).ready(setup);
const INTERVAL_LENGTH = 500;
const REDACTION_PROBABILITY = 0.1;
const barkSound = new Audio("assets/sounds/bark.wav");
let secretsFound = 0;
let secretsTotal;
let secretClass;
let $spans;


function setup() {
  $spans = $('span'); //!!!! you declared the $spans variable out of setup, but then did the select al $('span') thing here
  secretClass = $('.secret');
  secretsTotal = secretClass.length;
  $("#total").text(secretsTotal);
  secretClass.on('mouseover', mouseOver);

  setInterval(update, INTERVAL_LENGTH); //!!!!!!i'm replacing hard-coded values!!!!! i made this and the math random percentage into constants
  $spans.on('click', spanClicked);
}

function update() {
  console.log("update");
  $spans.each(updateSpan);
}

function updateSpan() {
  // console.log("updating span");
  let ok = Math.random();
  if (ok < REDACTION_PROBABILITY) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

function spanClicked() {
  console.log("clicked");
  barkSound.play();
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}

function mouseOver() { // (remember that in an mouse event handler 'this' refers to the targeted element)
  $(this).addClass("found");
  $(this).off();
  secretsFound += 1;
  $("#found").text(secretsFound); // if i wanted to send this back to setup.....
  if (secretsFound === secretsTotal) {
     // $('.container').show();
     // $('.container').text("keep looking?");
     callPopup();
  }
}

function callPopup(){
  $('.container').show();
$('.container').text("You've found all the secrets");
}


// NOTES : add popup at the end that says do u want to continue, with yes and no buttons. if no, new popup: ok ur done go scroll twitter.
// if yes: reset secret and wahtever spans but this time if you highlight them there's some edgy stuff that happen (would love to find an aesthetic rotation squre thing. maybe the font size grows obnoxiously larger as you highlight stuff. also you get a highlight tool)
