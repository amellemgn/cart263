"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
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

function setup() {
  // addButton("lamb");
  // addButton("llama");
  newRound();
  if (annyang) {
    var command = {
      "*Say it again": checkRepeat,
      "*I give up": checkDefeat,
      "*animalSpeech": handleSpeech,
      "it's *animalSpeech": handleSpeech
    };

    annyang.addCommands(command);
    annyang.start();
  }

updateScore();
}

function addButton(label) {
  let $div = $('<div></div>');
  $div.addClass("guess");
  $div.text(label);
  $div.button();
  $div.on('click', handleGuess);
  $div.appendTo('body');
}

function newRound() {
  answers = [];
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let r = animals[Math.floor(Math.random() * animals.length)];
    addButton(r);
    answers.push(r);
  }
  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
  sayBackwards(correctAnimal);
}

function handleGuess() {
  console.log($(this).text(), correctAnimal);
  if ($(this).text() === correctAnimal) {
    console.log(score);
    score +=1;
    $('.guess').remove();
    setTimeout(newRound, 500);
  } else {
    score = 0;
    $('.guess').effect('shake');
    sayBackwards(correctAnimal);
  }
}

function sayBackwards(text) {
  let rateR, pitchR = Math.random();
  let backwardsText = text.split('').reverse().join('');
  let options = {
    rate: rateR,
    pitch: pitchR
  };
  responsiveVoice.speak(backwardsText, "UK English Female", options);
}

function checkRepeat() {
  sayBackwards(correctAnimal);
}

function checkDefeat() {
  score= 0;
  $('.guess').effect('shake');
  $('.guess').remove();
  newRound();
}

function handleSpeech(phrase) {
  if (phrase === correctAnimal) {
    $('.guess').remove();
    score +=1;
    updateScore();
    setTimeout(newRound, 500);
  } else {
    $('.guess').effect('shake');
    score =0;
    updateScore();
    responsiveVoice.speak("haha loser", "UK English Female");
    sayBackwards(correctAnimal);
  }
}

function updateScore(){
  $('.score').text(score);
}
