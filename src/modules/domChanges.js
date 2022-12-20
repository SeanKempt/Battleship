/* eslint-disable no-use-before-define */
import {
  createCpuBoard,
  createGameOverModal,
  createPlayerBoard,
  createShipFlyout,
  createWelcomeModal,
} from './domComponents';
import GameBoard from './gameBoard';
import { Player } from './player';

const dragStarter = (e) => {
  e.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', [
      event.target.dataset.id,
      event.target.dataset.shiplength,
    ]);
    // const shipFlyout = document.querySelector('.offcanvas');
  });
};

let shipIndex;

const getDragShipIndex = (e) => {
  shipIndex = Number(e.target.dataset.index);
  return shipIndex;
};
// used to gather the index of the cell that gets dragged with the ship container
const addShipIndex = (element) => {
  element.addEventListener('mousedown', getDragShipIndex);
};

// changes the coordinates to equal where the ship preview is getting dropped based on the captured ship index
const coordinateCorrection = (cords, direction = 'horizontal') => {
  let [x, y] = cords;
  x -= direction === 'horizontal' ? 0 : shipIndex;
  y -= direction === 'horizontal' ? shipIndex : 0;
  return [x, y];
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

// removes the ship from the flyout whenever it gets placed on the gameboard
const removeDragShip = (shipName) => {
  const fleetContainer = document.querySelector(`#fleetcontainer`);
  const shipToRemove = document.querySelector(
    `#fleetcontainer [data-id=${shipName}]`
  );
  const shipTitleToRemove = document.querySelector(
    `#fleetcontainer #${shipName}`
  );
  fleetContainer.removeChild(shipToRemove);
  fleetContainer.removeChild(shipTitleToRemove);
};

// if all the ships from the fleet container are placed/gone then hide the flyout element
const shipPlacementComplete = () => {
  const fleet = document.querySelector('#fleetcontainer');
  const flyout = document.querySelector('.offcanvas');
  if (fleet.childNodes.length === 0) {
    flyout.classList.toggle('show');
    removeFlyout();
    return true;
  }
  return false;
};

const dropEvent = (e, board) => {
  e.preventDefault();
  const cell = e.target;
  const data = e.dataTransfer.getData('text/plain').split(',');
  const name = data[0];
  const shipLength = data[1];
  let cords = cell.getAttribute('data-cord');
  cords = cordsToNum(cords);
  cords = coordinateCorrection(cords);
  const placedShip = board.placeShip(`${name}`, [cords], shipLength);

  const isSquareTaken = () => {
    let result;
    findCordSquares(placedShip).forEach((element) => {
      if (element.classList.contains('reserved')) {
        result = true;
        return result;
      }
      return result;
    });
    return result;
  };

  if (isSquareTaken()) {
    return false;
  }
  findCordSquares(placedShip).forEach((element) => {
    element.classList.add(`${name}`);
    element.classList.add(`reserved`);
  });
  removeDragShip(name);
  shipPlacementComplete();
  return true;
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
  addShipIndex(ship.domEl);
  for (let i = 0; i < length; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('shipcell');
    cell.dataset.index = [i];
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

// adds ships to the UI for the user to drag
const renderDraggableShips = () => {
  const fleetContainer = document.createElement('div');
  fleetContainer.setAttribute('id', 'fleetcontainer');
  const carrierTitle = document.createElement('p');
  carrierTitle.setAttribute('id', 'carrier');
  const battleshipTitle = document.createElement('p');
  battleshipTitle.setAttribute('id', 'battleship');
  const destroyerTitle = document.createElement('p');
  destroyerTitle.setAttribute('id', 'destroyer');
  const submarineTitle = document.createElement('p');
  submarineTitle.setAttribute('id', 'submarine');
  const patrolBoatTitle = document.createElement('p');
  patrolBoatTitle.setAttribute('id', 'patrolboat');
  carrierTitle.textContent = 'Carrier';
  battleshipTitle.textContent = 'Battleship';
  destroyerTitle.textContent = 'Destroyer';
  submarineTitle.textContent = 'Submarine';
  patrolBoatTitle.textContent = 'Patrol Boat';
  fleetContainer.appendChild(carrierTitle);
  fleetContainer.appendChild(carrier);
  fleetContainer.appendChild(battleshipTitle);
  fleetContainer.appendChild(battleship);
  fleetContainer.appendChild(destroyerTitle);
  fleetContainer.appendChild(destroyer);
  fleetContainer.appendChild(submarineTitle);
  fleetContainer.appendChild(submarine);
  fleetContainer.appendChild(patrolBoatTitle);
  fleetContainer.appendChild(patrolboat);
  return fleetContainer;
};

const renderPlayerGameBoard = (board, playerName) => {
  const boardWrapper = document.querySelector('#board-wrapper');
  const player = createPlayerBoard(playerName);
  boardWrapper.appendChild(player);
  const playersBoard = player.querySelector('#player-board');
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
      playersBoard.appendChild(square);
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
      _domAttackLogic(
        playerObj,
        enemyObj,
        attackedSquare,
        sendAttack,
        enemyBoard
      );
      playerObj.changeTurn();
      enemyObj.changeTurn();

      _domAttackLogic(
        enemyObj,
        playerObj,
        randAttackedSquare,
        randomAttack,
        pBoard
      );
      enemyObj.changeTurn();
      playerObj.changeTurn();
    },
    { once: true }
  );
};

const renderComputerGameBoard = (cpuBoard, playerObj, cpuObj, pBoard) => {
  const boardWrapper = document.querySelector('#board-wrapper');
  const computer = createCpuBoard();
  boardWrapper.appendChild(computer);
  const board = computer.querySelector('#computer-board');
  const cpuSquares = cpuBoard.getBoard();
  for (let i = 0; i < cpuSquares.length; i += 1) {
    for (let j = 0; j < cpuSquares[i].length; j += 1) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      const { cord } = square.dataset;
      square.innerHTML = '';
      square.classList.add('gameSquare', 'user-select-none');
      attackEventListener(square, playerObj, cpuBoard, cpuObj, pBoard, cord);
      board.appendChild(square);
    }
  }
};

