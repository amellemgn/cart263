"use strict";

/********************************************************************

Assignment 3
Amelle Margaron

Modified Slamina.

Uses:
ResponsiveVoice
https://responsivevoice.org/
Animal names from:
https://github.com/dariusk/corpora/blob/master/data/animals/common.json

*********************************************************************/
// Call setup when page loads
$(document).ready(setup);
// Relevant variables + array of animal names we will use
const NUM_OPTIONS = 3;
let answers = [];
let correctAnimal;
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
let $command;
let score = 0;

//setup()
//
//start a new round and setup annyang
function setup() {
  newRound();
  if (annyang) {
    // set up voice commands including different versions of same phrase
    var command = {
      "*Say it again": checkRepeat,
      "*I give up": checkDefeat,
      "*animalSpeech": handleSpeech,
      "I think it's *animalSpeech": handleSpeech,
      "I think it is *animalSpeech": handleSpeech,
    };
    annyang.addCommands(command);
    // start annyang recognition
    annyang.start();
  }
// add to score
setInterval(updateScore, 100);
}

//newRound()
//
//create button interface and randomize three chosen animals from list, incl. correct animal which will be said out loud by annyang
function newRound() {
  answers = [];
  // randomize three items from array
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let r = animals[Math.floor(Math.random() * animals.length)];
    // call addButton functions to make three items buttons
    addButton(r);
    // add three animal items to answers array
    answers.push(r);
  }
  // randomize correct animal from three animal choices
  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
  // say the name of correct animal backwards
  sayBackwards(correctAnimal);
}

// addButton()
//
//create a button div with  with information passed from newRound()
// if clicked, call handleGuess()
function addButton(label) {
  let $div = $('<div></div>');
  $div.addClass("guess");
  $div.text(label);
  $div.button();
  $div.on('click', handleGuess);
  $div.appendTo('body');
}

//handleGuess()
//
// compare the button's text to the correct animal and add to score if they are the same, reset everything
//otherwise shake the buttons and repeat the correct answer
function handleGuess() {
  console.log($(this).text(), correctAnimal);
  if ($(this).text() === correctAnimal) {
    // console.log(score);
    score +=1;
    $('.guess').remove();
    setTimeout(newRound, 500);
  } else {
    score = 0;
    $('.guess').effect('shake');
    sayBackwards(correctAnimal);
  }
}
// sayBackwards()
//
//set random pitch and rate, reassemble the text backwards and feed that information to the annyang voice
function sayBackwards(text) {
  let rateR, pitchR = Math.random();
  let backwardsText = text.split('').reverse().join('');
  let options = {
    rate: rateR,
    pitch: pitchR
  };
  responsiveVoice.speak(backwardsText, "UK English Female", options);
}

//checkRepeat
//
//called by user: repeats correct answer
function checkRepeat() {
  sayBackwards(correctAnimal);
}

//checkDefeat()
//
//called by user: giving up means restarting from 0
function checkDefeat() {
  score= 0;
  $('.guess').effect('shake');
  $('.guess').remove();
  newRound();
}
//handleSpeech()
// compare the spoken label to the correct animal and add to score if they are the same, reset everything
//otherwise calls user a loser and  and repeat the correct answer
function handleSpeech(phrase) {
  if (phrase === correctAnimal) {
    $('.guess').remove();
    score +=1;
    setTimeout(newRound, 500);
  } else {
    $('.guess').effect('shake');
    score =0;
    responsiveVoice.speak("haha loser", "UK English Female");
    sayBackwards(correctAnimal);
  }
}

function updateScore(){
  $('.score').text(score);
}
