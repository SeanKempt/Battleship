//might need to look into creating the gameboard on the players themselves

const Player = (name, isComputer = false) => {
  const attacksSent = [];
  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);
  const attack = (x, y, board) => {
    board.receiveAttack(x, y);
    attacksSent.push([x, y]);
    changeTurn();
  };
  const getIsComputer = () => isComputer;
  let playerTurn = true;
  const isTurn = () => playerTurn;
  const _randNum = () => {
    return Math.floor(Math.random() * 10) + 1;
  };
  const randomAttack = (gameBoard) => {
    const x = [_randNum(), _randNum()];
    const y = [_randNum(), _randNum()];
    const isPreviousAttack = (x, y) => {
      if (
        attacksSent.some(
          (attacks) => JSON.stringify(attacks) === JSON.stringify([x, y])
        )
      ) {
        x = [_randNum(), _randNum()];
        y = [_randNum(), _randNum()];
        return isPreviousAttack(x, y);
      } else {
        return;
      }
    };
    if (getIsComputer() === true && isTurn() === true) {
      isPreviousAttack(x, y);
      attack(x, y, gameBoard);
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
