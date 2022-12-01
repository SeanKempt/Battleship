const GameBoard = () => {
  const missedAttacks = [];

  const shipsOnBoard = [];

  const placeShip = (cords, shipToPlace) => {
    shipToPlace.setCoordinates(cords);
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

  const receiveAttack = (cord) => {
    const hitShip = shipsOnBoard.find((obj) =>
      obj
        .getCoordinates()
        .find((ary) => JSON.stringify(ary) === JSON.stringify(cord))
    );

    _processAttack(hitShip, cord);
  };

  const _processAttack = (attackedShip, cord) => {
    if (attackedShip !== undefined) {
      attackedShip.hit(1);
      console.log(`Attack successful`);
    } else {
      missedAttacks.push(cord);
      console.log(`Attack Missed!`); //replace these with some type of pop up or something that would indicate the attack missed
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
