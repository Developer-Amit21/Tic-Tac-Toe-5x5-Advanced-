// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const messageDisplay = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'x';
    let gameBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']; // Updated for 5x5
    let gameActive = true;

    const winningConditions = [
        // Rows
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        // Columns
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        // Diagonals (top-left to bottom-right)
        [0, 6, 12, 18, 24],
        // Diagonals (top-right to bottom-left)
        [4, 8, 12, 16, 20]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer);
        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i <= winningConditions.length - 1; i++) { // Updated loop condition
            const winCondition = winningConditions[i];
            const a = gameBoard[winCondition[0]];
            const b = gameBoard[winCondition[1]];
            const c = gameBoard[winCondition[2]];
            const d = gameBoard[winCondition[3]];
            const e = gameBoard[winCondition[4]];
            if (a === '' || b === '' || c === '' || d === '' || e === '') { // Check for 5 cells
                continue;
            }
            if (a === b && b === c && c === d && d === e) { // Check for 5 in a row
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            displayMessage(`Player ${currentPlayer.toUpperCase()} wins!`);
            gameActive = false;
            return;
        }

        let draw = !gameBoard.includes('');
        if (draw) {
            displayMessage("It's a draw!");
            gameActive = false;
            return;
        }

        switchPlayer();
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        displayMessage(`Player ${currentPlayer.toUpperCase()}'s turn`);
    }

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    function resetGame() {
        currentPlayer = 'x';
        gameBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']; // Reset gameBoard for 5x5
        gameActive = true;
        messageDisplay.textContent = `Player X's turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    resetGame(); // Initialize game on page load
});