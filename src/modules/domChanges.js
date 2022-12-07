const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');

const renderPlayerGameBoard = (board) => {
  const boardSquares = board.getBoard();
  for (let i = 0; i < boardSquares.length; i++) {
    for (let j = 0; j < boardSquares[i].length; j++) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      square.innerHTML = '';
      square.classList.add('gameSquare');
      playerBoard.appendChild(square);
    }
  }
};

//player obj is the player that is created when the game starts. Not the computer. computer is the cpuObj.
//cpuBoard is the computers gameBoard. since that is the only one that is receiving attacks from the player clicking on the board.
const renderComputerGameBoard = (cpuBoard, playerObj, cpuObj, playerBoard) => {
  const cpuSquares = cpuBoard.getBoard();
  for (let i = 0; i < cpuSquares.length; i++) {
    for (let j = 0; j < cpuSquares[i].length; j++) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      let cord = square.dataset.cord;
      square.innerHTML = '';
      square.classList.add('gameSquare');
      attackEventListener(
        square,
        playerObj,
        cpuBoard,
        cpuObj,
        playerBoard,
        cord
      );
      computerBoard.appendChild(square);
    }
  }
};

//if clicked it checks if its the players turn; if its the players turn then it launches the attack and changes the turns for both the player and the computer
const attackEventListener = (
  element,
  playerObj,
  enemyBoard,
  enemyObj,
  playerBoard,
  cord
) => {
  cord = cord.replaceAll(',', '');
  const strings = [...cord];
  const newCord = [];
  for (var i = 0; i < strings.length; i++) {
    newCord.push(parseInt(strings[i]));
  }
  element.addEventListener(
    'click',
    () => {
      const [x, y] = newCord;
      //what happens when its not the players turn and starts with the computer? Its going to break.
      if (playerObj.isTurn() === true) {
        playerObj.attack(x, y, enemyBoard);
        playerObj.changeTurn();
        enemyObj.changeTurn();
      }

      if (enemyObj.isTurn() === true) {
        enemyObj.randomAttack(playerBoard);
        enemyObj.changeTurn();
        playerObj.changeTurn();
      }
    },
    { once: true }
  );
};

export { renderPlayerGameBoard, renderComputerGameBoard };
