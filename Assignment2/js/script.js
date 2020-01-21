"use strict";


$(document).ready(setup);
  const INTERVAL_LENGTH = 500;
  const REDACTION_PROBABILITY = 0.1;
  let secretsFound;
  let secretsTotal;
  let secretClass;
  let $spans;

function setup() {
  $spans = $('span'); //!!!! you declared the $spans variable out of setup, but then did the select al $('span') thing here
  secretClass = $('.secret');
  secretsTotal = secretClass.length;
  $("#total").text(secretsTotal);

  secretClass.on('mouseover',mouseOver);

  setInterval(update, INTERVAL_LENGTH); //!!!!!!i'm replacing hard-coded values!!!!! i made this and the math random percentage into constants
  $spans.on('click', spanClicked);
}

function update() {
  console.log("update");
  $spans.each(updateSpan);
}

function updateSpan() {
  console.log("updating span");
  let ok = Math.random();
  if (ok < REDACTION_PROBABILITY) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

function spanClicked(){
  console.log("clicked");
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}

function mouseOver(){ // (remember that in an mouse event handler 'this' refers to the targeted element)
$(this).addClass("found");
$(this).off();
secretsFound +=1;
}
