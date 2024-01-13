document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = Array.from({ length: 9 }, (_, index) => createCell(index));
  let currentPlayer = "X";
  let gameActive = true;

  cells.forEach((cell) => board.appendChild(cell));

  function createCell(index) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    return cell;
  }

  function handleCellClick(event) {
    const cell = event.target;

    if (cell.textContent === "" && gameActive) {
      const index = cell.dataset.index;
      cell.textContent = currentPlayer;

      if (checkWinner(currentPlayer)) {
        showGameOver(`Player ${currentPlayer} wins!`);
        gameActive = false;
      } else if (checkDraw()) {
        showGameOver("It's a draw!");
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  function checkWinner(player) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some((combination) =>
      combination.every((index) => cells[index].textContent === player)
    );
  }

  function checkDraw() {
    return cells.every((cell) => cell.textContent !== "");
  }

  function showGameOver(message) {
    const gameOverScreen = document.createElement("div");
    gameOverScreen.classList.add("game-over");
    gameOverScreen.innerHTML = `<p>${message}</p><button class="new-game-btn" onclick="resetGame()">New Game</button>`;
    document.body.appendChild(gameOverScreen);
  }
});

function resetGame() {
  const board = document.getElementById("board");
  const gameOverScreen = document.querySelector(".game-over");

  // Reset cell content
  Array.from(board.children).forEach((cell) => (cell.textContent = ""));

  // Remove game over screen
  if (gameOverScreen) {
    gameOverScreen.remove();
  }

  // Reset game variables
  currentPlayer = "X";
  gameActive = true;
}
