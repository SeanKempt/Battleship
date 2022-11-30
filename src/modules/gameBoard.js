const GameBoard = () => {
  const missedAttacks = [];

  const shipsOnBoard = [];

  const placeShip = (x, y, shipToPlace) => {
    shipToPlace.setCoordinates(x, y);
    shipsOnBoard.push(shipToPlace);
  };

  const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const col = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const gameSquares = [];
  const generateSquares = () => {
    for (let i = 0; i < row.length; i++) {
      for (let j = 0; j < col.length; j++) {
        gameSquares.push([row[j], col[i]]);
      }
    }
  };

  generateSquares();

  const receiveAttack = (x, y) => {
    const hitShip = shipsOnBoard.find(
      (obj) => JSON.stringify(obj.getCoordinates()) === JSON.stringify([x, y])
    );
    if (hitShip) {
      hitShip.hit(1);
      return 'Attack successful!';
    } else {
      missedAttacks.push([x, y]);
      return 'The attack missed!';
    }
  };

  const getGameSquares = () => gameSquares;

  const allSunk = () => {
    return shipsOnBoard.every((obj) => obj.isSunk() === true);
  };
  const getMissedAttacks = () => missedAttacks;

  const getShipsOnBoard = () => shipsOnBoard;

  return {
    placeShip,
    getMissedAttacks,
    receiveAttack,
    getShipsOnBoard,
    allSunk,
    getGameSquares,
  };
};

export { GameBoard };
