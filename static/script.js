let currentPlayer = 'X'; // Starting player
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Game state (empty cells)
let gameOver = false; // Game status flag
let player1Name = '';
let player2Name = '';
let player1Symbol = 'X';
let player2Symbol = 'O';
let currentPlayerName = '';

// Get DOM elements
const cells = document.querySelectorAll('.cell'); // Select all cells
const turnIndicator = document.getElementById('turn-indicator');
const winnerMessage = document.getElementById('winner-message');
const winnerName = document.getElementById('winner-name');
const loserName = document.getElementById('loser-name');
const welcomeScreen = document.querySelector('.welcome-screen');
const gameContainer = document.querySelector('.game-container');
const playerForm = document.getElementById('player-form');

// Handle the form submission to start the game
playerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get player names and symbols
    player1Name = document.getElementById('player1-name').value;
    player2Name = document.getElementById('player2-name').value;
    player1Symbol = document.getElementById('player1-symbol').value;
    player2Symbol = document.getElementById('player2-symbol').value;

    // Set starting player and update the turn indicator
    currentPlayer = player1Symbol;
    currentPlayerName = player1Name;
    turnIndicator.textContent = currentPlayerName + "'s Turn";

    // Hide the welcome screen and show the game screen
    welcomeScreen.style.display = 'none';
    gameContainer.style.display = 'block';

    // Add event listeners to cells
    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            handleClick(cell.getAttribute('data-index'));
        });
    });
});

// Handle cell click event
function handleClick(index) {
    if (gameBoard[index] === '' && !gameOver) {
        // Mark the cell with current player's symbol
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        // Check if the game is won
        if (checkWinner()) {
            highlightWinner();
            gameOver = true;
            setTimeout(() => {
                displayWinner();
            }, 500); // Delay for visual effect
            return;
        }

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
        turnIndicator.textContent = currentPlayerName + "'s Turn";
    }
}

// Check for a winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    return winningCombos.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Highlight the winning cells
function highlightWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    for (let combination of winningCombos) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add('highlight');
            cells[b].classList.add('highlight');
            cells[c].classList.add('highlight');
        }
    }
}

// Display the winner message
function displayWinner() {
    const winner = currentPlayer === 'X' ? player1Name : player2Name;
    const loser = currentPlayer === 'X' ? player2Name : player1Name;

    winnerName.textContent = winner + " Wins!";
    loserName.textContent = loser;

    winnerMessage.style.display = 'block';
    gameContainer.style.display = 'none';
}

// Restart the game
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Reset the board
    currentPlayer = player1Symbol; // Reset the current player
    currentPlayerName = player1Name; // Reset current player name
    gameOver = false; // Reset the game state

    cells.forEach(cell => {
        cell.textContent = ''; // Clear all cells
        cell.classList.remove('highlight'); // Remove any previous highlights
    });

    winnerMessage.style.display = 'none';
    gameContainer.style.display = 'none';
    welcomeScreen.style.display = 'block';
}
