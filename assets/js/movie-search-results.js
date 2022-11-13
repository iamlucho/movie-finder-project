//Modal clicks

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
})


/*Added local storage to retireve data from API 
when user clicks title search button that shows 
movie tile, release date, vote average score, and description*/

var data=JSON.parse(localStorage.getItem("movie"));
console.log(data);

const poster = document.querySelector("#movie-poster")
const posterpath = data.poster_path
poster.src = "https://image.tmdb.org/t/p/w500" + posterpath;

document.querySelector("#movie-title").textContent=data.title;
document.querySelector("#movie-year").textContent=data.release_date;
document.querySelector("#movie-rating").textContent=data.vote_average;
document.querySelector("#movie-description").textContent=data.overview;


//Added a link to the "More Details" button
var moreDirectButton = document.getElementById('moreDirectToLink');

function moreDirectLink(event) {
    console.log(event.target.value);
    // window.open(link.value);
    location.href=event.target.value;
}
// moreDirectButton.addEventListener('click', moreDirectLink);


//Added a link to the "Where to Watch Stream Movie" button
var whereDirectButton = document.getElementById('whereDirectToLink');

function whereDirectLink(event) {
    console.log(event.target.value);
    location.href=event.target.value;
}
whereDirectButton.addEventListener('click', whereDirectLink);