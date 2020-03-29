"use strict";

/********************************************************************

CART263 Project 3: re:Memory
Amelle Margaron

Recompose an oniric scene with re:Memory! Our 'chatbot' will ask you questions and
recreate the scene before your very eyes.
-> load hand-written JSON data
-> ask questions that presents user with two choices
-> according to user choice, add, one visual element to the 'postcard'


Questions for Pippin:
- whats up with the .json file / why cant i get comment stuff?
- "Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist." error

*********************************************************************/
// declare project variables
let questions;

$(document).ready(setup);

function setup() {
$.getJSON("js/questions.json")
.done(questionsLoaded) // successful load, calls this
.fail(questionsNotLoaded); // calls this if load fails
}

function questionsLoaded(data){
  questions = data;
  console.log(questions);
}

function questionsNotLoaded(jqxhr, textStatus, error){
  console.error(error);
}
