//Declare relevant variables
let $refresh;
let randomCondiment;
let randomCat;
let randomRoom;
let randomWrestler;
let randomMove;
// Calls setup when page loads
$(document).ready(setup);
//Setup calls JSON data which we will use to randomly select words.
function setup() {
  $.getJSON('data/data.json')
    .done(gotData) // calls this function when done loading data
    .fail(dataError); // calls this function if data loads erroneously
//Create a refresh button and allow it to basically act as an equivalent to clicking the mouse anywhere onscreen
  $refresh = $('.refresh');
  $refresh.on("click", mousePressed);
}
//gotData is called when the JSON data has loaded
//randomizes words for each part  of our phrase and assembles the phrase to display
function gotData(data) {
  //randomize condiment fron JSON data
  randomCondiment = getRandomElement(data.condiments);
  // the verb 'is' follows our condiment. if the condiment is a plural noun, conjugate to 'are'
  let verb = 'is';
  if (randomCondiment.charAt(randomCondiment.length - 1) === 's') {
    verb = 'are';
  }
//randomize cat from JSON cat data
  randomCat = getRandomElement(data.cats);
// indefinite article precedes cat. make an array containing vowel, and if the first letter of the
// random cat matches a vowel, change indefinite article to make a grammatically correct phrase
  let indefiniteArticle = 'a';
  let vowels = ["A", "E", "I", "O", "U"]; // case sensitive
  for (let i = 0; i < vowels.length; i++) {
    console.log(randomCat.charAt(randomCat[0]));
    if (randomCat.charAt(randomCat[0]) === vowels[i]) {
      indefiniteArticle = 'an';
    }
  }
//randomize room, wrestler, wrestling move based on JSON data.
  randomRoom = getRandomElement(data.rooms);
  randomWrestler = getRandomElement(data.wrestlers);
  randomMove = getRandomElement(data.moves);
// create descrioption with our randomized words and (adjusted) grammar and append to html body
  let description = `${randomCondiment} ${verb} like ${indefiniteArticle} ${randomCat} in a ${randomRoom}, held in the delicate hands of ${randomWrestler} seconds before a lethal ${randomMove}.`;
  $('body').append(description)
}
// Show error message in console if loading JSON data malfunctions
function dataError(request, text, error) {
  console.error(error);
}
// With JSON data sent as an array into this function, select and return a random element
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// The equivalent of a 'refresh' button. Clicking reloads the web page, generating new words
function mousePressed() {
  console.log("pressed");
  location.reload(true);
}
