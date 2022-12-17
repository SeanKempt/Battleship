const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const main = document.querySelector('#main-content');

const dragStarter = (e) => {
  e.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', [
      event.target.dataset.id,
      event.target.dataset.shiplength,
    ]); // fill with regular html plus the class for the ship
  });
};

// used to convert the coordinates from the html elements to numbers
const cordsToNum = (cords) => {
  const stringCords = cords.split(',');
  const numCords = [];
  for (let i = 0; i < stringCords.length; i += 1) {
    numCords.push(parseInt(stringCords[i], 10));
  }
  return numCords;
};

// finds square elements that match the coordinates that are passed in and provide them in an array
const findCordSquares = (cords) => {
  const squaresParent = document.querySelector('div#player-board');
  const squareElements = [];
  for (let i = 0; i < cords.length; i += 1) {
    const square = squaresParent.querySelector(
      `[data-cord=${CSS.escape(cords[i])}]`
    );
    squareElements.push(square);
  }
  return squareElements;
};

const dropEvent = (e, board) => {
  e.preventDefault();
  const cell = e.target;
  const data = e.dataTransfer.getData('text/plain').split(',');
  const name = data[0];
  const shipLength = data[1];
  let cords = cell.getAttribute('data-cord');
  cords = cordsToNum(cords);
  const placedShip = board.placeShip(`${name}`, [cords], shipLength);
  console.log(board.getBoard());
  findCordSquares(placedShip).forEach(
    (element) => element.classList.add(`${name}`) // need to refactor all of this code into modules or into seperate functions
  );
};

// used to create the dom ship elements on the page
const shipFactory = (name, length) => {
  const ship = Object.freeze({
    name,
    domEl: document.createElement('div'),
  });
  ship.domEl.dataset.id = name;
  ship.domEl.dataset.shiplength = length;
  ship.domEl.setAttribute('draggable', true);
  ship.domEl.classList.add('ship');
  dragStarter(ship.domEl);
  for (let i = 0; i < length; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('shipcell');
    ship.domEl.appendChild(cell);
  }
  return ship.domEl;
};

// creating the dom ship elements using the factory
const carrier = shipFactory('carrier', 5);
const battleship = shipFactory('battleship', 4);
const destroyer = shipFactory('destroyer', 3);
const submarine = shipFactory('submarine', 3);
const patrolboat = shipFactory('patrolboat', 2);

const renderDraggableShips = () => {
  // remember to remove this when you are done developing the ship container stuff
  main.appendChild(carrier);
  main.appendChild(battleship);
  main.appendChild(destroyer);
  main.appendChild(submarine);
  main.appendChild(patrolboat);
};

const renderPlayerGameBoard = (board) => {
  const boardSquares = board.getBoard();
  for (let i = 0; i < boardSquares.length; i += 1) {
    for (let j = 0; j < boardSquares[i].length; j += 1) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      square.innerHTML = '';
      square.classList.add('gameSquare', 'user-select-none');
      square.addEventListener('dragover', (event) => {
        const isShip = event.dataTransfer.types.includes('text/plain');
        if (isShip) {
          event.preventDefault();
        }
      });
      square.addEventListener('drop', (event) => {
        dropEvent(event, board);
      });
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
    'alert-danger',
    'alert-dismissible',
    'fade',
    'show',
    'role="alert"',
    'position-absolute',
    'w-100'
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
  const mainConatiner = document.querySelector('#main-content');
  if (user.isTurn() === true) {
    if (attack.hit === true) {
      targetSquare.innerHTML = `&#x1F4A5`;
      targetSquare.classList.add('attacked');
      if (attack.sunk === true) {
        sunkShipAlert(mainConatiner, enemy, attack.attackedShip.name);
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
      square.classList.add('gameSquare', 'user-select-none');
      attackEventListener(square, playerObj, cpuBoard, cpuObj, pBoard, cord);
      computerBoard.appendChild(square);
    }
  }
};

// if clicked it checks if its the players turn; if its the players turn then it launches the attack and changes the turns for both the player and the computer

export {
  renderPlayerGameBoard,
  renderComputerGameBoard,
  sunkShipAlert,
  renderDraggableShips,
};
