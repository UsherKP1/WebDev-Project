// Game State Variables
let targetNumber;
let attemptsLeft;
const maxAttempts = 3;

// DOM Elements
const startSection = document.getElementById('start-section');
const gameSection = document.getElementById('game-section');
const restartSection = document.getElementById('restart-section');

const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const guessBtn = document.getElementById('guess-btn');
const playAgainBtn = document.getElementById('play-again-btn');

const guessInput = document.getElementById('guess-input');
const attemptsText = document.getElementById('attempts-left');
const messageText = document.getElementById('message');

// Event Listeners
startBtn.addEventListener('click', startGame);
endBtn.addEventListener('click', endGame);
playAgainBtn.addEventListener('click', startGame);
guessBtn.addEventListener('click', handleGuess);

// Allow user to press 'Enter' key to submit guess
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

// Initialize/Start Game Function
function startGame() {
    targetNumber = Math.floor(Math.random() * 25) + 1;
    attemptsLeft = maxAttempts;
    
    // Reset UI elements
    guessInput.value = '';
    attemptsText.textContent = `Attempts left: ${attemptsLeft}`;
    setMessage('', '');
    
    // Toggle Visibility
    startSection.classList.add('hidden');
    restartSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
    
    guessInput.focus();
}

// Handle the user's guess submission
function handleGuess() {
    const userGuess = parseInt(guessInput.value);

    // Validation check
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 25) {
        setMessage('Please enter a valid number between 1 and 25.', 'status-info');
        return;
    }

    attemptsLeft--;

    if (userGuess === targetNumber) {
        setMessage(`🎉 Congratulations! You guessed the right number (${targetNumber})!`, 'status-win');
        showGameOverOptions();
    } else if (attemptsLeft === 0) {
        setMessage(`😢 Game Over! You lost. The correct number was ${targetNumber}.`, 'status-lose');
        showGameOverOptions();
    } else {
        // Give a small hint to keep it fun
        const hint = userGuess > targetNumber ? 'Too high!' : 'Too low!';
        setMessage(`${hint} Try again.`, 'status-info');
        attemptsText.textContent = `Attempts left: ${attemptsLeft}`;
        guessInput.value = '';
        guessInput.focus();
    }
}

// Show options after winning or losing
function showGameOverOptions() {
    gameSection.classList.add('hidden');
    restartSection.classList.remove('hidden');
}

// End Game Manual Function
function endGame() {
    setMessage('Game ended. Thanks for visiting!', 'status-info');
    gameSection.classList.add('hidden');
    restartSection.classList.add('hidden');
    startSection.classList.remove('hidden');
}

// Helper function to update messages smoothly
function setMessage(text, className) {
    messageText.textContent = text;
    messageText.className = className;
}