/*
  Name: Joel Pickett
  Date: 03.03.2026
  CSC 372-01

  This is the script.js file for my JavaScript Callback assignment. 
  It includes the JavaScript of the page for the Rock, Paper, Scissors game.
  There's a couple of things that I added for the Extra Credit and they're
  marked with comments.
*/

// State variables for Extra Credit
let wins = 0;
let losses = 0;
let ties = 0;
let isPlaying = false; // Prevents clicking multiple times during animation

const choices = ['rock', 'paper', 'scissors'];
const imagePaths = {
    rock: 'images/rock.png',
    paper: 'images/paper.png',
    scissors: 'images/scissors.png',
    question: 'images/question-mark.png'
};

// The actual DOM Elements
const playerImages = document.querySelectorAll('.player-choice');
const computerImage = document.getElementById('computer-image');
const resultText = document.getElementById('result-text');
const resetButton = document.getElementById('reset-button');
const winCountSpan = document.getElementById('win-count');
const lossCountSpan = document.getElementById('loss-count');
const tieCountSpan = document.getElementById('tie-count');

// Adds Event Listeners to Player Images
playerImages.forEach(img => {
    img.addEventListener('click', handlePlayerThrow);
});

// The Reset Button's Event Listener
resetButton.addEventListener('click', resetGame);

function handlePlayerThrow(event) {
    if (isPlaying) return; // This line will block any clicks if the animation is running.
    isPlaying = true;

    // This removes the border from all images, then adds it to the clicked one.
    playerImages.forEach(img => img.classList.remove('selected'));
    event.target.classList.add('selected');

    const playerChoice = event.target.getAttribute('data-choice');
    resultText.textContent = "RESULTS: COMPUTER IS THINKING...";

    startComputerThinking(playerChoice);
}

function startComputerThinking(playerChoice) {
    let shuffleCount = 0;
    
    // This shuffles images every half second.
    const shuffleInterval = setInterval(() => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        computerImage.src = imagePaths[randomChoice];
        shuffleCount++;

        // This makes the shuffling stop after 3 seconds.
        if (shuffleCount >= 6) {
            clearInterval(shuffleInterval);
            finalizeComputerThrow(playerChoice);
        }
    }, 500);
}

function finalizeComputerThrow(playerChoice) {
    // Determining the final random throw.
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    computerImage.src = imagePaths[computerChoice];

    determineWinner(playerChoice, computerChoice);
    isPlaying = false; // This will allow playing again.
}

function determineWinner(player, computer) {
    let outcome = "";

    if (player === computer) {
        outcome = "RESULTS: IT'S A TIE!";
        ties++;
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        outcome = "RESULTS: YOU WIN!";
        wins++;
    } else {
        outcome = "RESULTS: COMPUTER WINS!";
        losses++;
    }

    resultText.textContent = outcome;
    updateScoreboard();
}

function updateScoreboard() {
    winCountSpan.textContent = wins;
    lossCountSpan.textContent = losses;
    tieCountSpan.textContent = ties;
}

function resetGame() {
    // This resets the visual state.
    playerImages.forEach(img => img.classList.remove('selected'));
    computerImage.src = imagePaths.question;
    resultText.textContent = "RESULTS: WAITING TO PLAY...";
    
    // Same here for the score state.
    wins = 0;
    losses = 0;
    ties = 0;
    updateScoreboard();
    isPlaying = false;
}