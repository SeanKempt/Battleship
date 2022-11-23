const gameBoard = () => {
  const missedAttacks = [];
  const shipsOnBoard = [];
  const placeShip = (coord) => {};
  const receiveAttack = (coord) => {};
  const getMissedAttacks = () => missedAttacks;
  const getShipsOnBoard = () => {};
  return { placeShip, getMissedAttacks, receiveAttack };
};

export { gameBoard };
