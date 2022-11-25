//might need to look into creating the gameboard on the players themselves

const Player = (name) => {
  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);
  const attack = (x, y, board) => {
    board.receiveAttack(x, y);
    changeTurn();
  };
  let playerTurn = true;
  const isTurn = () => playerTurn;
  return { name, isTurn, changeTurn, attack };
};

export { Player };