const renderShipFlyout = () => {
  const body = document.querySelector('body');
  const shipFlyout = createShipFlyout();
  const ships = renderDraggableShips();
  body.appendChild(shipFlyout);
  const shipFlyoutBody = document.querySelector('.offcanvas-body');
  shipFlyoutBody.appendChild(ships);
};

const removeWelcomeModal = () => {
  const body = document.querySelector('body');
  const welcomeModal = document.querySelector('#welcome-modal');
  body.removeChild(welcomeModal);
};

const removePlayAgainModal = () => {
  const body = document.querySelector('body');
  const gameoverModal = document.querySelector('#gameover-modal');
  body.removeChild(gameoverModal);
};

const removeFlyout = () => {
  const flyout = document.querySelector('.offcanvas');
  const body = document.querySelector('body');
  body.removeChild(flyout);
};

const startBtnEvent = (element) => {
  element.addEventListener('click', () => {
    const playerBoard = GameBoard('playerBoard');
    const playerOne = Player('Player', true);

    const computerBoard = GameBoard('computerBoard');
    const cpu = Player('computer', false, true);

    // render the squares on the UI
    renderPlayerGameBoard(playerBoard, 'Player');
    renderComputerGameBoard(computerBoard, playerOne, cpu, playerBoard);
    computerBoard.generateComputerShipPlacement();

    console.log(computerBoard.getBoard());
    console.log(playerBoard.getBoard());
    renderShipFlyout();
    removeWelcomeModal();
  });
  return element;
};

const renderWelcomeModal = () => {
  const body = document.querySelector('body');
  body.appendChild(createWelcomeModal());
  const startBtn = document.querySelector('#startBtn');
  startBtnEvent(startBtn);
};

const resetGame = () => {
  const boardWrapper = document.querySelector('#board-wrapper');
  while (boardWrapper.firstChild) {
    boardWrapper.removeChild(boardWrapper.lastChild);
  }
  renderWelcomeModal();
};

const playAgainBtnEvent = (element) => {
  element.addEventListener('click', () => {
    removePlayAgainModal();
    resetGame();
  });
  return element;
};

const renderGameOverModal = (winnerName) => {
  const body = document.querySelector('body');
  body.appendChild(createGameOverModal(winnerName));
  const playAgainBtn = document.querySelector('#playagainBtn');
  playAgainBtnEvent(playAgainBtn);
};

const isGameOver = (winner, board) => {
  if (board.allSunk()) {
    renderGameOverModal(winner.name);
  }
};

const _domAttackLogic = (user, enemy, square, attack, attackedBoard) => {
  const targetSquare = square;
  const mainConatiner = document.querySelector('#main-content');
  if (user.isTurn() === true) {
    if (attack.hit === true) {
      targetSquare.innerHTML = `&#x1F4A5`;
      targetSquare.classList.add('attacked');
      if (attack.sunk === true) {
        isGameOver(user, attackedBoard);
        sunkShipAlert(mainConatiner, enemy, attack.attackedShip.name);
      }
    } else if (attack.hit === false) {
      targetSquare.innerHTML = '❌';
      targetSquare.classList.add('attacked');
    }
  }
};

export {
  renderPlayerGameBoard,
  renderComputerGameBoard,
  sunkShipAlert,
  renderDraggableShips,
  renderWelcomeModal,
  renderGameOverModal,
};
