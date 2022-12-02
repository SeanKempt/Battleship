import { Ship } from './ship';

const GameBoard = () => {
  const pastAttacks = [];

  const ships = {
    battleship: Ship(4, 'battleship', [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ]),
    destroyer: Ship(3, 'destroyer', [
      [4, 5],
      [4, 6],
      [4, 7],
    ]),
    submarine: Ship(3, 'submarine', [
      [4, 8],
      [5, 8],
      [6, 8],
    ]),
    patrolBoat: Ship(2, 'patrol boat', [
      [9, 2],
      [9, 3],
    ]),
  };

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
      } else {
        pastAttacks.push(attack);
        console.log(`attackMissed`);
      }
    } else {
      return `this attack has already happened. Try another attack!`;
    }
  };

  const allSunk = () => {};

  const getPastAttacks = () => pastAttacks;

  const getShipsOnBoard = () => shipsOnBoard;

  return {
    placeShip,
    getPastAttacks,
    receiveAttack,
    allSunk,
    board,
    getBoard,
  };
};

export { GameBoard };
