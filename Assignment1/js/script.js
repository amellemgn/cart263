"use strict";
let rotation=0;

window.onload = setup;

function setup(){
  console.log("ok setup");

  for(let i =0; i < 1000; i++){
    let pixel = document.createElement('div');
    pixel.setAttribute('class','pixel');
    document.body.appendChild(pixel);
    document.addEventListener('click', remove);
    document.addEventListener('mouseover', paint);
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
