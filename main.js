let staticUrl = 'https://itunes.apple.com/us/rss/topmovies/limit=100/json'

$.getJSON(staticUrl, function(data){
   
   const movies = data.feed.entry;

//carousel - img selection
function moviesDisplay(movie, index) {
for(i=0; i< movies.length; i++){
       return ` 
         <img class="img-${index} carouselbox-img" src="${movie['im:image'][2].label}">  
       `;
     }
   }

const sliderBox = document.querySelector(".sliderbox");      
sliderBox.insertAdjacentHTML(
  "beforeend", 
`  
${movies.map(moviesDisplay).join("")}
`); 

//carousel - functionality... 
let scrollPerClick;
let scrollAmount = 0;

//...slide left
let switchLeft = document.getElementById('switchLeft');

switchLeft.addEventListener('click', (e) => {
  sliderBox.scrollTo({
    top: 0,
    left: (scrollAmount -= scrollPerClick),
    behavior: "smooth",
  });
  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
});

//...slide right
let switchRight = document.getElementById('switchRight');

switchRight.addEventListener('click', (e) => {
if (scrollAmount <= sliderBox.scrollWidth - sliderBox.clientWidth) {
    sliderBox.scrollTo({
      top: 0,
      left: (scrollAmount += scrollPerClick),
      behavior: "smooth",
    });
  }
});

scrollPerClick = document.querySelector(".img-1").clientWidth + 20;

//background  

function myFunction(){

  let randomItem = movies[Math.floor(Math.random()*movies.length)];
     
    document.getElementById("background-app").innerHTML = `
    <section class="showcase">
    <img  class="showcase-img" src="${randomItem['im:image'][2].label}">
      <div class="showcase-content">
      <p class="title">${randomItem.title.label}</p>
      <p class="summary">${randomItem.summary.label}</p>
       <div class="btns">
       <button type="button" class="btn"><i class="fas fa-play" style="color: black; font-size: 10px; padding-left: 8px; padding-right: 12px;"></i> WATCH</button>
       <button type="button" class="btn"><i class="fas fa-plus" style="font-size: 10px; padding-right: 10px;"></i> ADD LIST</button>
     </div>   
   </div>
 </section>  
    `;
 } 
    myFunction();
});

 

//nav-bar animation

$(document).ready(function () { 
  $('ul.menu > li')
          .click(function (e) {
      $('ul.menu > li')
          .removeClass('active');
      $(this).addClass('active');
  });
});
