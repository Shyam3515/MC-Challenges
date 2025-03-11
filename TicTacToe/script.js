const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      message.innerText = `${gameBoard[a]} Wins!`;
      gameActive = false;
      return;
    } else {
      message.innerText = `Player ${currentPlayer}'s turn`;
    }
  }

  if (!gameBoard.includes("")) {
    message.innerText = "It's a Draw!";
    gameActive = false;
  }
}

function handleClick(index) {
  if (!gameBoard[index] && gameActive) {
    gameBoard[index] = currentPlayer;
    renderBoard();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
  }
}

function renderBoard() {
  board.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement("button");
    cellElement.classList.add("cell");
    cellElement.innerText = cell;
    cellElement.onclick = () => handleClick(index);
    board.appendChild(cellElement);
  });
  message.innerText = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  message.innerText = "";
  renderBoard();
}

renderBoard();
