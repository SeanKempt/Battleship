import { renderGameOverModal } from './domChanges';
import Ship from './ship';

const GameBoard = (name) => {
  const pastAttacks = [];

  const ships = {};

  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // adds ship coordinates based on the entered coordinates
  const _adjustCords = (cords, shipLength, direction) => {
    const newCords = [];
    for (let i = 0; i < shipLength; i += 1) {
      if (direction === 'vertical') {
        const x0 = cords[0][0] + i;
        const y0 = cords[0][1];
        newCords.push([x0, y0]);
      } else {
        const x0 = cords[0][0];
        const y0 = cords[0][1] + i;
        newCords.push([x0, y0]);
      }
    }
    return newCords;
  };

  // validates that the ship doesn't overflow past the board boundaries
  const _validateShipPosition = (cords) => {
    let result = true;
    for (let i = 0; i < cords.length; i += 1) {
      const x = cords[i][0];
      const y = cords[i][1];
      if (x >= 10 || y >= 10) {
        result = false;
        return result;
      }
      if (x < 0 || y < 0) {
        result = false;
        return result;
      }
      if (typeof board[x][y] === 'object') {
        result = false;
        return result;
      }
    }
    return result;
  };

  const placeShip = (shipName, cords, shipLength, direction = 'horizontal') => {
    const updatedCords = _adjustCords(cords, shipLength, direction);
    if (_validateShipPosition(updatedCords) === false) {
      return false;
    }
    ships[shipName] = Ship(shipLength, shipName, updatedCords);
    for (let i = 0; i < updatedCords.length; i += 1) {
      const [x, y] = updatedCords[i];
      board[x][y] = ships[shipName];
    }
    return updatedCords;
  };

  const getBoard = () => board;

  const allSunk = () => {
    const results = Object.values(ships);
    const sunkShip = [];
    for (let i = 0; i < results.length; i += 1) {
      sunkShip.push(results[i].isSunk());
    }
    const checkSunkShips = sunkShip.every((element) => element === true);
    if (checkSunkShips === true) {
      return true;
    }
    return false;
  };

  const _isGameOver = () => {
    if (allSunk()) {
      renderGameOverModal();
      console.log(`gameover`);
    }
  };

  const getPastAttacks = () => pastAttacks;

  const processAttack = (x, y, gBoard) => {
    const attack = [x, y];
    const attackedShip = gBoard[attack[0]][attack[1]];
    const oldAttacks = getPastAttacks();

    if (attackedShip) {
      oldAttacks.push(attack);
      attackedShip.hit(1);
      console.log('Attack Successful!');
      if (attackedShip.isSunk()) {
        _isGameOver();
        return { hit: true, sunk: true, x, y, attackedShip };
      }
      return { hit: true, sunk: false, x, y, attackedShip };
    }
    oldAttacks.push(attack);
    console.log(`Attack Missed!`);
    return { hit: false, sunk: false, x, y, attackedShip };
  };

  const _randomNum = (max) => Math.floor(Math.random() * max);
  const _randomShip = (shipName, length) => {
    const dirDict = {
      0: 'horizontal',
      1: 'vertical',
    };
    const randDirection = dirDict[_randomNum(2)];
    const randomCords = [_randomNum(10), _randomNum(10)];
    if (placeShip(shipName, [randomCords], length, randDirection) === false) {
      _randomShip(shipName, length);
    }
    return true;
  };

  const generateComputerShipPlacement = () => {
    _randomShip('carrier', 5);
    _randomShip('battleship', 4);
    _randomShip('destroyer', 3);
    _randomShip('submarine', 3);
    _randomShip('patrolboat', 2);
  };

  // might be able to refactor these two functions since they return the same value.
  const receiveAttack = (x, y) => processAttack(x, y, board);

  const randAttack = (x, y) => processAttack(x, y, board);

  const getShips = () => ships;

  return {
    name,
    placeShip,
    getPastAttacks,
    receiveAttack,
    allSunk,
    board,
    getBoard,
    getShips,
    randAttack,
    generateComputerShipPlacement,
  };
};

export default GameBoard;
