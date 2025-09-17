'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

//Function to Open modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//Function to Close modal
const clodeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//When click occurs on button run the function OpenModal
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

//Closes modal when user clicks X button
btnCloseModal.addEventListener('click', clodeModal);

//Closes modal when user click outside of modal
overlay.addEventListener('click', clodeModal);

//Closes modal when user presses Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    clodeModal();
  }
});
