const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');

const renderPlayerGameBoard = (board) => {
  const boardSquares = board.getBoard();
  for (let i = 0; i < boardSquares.length; i++) {
    for (let j = 0; j < boardSquares[i].length; j++) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      square.innerHTML = '';
      square.classList.add('gameSquare');
      playerBoard.appendChild(square);
    }
  }
};

//player obj is the player that is created when the game starts. Not the computer. computer would be computerObj
//cpuBoard is the computers gameBoard. since that is the only one that is receiving attacks from the player clicking on the board.
const renderComputerGameBoard = (cpuBoard, playerObj) => {
  const cpuSquares = cpuBoard.getBoard();
  for (let i = 0; i < cpuSquares.length; i++) {
    for (let j = 0; j < cpuSquares[i].length; j++) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      let cord = square.dataset.cord;
      square.innerHTML = '';
      square.classList.add('gameSquare');
      attackEventListener(square, playerObj, cpuBoard, cord);
      computerBoard.appendChild(square);
    }
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
    const [x, y] = newCord;
    playerObj.attack(x, y, enemyBoard);
  });
};

export { renderPlayerGameBoard, renderComputerGameBoard };
