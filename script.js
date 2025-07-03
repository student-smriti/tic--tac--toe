document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const statusDiv = document.getElementById('status');
  const resetBtn = document.getElementById('reset');

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;

  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
      statusDiv.textContent = currentPlayer + " wins!";
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      statusDiv.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusDiv.textContent = "Player " + currentPlayer + "'s turn";
    }
  }

  function checkWin() {
    return winningCombinations.some(combination =>
      combination.every(i => board[i] === currentPlayer)
    );
  }

  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    statusDiv.textContent = "Player " + currentPlayer + "'s turn";
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', resetGame);
  statusDiv.textContent = "Player " + currentPlayer + "'s turn";
});