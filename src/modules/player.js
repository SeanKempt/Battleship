import { GameBoard } from './gameBoard';

const Player = (name, isComputer = false) => {
  const attacksSent = [];

  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);

  // make player able to call an attack which uses the gameboard attack
  const attack = (x, y, enemyBoard) => {
    enemyBoard.receiveAttack(x, y);
  };

  const getIsComputer = () => isComputer;
  let playerTurn = true;

  const isTurn = () => playerTurn;

  const _randNum = () => {
    return Math.floor(Math.random() * 10);
  };

  const randomAttack = (enemyBoard, x = _randNum(), y = _randNum()) => {
    const checkAttack = _isPreviousAttack(x, y, getAttacksSent());

    if (checkAttack === true) {
      x = _randNum();
      y = _randNum();
      randomAttack(x, y, enemyBoard);
    } else {
      attacksSent.push([x, y]);
      attack(x, y, enemyBoard);
    }
  };

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

  const _isPreviousAttack = (x, y, pastAttacks) => {
    let attack = [x, y];
    let checkAttack = _arrayisPresent(pastAttacks, attack);
    if (checkAttack === true) {
      return true;
    } else {
      false;
    }
  };

  const getAttacksSent = () => attacksSent;
  return {
    name,
    isTurn,
    changeTurn,
    attack,
    getIsComputer,
    randomAttack,
    getAttacksSent,
  };
};

export { Player };
