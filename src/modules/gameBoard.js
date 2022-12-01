import { Ship } from './ship';

const GameBoard = () => {
  const pastAttacks = [];

  const shipsOnBoard = {
    1: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
    2: [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ],
    3: [
      [4, 5],
      [4, 6],
      [4, 7],
    ],
    4: [
      [4, 8],
      [5, 8],
      [6, 8],
    ],
    5: [
      [9, 2],
      [9, 3],
    ],
  };

  const ships = {
    carrier: Ship(5, 'carrier', 1),
    battleship: Ship(4, 'battleship', 2),
    destroyer: Ship(3, 'destroyer', 3),
    submarine: Ship(3, 'submarine', 4),
    patrolBoat: Ship(2, 'patrol boat', 5),
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

  const placeShip = (id, cords = shipsOnBoard[id]) => {
    for (let i = 0; i < cords.length; i++) {
      const [x, y] = cords[i];
      board[x][y] = id;
    }
  };

  const getBoard = () => board;

  const receiveAttack = (x, y) => {
    const attack = [x, y];
    let shipId = board[attack[0]][attack[1]];
    let attackedShipCords = shipsOnBoard[shipId];
  };

  const allSunk = () => {};

  const getPastAttacks = () => pastAttacks;

  const getShipsOnBoard = () => shipsOnBoard;

  return {
    placeShip,
    getPastAttacks,
    receiveAttack,
    shipsOnBoard,
    allSunk,
    board,
    getBoard,
  };
};

export { GameBoard };
