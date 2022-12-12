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
    const attackedShip = board[attack[0]][attack[1]];

    const oldAttacks = getPastAttacks();
    if (attackedShip) {
      oldAttacks.push(attack);
      attackedShip.hit(1);
      console.log('Attack Successful!');
      if (attackedShip.isSunk()) {
        _isGameOver();
        return attackedShip;
      }
      return 'hit';
    }

    oldAttacks.push(attack);
    console.log(`Attack Missed!`);
    return `miss`;
  };

  const randAttack = (x, y) => {
    const attack = [x, y];
    const attackedShip = board[attack[0]][attack[1]];
    const oldAttacks = getPastAttacks();

    if (attackedShip) {
      oldAttacks.push(attack);
      attackedShip.hit(1);
      console.log('Attack Successful!');
      console.log(attackedShip.getHits());
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
