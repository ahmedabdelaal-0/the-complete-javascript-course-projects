'use strict';

const checkBtn = document.querySelector('.check');
const messageEle = document.querySelector('.message');
const secretNumberEle = document.querySelector('.number');
const scoreEle = document.querySelector('.score');
const highestScoreEle = document.querySelector('.highest-score');
const playAgainBtn = document.querySelector('.again');
let playerGuess = Number(document.querySelector('.guess').value);

let playingState = 'play';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highestScore = 0;

function updatePlayingStatus(status) {
  playingState = status;
}

function displayMessage(message) {
  messageEle.textContent = message;
}

function updateScore() {
  if (playerGuess === secretNumber) {
    highestScore = score > highestScore ? score : highestScore;
    highestScoreEle.textContent = highestScore;
  } else {
    score -= 1;
    scoreEle.textContent = score;
  }
}

// console.log(secretNumber, playerGuess);
checkBtn.addEventListener('click', () => {
  playerGuess = Number(document.querySelector('.guess').value);

  if (playingState === 'play') {
    // If the number is between 1 and 20
    if (playerGuess >= 1 && playerGuess <= 20) {
      updateScore();

      // If the number is correct
      if (playerGuess === secretNumber) {
        updatePlayingStatus('win');

        displayMessage('🎉 Correct Number!');

        secretNumberEle.textContent = secretNumber;

        document.querySelector('body').style.backgroundColor = '#60b347';
        secretNumberEle.style.width = '30rem';
      } else if (playerGuess !== secretNumber) {
        // If the number is wrong
        if (score > 0) {
          displayMessage(
            playerGuess > secretNumber ? '📈 Too high!' : '📉 Too low!',
          );
        } else {
          updatePlayingStatus('lose');

          displayMessage('💥 You lost the game!');
        }
      }
    } else {
      // If the number is < 1 or > 20 or there is no number
      displayMessage('⛔ Type a number between (1 and 20)');
    }
  }
});

// Reset the game when click on (Again button)
playAgainBtn.addEventListener('click', () => {
  playingState = 'play';

  document.querySelector('body').style.backgroundColor = '#222';

  secretNumberEle.textContent = '?';
  secretNumberEle.style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');

  document.querySelector('.guess').value = '';

  score = 20;
  scoreEle.textContent = score;
});
