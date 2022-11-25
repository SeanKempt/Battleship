const gameBoard = () => {
  const missedAttacks = [];
  const shipsOnBoard = [];
  const placeShip = (x, y, shipToPlace) => {
    shipToPlace.setCoordinates(x, y);
    shipsOnBoard.push(shipToPlace);
  };
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
  };
};

export { gameBoard };
