//Added current date of day
var today = moment();
$("#date").text(today.format("MMM Do, YYYY"));


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


// //Added a link to the "More Details" button
// var moreDirectButton = document.getElementById('moreDirectToLink');

// function moreDirectLink(event) {
//     console.log(event.target.value);
//     // window.open(link.value);
//     location.href=event.target.value;
// }
// moreDirectButton.addEventListener('click', moreDirectLink);


// //Added a link to the "Where to Watch Streaming Movie" button
// var whereDirectButton = document.getElementById('whereDirectToLink');

// function whereDirectLink(event) {
//     console.log(event.target.value);
//     location.href=event.target.value;
// }
// whereDirectButton.addEventListener('click', whereDirectLink);




