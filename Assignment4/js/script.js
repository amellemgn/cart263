
$(document).ready(setup);
let $refresh;
let randomCondiment;
let randomCat;
let randomRoom;
let randomWrestler;
let randomMove;


function setup(){
  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);

  $refresh = $('.refresh');
  $refresh.on("click", gotData);
}

function gotData(data) {
  console.log("got data");
   randomCondiment = getRandomElement(data.condiments);
  let verb = 'is';
  if (randomCondiment.charAt(randomCondiment.length - 1) === 's') {
    verb = 'are';
  }

 randomCat = getRandomElement(data.cats);

 let indefiniteArticle ='a';
 if(randomCat.charAt(randomCat[0]=== 'a' || randomCat.charAt(randomCat[0]=== 'o'|| 'e'|| 'u' || 'i')){
   indefiniteArticle = 'an';
 }

 randomRoom = getRandomElement(data.rooms);
 randomWrestler = getRandomElement(data.wrestlers);
 randomMove = getRandomElement(data.moves);

  let description = `${randomCondiment} ${verb} like ${indefiniteArticle} ${randomCat} in a ${randomRoom}, held in the delicate hands of ${randomWrestler} seconds before a lethal ${randomMove}.`;

  $('body').append(description)
}


function dataError(request, text, error) {
  console.error(error);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
