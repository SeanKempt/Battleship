//might need to look into creating the gameboard on the players themselves

const Player = (name, isComputer = false) => {
  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);
  const attack = (x, y, board) => {
    board.receiveAttack(x, y);
    changeTurn();
  };
  const getIsComputer = () => isComputer;
  let playerTurn = true;
  const isTurn = () => playerTurn;

  const randomAttack = (gameBoard) => {
    const _randNum = () => {
      return Math.floor(Math.random() * 10) + 1;
    };
    if (getIsComputer() === true && isTurn() === true) {
      attack([_randNum(), _randNum()], [_randNum(), _randNum()], gameBoard);
    }
  };
  return {
    name,
    isTurn,
    changeTurn,
    attack,
    getIsComputer,
    randomAttack,
  };
};

export { Player };
