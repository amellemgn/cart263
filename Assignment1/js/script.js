"use strict";

/*

Assignment 1 - Pixel Painter
Amelle Margaron
Paint pixels and mess around w your mouse and keyboard

*/

//global rotation variable
let rotation=0;
// current key variable (starts as empty string)
let currentKey = "";
// call setup every time window is loaded
window.onload = setup;
//setup
//
// called when page loads. creates pixel canvas and tags event listeners
function setup(){
  console.log("ok setup");
//create a black pixel canvas and identify them as pixels
  for(let i =0; i < 1000; i++){
    let pixel = document.createElement('div');
    pixel.setAttribute('class','pixel');
//pixels have been added to the page's 'document'
    document.body.appendChild(pixel);
//tag the document with event listeners - things happen which cause more things to happen
//clicking - removes pixels / mouseover colors pixels / pressing keys rotates canvas
    document.addEventListener('click', remove);
    document.addEventListener('mouseover', paint);
    document.addEventListener('keydown', rotate);
  }
}

function paint(e){
  let pixel = e.target;
  pixel.style.backgroundColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  // code from https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
  setTimeout(resetPixel, 1000, pixel);
}

function resetPixel(pixel){
if (pixel.classList.contains('removed')){

}
else{
  pixel.style.backgroundColor = "black";
  }
}

function remove(e){
  let pixel = e.target;
  // pixel.style.backgroundColor = 'white';
  // pixel.classList.remove("pixel");
   pixel.style.opacity = "0";
   pixel.setAttribute('class', 'removed');
}

// from patrick chavez' code, tuesday section
function rotate(e){
  if (e.keyCode === 39){
    rotation +=1;
    // rotate the document by that amount
     document.style.transform = `rotate(${rotation}deg)`;
  }
  if(e.keyCode === 37){
    rotation -=1 ;
    // rotate the document by that amount
     document.style.transform = `rotate(${rotation}deg)`;
  }

}
