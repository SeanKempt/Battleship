const Player = (name, isComputer = false) => {
  const attacksSent = [];

  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);

  const attack = (cord, board) => {
    board.receiveAttack(cord);
    attacksSent.push(cord);
    changeTurn();
  };

  const getIsComputer = () => isComputer;
  let playerTurn = true;

  const isTurn = () => playerTurn;

  const _randNum = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const randomAttack = (gameBoard) => {
    let cord = [_randNum(), _randNum()];

    const isPreviousAttack = (cord) => {
      if (
        attacksSent.some(
          (attacks) => JSON.stringify(attacks) === JSON.stringify(cord)
        )
      ) {
        cord = [_randNum(), _randNum()];
        return isPreviousAttack(x, y);
      } else {
        return;
      }
    };
    if (getIsComputer() === true) {
      isPreviousAttack(cord);
      attack(cord, gameBoard);
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
