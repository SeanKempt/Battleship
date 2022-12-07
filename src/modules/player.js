import { GameBoard } from './gameBoard';

const Player = (name, turn = false, isComputer = false) => {
  const attacksSent = [];

  const changeTurn = () => (turn === true ? (turn = false) : (turn = true));

  const attack = (x, y, enemyBoard) => {
    enemyBoard.receiveAttack(x, y);
  };

  const randomAttack = (enemyBoard, x = _randNum(), y = _randNum()) => {
    const checkAttack = _isPreviousAttack(x, y, getAttacksSent());

    if (checkAttack === true) {
      x = _randNum();
      y = _randNum();
      randomAttack(enemyBoard, x, y);
    } else {
      attacksSent.push([x, y]);
      enemyBoard.randAttack(x, y);
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

  const _randNum = () => {
    return Math.floor(Math.random() * 10);
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

  const isTurn = () => turn;

  const getIsComputer = () => isComputer;

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
