import { Ship } from './ship';

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

  const placeShip = (name, cords) => {
    ships[name] = Ship(cords.length, name, cords);

    for (let i = 0; i < cords.length; i++) {
      const [x, y] = cords[i];
      board[x][y] = ships[name];
    }
  };

  const getBoard = () => board;

  const _arrayisPresent = (a, b) => {
    a = JSON.stringify(a);
    b = JSON.stringify(b);
    const result = a.indexOf(b);
    if (result != -1) {
      return true;
    } else {
      return false;
    }
  };

  const receiveAttack = (x, y) => {
    const attack = [x, y];
    const pastAttacks = getPastAttacks();
    let attackedShip = board[attack[0]][attack[1]];
    let checkAttack = _arrayisPresent(pastAttacks, attack);

    if (checkAttack === false) {
      if (attackedShip) {
        pastAttacks.push(attack);
        attackedShip.hit(1);
        if (attackedShip.isSunk()) {
          console.log(`${attackedShip.name} has been sunk!!!`);
          _isGameOver();
        }
        console.log('Attack Successful!');
      } else {
        pastAttacks.push(attack);
        console.log(`Attack Missed!`);
      }
    }
  };

  const randAttack = (x, y) => {
    const attack = [x, y];
    let attackedShip = board[attack[0]][attack[1]];
    let attackedSquareParent = document.querySelector('div#player-board');
    let attackedSquare = attackedSquareParent.querySelector(
      `[data-cord='${x},${y}']`
    );

    if (attackedShip) {
      pastAttacks.push(attack);
      attackedShip.hit(1);
      attackedSquare.style.backgroundColor = 'pink';
      if (attackedShip.isSunk()) {
        console.log(`${attackedShip.name} has been sunk!!!`);
        _isGameOver();
      }
      console.log('Attack Successful!');
    } else {
      attackedSquare.style.backgroundColor = 'blue';
      pastAttacks.push(attack);
      console.log(`Attack Missed!`);
    }
  };

  const _isGameOver = () => {
    if (allSunk()) {
      alert(`Game is over!`);
    }
  };

  const allSunk = () => {
    let results = Object.values(ships);
    const sunkShip = [];
    for (let i = 0; i < results.length; i++) {
      sunkShip.push(results[i].isSunk());
    }
    const checkSunkShips = sunkShip.every((element) => element === true);
    if (checkSunkShips === true) {
      return true;
    } else {
      return false;
    }
  };

  const getPastAttacks = () => pastAttacks;

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

export { GameBoard };
