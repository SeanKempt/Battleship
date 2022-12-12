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
      const main = document.querySelector('#main-content');
      const sendAttack = playerObj.sendAttack(x, y, enemyBoard);
      // what happens when its not the players turn and starts with the computer? Its going to break
      if (playerObj.isTurn() === true) {
        if (sendAttack === `hit`) {
          attackedSquare.innerHTML = `&#x1F4A5`;
          attackedSquare.classList.add('attacked');
        } else if (sendAttack === `miss`) {
          attackedSquare.innerHTML = '❌';
          attackedSquare.classList.add('attacked');
          console.log(`Attack Missed!`);
        } else {
          attackedSquare.innerHTML = `&#x1F4A5`;
          attackedSquare.classList.add('attacked');
          sunkShipAlert(main, enemyObj, sendAttack.name);
        }
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

// if clicked it checks if its the players turn; if its the players turn then it launches the attack and changes the turns for both the player and the computer

export { renderPlayerGameBoard, renderComputerGameBoard, sunkShipAlert };
