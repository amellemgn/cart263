
$(document).ready(function() {

  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);
});

// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {
  // Now we select random elements from the three arrays inside
  // our JSON to get a random condiment, cat, and room. Then we add those
  // words onto our page by setting the text of the appropriate span.

  // First the condiment
  // Get a random condiment from the condiments array in the JSON
  let randomCondiment = getRandomElement(data.condiments);
  // Assume it's singular
  let verb = 'is';
  // Check if the last latter of the condiment is an 's'
  if (randomCondiment.charAt(randomCondiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }

  // Now the cat
  let randomCat = getRandomElement(data.cats);

  // Same again for room
  let randomRoom = getRandomElement(data.rooms);

  let randomWrestler = getRandomElement(data.wrestlers);
  let randomMove = getRandomElement(data.moves);

  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  let description = `${randomCondiment} ${verb} like a ${randomCat} in a ${randomRoom}, held in the delicate hands of ${randomWrestler} seconds before a lethal ${randomMove}.`;

  // Finally, we add it to the page and hey presto!
  $('body').append(description)
}


function dataError(request, text, error) {
  console.error(error);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
