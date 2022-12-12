import GameBoard from "./gameBoard";
import { Player } from "./player";
import { renderComputerGameBoard, renderPlayerGameBoard } from "./domChanges";

const shipSetup = (board) => {
  board.placeShip("carrier", [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  board.placeShip("battleship", [
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
  ]);

  board.placeShip("destroyer", [
    [4, 5],
    [4, 6],
    [4, 7],
  ]);

  board.placeShip("submarine", [
    [4, 8],
    [5, 8],
    [6, 8],
  ]);

  board.placeShip("patrol boat", [
    [9, 2],
    [9, 3],
  ]);
};

const gameSetup = () => {
  // create player and computer objects and boards
  const playerBoard = GameBoard("playerBoard");
  const playerOne = Player("Sean", true);

  const computerBoard = GameBoard("computerBoard");
  const cpu = Player("computer", false, true);

  // put the ships on the board for the player and computer
  shipSetup(playerBoard);
  shipSetup(computerBoard);

  // render the squares on the UI
  renderComputerGameBoard(computerBoard, playerOne, cpu, playerBoard);
  renderPlayerGameBoard(playerBoard);

  console.log(computerBoard.getBoard());
  console.log(playerBoard.getBoard());

  // turn based actions...
  // need to create game loop somehow

  // while loop???
};

export default gameSetup;
