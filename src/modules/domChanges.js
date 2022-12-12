const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');

const renderPlayerGameBoard = (board) => {
  const boardSquares = board.getBoard();
  for (let i = 0; i < boardSquares.length; i += 1) {
    for (let j = 0; j < boardSquares[i].length; j += 1) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      square.innerHTML = '';
      square.classList.add('gameSquare');
      playerBoard.appendChild(square);
    }
  }
};

const attackEventListener = (
  element,
  playerObj,
  enemyBoard,
  enemyObj,
  pBoard,
  attackCord
) => {
  const cord = attackCord.replaceAll(',', '');
  const strings = [...cord];
  const newCord = [];
  for (let i = 0; i < strings.length; i += 1) {
    newCord.push(parseInt(strings[i], 10));
  }
  element.addEventListener(
    'click',
    () => {
      const [x, y] = newCord;
      // what happens when its not the players turn and starts with the computer? Its going to break
      if (playerObj.isTurn() === true) {
        playerObj.sendAttack(x, y, enemyBoard);
        playerObj.changeTurn();
        enemyObj.changeTurn();
      }

      if (enemyObj.isTurn() === true) {
        enemyObj.randomAttack(pBoard);
        enemyObj.changeTurn();
        playerObj.changeTurn();
      }
    },
    { once: true }
  );
};

const renderComputerGameBoard = (cpuBoard, playerObj, cpuObj, pBoard) => {
  const cpuSquares = cpuBoard.getBoard();
  for (let i = 0; i < cpuSquares.length; i += 1) {
    for (let j = 0; j < cpuSquares[i].length; j += 1) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      const { cord } = square.dataset;
      square.innerHTML = '';
      square.classList.add('gameSquare');
      attackEventListener(square, playerObj, cpuBoard, cpuObj, pBoard, cord);
      computerBoard.appendChild(square);
    }
  }
};

const sunkShipAlert = (element, player, shipName) => {
  const alertDiv = document.createElement('div');
  const alertCloseBtn = document.createElement('button');
  const boardWrapper = document.querySelector('#board-wrapper');
  alertCloseBtn.classList.add('btn-close');
  alertCloseBtn.setAttribute('data-bs-dismiss', 'alert');
  alertDiv.classList.add(
    'alert',
    'alert-warning',
    'alert-dismissible',
    'fade',
    'show',
    'role="alert"'
  );
  alertDiv.textContent = `${player.name}'s ${shipName} has been sunk!`;
  alertDiv.appendChild(alertCloseBtn);
  element.insertBefore(alertDiv, boardWrapper);
};

// if clicked it checks if its the players turn; if its the players turn then it launches the attack and changes the turns for both the player and the computer

export { renderPlayerGameBoard, renderComputerGameBoard, sunkShipAlert };
