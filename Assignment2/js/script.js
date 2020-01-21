"use strict";



$(document).ready(setup);

  let $spans;

function setup() {

  $spans = $('span');
  setInterval(update, 500);
  $spans.on('click', spanClicked);
}

function update() {
  console.log("update");
  $spans.each(updateSpan);
}

function updateSpan() {
  console.log("updating span");
  let ok = Math.random();
  if (ok < 0.1) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

function spanClicked(){
  console.log("clicked");
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}
