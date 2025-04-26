let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function makeMove(cell, index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer); // Add color class (X or O)

  if (checkWinner()) {
    const status = document.getElementById("status");
    status.innerText = `Player ${currentPlayer} wins!`;
    status.classList.add("big-status"); // Make text bigger
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    const status = document.getElementById("status");
    status.innerText = "It's a draw!";
    status.classList.add("big-status"); // Make text bigger
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  const status = document.getElementById("status");
  status.innerText = "Player X's turn";
  status.classList.remove("big-status"); // Reset font size

  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("X", "O"); // Remove previous color classes
  });
}
