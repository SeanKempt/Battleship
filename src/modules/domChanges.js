const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');

const renderPlayerGameBoard = (gameBoardSquares) => {
  for (let i = 0; i < gameBoardSquares.length; i++) {
    const square = document.createElement('div');
    square.dataset.cord = gameBoardSquares[i];
    square.innerHTML = '';
    square.classList.add('gameSquare');
    playerBoard.appendChild(square);
  }
};

const attackEventListener = (element, playerObj, enemyBoard, cord) => {
  cord = cord.replaceAll(',', '');
  const strings = [...cord];
  const newCord = [];
  for (var i = 0; i < strings.length; i++) {
    newCord.push(parseInt(strings[i]));
  }
  element.addEventListener('click', () => {
    playerObj.attack(newCord, enemyBoard);
  });
};

const renderComputerGameBoard = (gameBoardSquares, playerObj, enemyBoard) => {
  for (let i = 0; i < gameBoardSquares.length; i++) {
    const square = document.createElement('div');
    square.dataset.cord = gameBoardSquares[i];
    let cord = square.dataset.cord;
    square.innerHTML = '';
    square.classList.add('gameSquare');
    attackEventListener(square, playerObj, enemyBoard, cord);
    computerBoard.appendChild(square);
  }
};

export { renderPlayerGameBoard, renderComputerGameBoard };
