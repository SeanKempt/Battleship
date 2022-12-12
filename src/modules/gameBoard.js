import Ship from './ship';
import { sunkShipAlert } from './domChanges';

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

  const placeShip = (shipName, cords) => {
    ships[shipName] = Ship(cords.length, shipName, cords);

    for (let i = 0; i < cords.length; i += 1) {
      const [x, y] = cords[i];
      board[x][y] = ships[shipName];
    }
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
      console.log(`Game is over!`);
    }
  };

  const getPastAttacks = () => pastAttacks;

  const receiveAttack = (x, y) => {
    const attack = [x, y];
    const oldAttacks = getPastAttacks();
    const attackedShip = board[attack[0]][attack[1]];

    if (attackedShip) {
      oldAttacks.push(attack);
      attackedShip.hit(1);
      console.log(attackedShip.getHits());
      console.log('Attack Successful!');
      if (attackedShip.isSunk()) {
        _isGameOver();
        return attackedShip;
      }
      return 'hit';
    }

    // how do can I get this to return the object so I can use the name in the dom
    // changes function.

    oldAttacks.push(attack);
    return `miss`;
  };

  const randAttack = (x, y) => {
    const attack = [x, y];
    const attackedShip = board[attack[0]][attack[1]];
    const attackedSquareParent = document.querySelector('div#player-board');
    const main = document.querySelector('#main-content');
    const attackedSquare = attackedSquareParent.querySelector(
      `[data-cord='${x},${y}']`
    );

    if (attackedShip) {
      pastAttacks.push(attack);
      attackedShip.hit(1);
      attackedSquare.innerHTML = `&#x1F4A5`;
      attackedSquare.classList.add('attacked');
      if (attackedShip.isSunk()) {
        sunkShipAlert(main, `Player`, attackedShip.name);
        _isGameOver();
      }
      console.log('Attack Successful!');
    } else {
      attackedSquare.innerHTML = '❌';
      attackedSquare.classList.add('attacked');
      pastAttacks.push(attack);
      console.log(`Attack Missed!`);
    }
  };

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
  };
};

export default GameBoard;
