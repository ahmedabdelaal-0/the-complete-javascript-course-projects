'use strict';

const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const player0ScoreEle = document.getElementById('score--0');
const player1ScoreEle = document.getElementById('score--1');
const diceEle = document.querySelector('.dice');
const player0currentEle = document.querySelector('#current--0');
const player1currentEle = document.querySelector('#current--1');

const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHoldScore = document.querySelector('.btn--hold');

// Starting condition
let scores;
let currentScore;
let activePlayer;
let gameStatus;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameStatus = 'play';

  diceEle.classList.add('hidden');

  player0Ele.classList.add('player--active');
  player0Ele.classList.remove('player--winner');
  player0ScoreEle.textContent = 0;
  player0currentEle.textContent = 0;

  player1Ele.classList.remove('player--winner');
  player1Ele.classList.remove('player--active');
  player1ScoreEle.textContent = 0;
  player1currentEle.textContent = 0;
}
init();

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Ele.classList.toggle('player--active');
  player0Ele.classList.toggle('player--active');
}

btnRollDice.addEventListener('click', () => {
  if (gameStatus === 'play') {
    // 1. Generating a random dice roll
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEle.src = `dice-${randomDice}.png`;
    diceEle.classList.remove('hidden');

    // 3. Check for rolled 1
    if (randomDice !== 1) {
      // Add dice to current score
      currentScore += randomDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      // Switch to next player
    } else {
      switchPlayer();
    }
  }
});

btnHoldScore.addEventListener('click', () => {
  if (gameStatus === 'play') {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      gameStatus = 'stop';
      diceEle.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
