"use strict";

/********************************************************************

Project 2
Amelle Margaron

Description goes here.
Song: https://www.youtube.com/watch?v=ygqFqRM-syc

https://3dtransforms.desandro.com/carousel
*********************************************************************/
let $carousel;
let $gif;
let angle = 0;

$(document).ready(setup);

function setup() {
  $carousel = $('.carousel');
  $gif = $('.gif');
  $gif.hover(
         function()
         {
           var src = $(this).attr("src");
           $(this).attr("src", src.replace(/\.png$/i, ".gif"));
         },
         function()
         {
           var src = $(this).attr("src");
           $(this).attr("src", src.replace(/\.gif$/i, ".png"));
         });
  setInterval(updateCarousel, 800);
}

function updateCarousel() {
  $carousel.on('mousemove', gaugeMousePosition);
  $carousel.css("transform", 'translateZ(-288px) rotateY(' + angle + 'deg)');
}

function gaugeMousePosition(e){
  if(e.pageX < 100){
    angle += 0.42;
  }
  else{
      angle -= 0.42;
  }
}
