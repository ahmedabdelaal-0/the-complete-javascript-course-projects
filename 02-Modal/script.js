'use strict';

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

function showModal() {
  modal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

for (let i = 0; i < btnsOpenModal.length; i += 1) {
  btnsOpenModal[i].addEventListener('click', showModal);
}

btnCloseModal.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
