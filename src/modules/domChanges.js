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

const _getRandAttackedSquare = (x, y) => {
  const squaresParent = document.querySelector('div#player-board');
  const square = squaresParent.querySelector(`[data-cord='${x},${y}']`);
  return square;
};

const _domAttackLogic = (user, enemy, square, attack) => {
  const targetSquare = square;
  const main = document.querySelector('#main-content');
  if (user.isTurn() === true) {
    if (attack.hit === true) {
      targetSquare.innerHTML = `&#x1F4A5`;
      targetSquare.classList.add('attacked');
      if (attack.sunk === true) {
        sunkShipAlert(main, enemy, attack.attackedShip.name);
      }
    } else if (attack.hit === false) {
      targetSquare.innerHTML = '❌';
      targetSquare.classList.add('attacked');
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
      const attackedSquareParent = document.querySelector('div#computer-board');
      const attackedSquare = attackedSquareParent.querySelector(
        `[data-cord='${x},${y}']`
      );
      const sendAttack = playerObj.sendAttack(x, y, enemyBoard);
      const randomAttack = enemyObj.randomAttack(pBoard);
      const randAttackedSquare = _getRandAttackedSquare(
        randomAttack.x,
        randomAttack.y
      );
      _domAttackLogic(playerObj, enemyObj, attackedSquare, sendAttack);
      playerObj.changeTurn();
      enemyObj.changeTurn();

      _domAttackLogic(enemyObj, playerObj, randAttackedSquare, randomAttack);
      enemyObj.changeTurn();
      playerObj.changeTurn();
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

// if clicked it checks if its the players turn; if its the players turn then it launches the attack and changes the turns for both the player and the computer

export { renderPlayerGameBoard, renderComputerGameBoard, sunkShipAlert };
