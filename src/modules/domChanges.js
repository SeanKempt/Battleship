const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const gameScoreboard = document.getElementById('scoreboard');

const renderPlayerGameBoard = (gameBoardSquares) => {
  for (let i = 0; i < gameBoardSquares.length; i++) {
    const square = document.createElement('div');
    square.dataset.cord = gameBoardSquares[i];
    square.innerHTML = '';
    square.classList.add('gameSquare');
    playerBoard.appendChild(square);
  }
};

const renderComputerGameBoard = (gameBoardSquares) => {
  for (let i = 0; i < gameBoardSquares.length; i++) {
    const square = document.createElement('div');
    square.dataset.cord = gameBoardSquares[i];
    square.innerHTML = '';
    square.classList.add('gameSquare');
    computerBoard.appendChild(square);
  }
};

export { renderPlayerGameBoard, renderComputerGameBoard };
