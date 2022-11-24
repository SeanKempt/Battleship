import { ship } from '../modules/ship';

const gameBoard = () => {
  const missedAttacks = [];
  const shipsOnBoard = [];
  const placeShip = (x, y, shipToPlace) => {
    shipToPlace.setCoordinates(x, y);
    shipsOnBoard.push(shipToPlace);
  };
  const receiveAttack = (x, y) => {
    //check if the attack hit any ships in the shipsOnBoard array
    const hitShip = shipsOnBoard.find(
      (obj) => JSON.stringify(obj.getCoordinates()) === JSON.stringify([x, y])
    );
    return hitShip;
    //if the attack didn't hit any of the ships in the array then add it to the missedattacks array
  };
  const getMissedAttacks = () => missedAttacks;
  const getShipsOnBoard = () => shipsOnBoard;
  return { placeShip, getMissedAttacks, receiveAttack, getShipsOnBoard };
};

export { gameBoard };
