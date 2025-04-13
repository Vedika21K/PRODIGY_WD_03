let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function makeMove(cell, index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer); // Add color class

  if (checkWinner()) {
    document.getElementById("status").innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").innerText = "It's a draw!";
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

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      drawWinLine(pattern);
      return true;
    }
  }
  return false;
}

function drawWinLine(pattern) {
  const line = document.getElementById("win-line");
  const positions = [
    [50, 50, 0],   // row 1
    [50, 150, 0],  // row 2
    [50, 250, 0],  // row 3
    [50, 50, 90],  // col 1
    [150, 50, 90], // col 2
    [250, 50, 90], // col 3
    [50, 50, 45],  // diag TL-BR
    [50, 250, -45] // diag TR-BL
  ];

  const patternList = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  const index = patternList.findIndex(p => JSON.stringify(p) === JSON.stringify(pattern));
  let [x, y, angle] = positions[index];
  
  line.style.width = "300px";
  line.style.top = y + "px";
  line.style.left = x + "px";
  line.style.transform = `rotate(${angle}deg)`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").innerText = "Player X's turn";
  
  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("X", "O"); // Clear colors
  });

  document.getElementById("win-line").style.width = "0";
}
