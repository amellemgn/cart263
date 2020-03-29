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
- "Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist." error. What does this mean?
- unexpected JSON error: script.js:38 SyntaxError: Unexpected string in JSON at position 344
    at parse (<anonymous>) .. but my JSON does not have a line 344
*********************************************************************/
// declare project variables
let questions;

$(document).ready(setup);

function setup() {
  $.getJSON("js/questions.json")
    .done(questionsLoaded) // successful load, calls this
    .fail(questionsNotLoaded); // calls this if load fails
}

//very ugly and not split up into separate functions bc i havent figured that out yet
function questionsLoaded(data) {
  questions = data; //now the questions variable contains the array that is in questions.json
  console.log(questions);

  for (i = 0; i < questions.questions.length; i++) {
    // ask user question with responsiveVoice
    responsiveVoice.speak(questions.questions[i].phrase, "UK English Female");
    if (annyang) {
      // set up voice commands (no voice commands yet?)
      var command = {
        // feels like i need to use the " recognized speech"= calledFunction format here... but i dont want to define the speech,
        // i want to match it to variables?
        questions.questions[i].option1= displayOption1;
        questions.questions[i].option2 = displayOption2;
      };
      annyang.addCommands(command);
      annyang.start();

      function displayOption1(){
        let $appendedImage = questions.questions[i].option1Image;
        $appendedImage.appendTo('postcard'); //used same formatting as A4 but maybe a div that i made doesnt get recognized the
        // same way as 'body'
      }
      function displayOption2(){ // there is a simpler way of doing this instead of repeating the same function twice
        let $appendedImage = questions.questions[i].option1Image;
        $appendedImage.appendTo('postcard');
      }
    }
  }


function questionsNotLoaded(jqxhr, textStatus, error) {
  console.error(error);
}
