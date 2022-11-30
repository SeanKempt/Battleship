import { Player } from './player';
import { GameBoard } from './gameBoard';
import { Ship } from './ship';
import {
  renderComputerGameBoard,
  renderPlayerGameBoard,
} from '../modules/domChanges.js';

const gameSetup = (playerName) => {
  const playerOne = Player(playerName);
  const playerOneGameBoard = GameBoard();
  const computerPlayer = Player('Computer', true);
  const computerPlayerGameBoard = GameBoard();

  //create the ships that are to be used on the gameboards
  const carrier = Ship(5, 'carrier');
  const battleship = Ship(4, 'battleship');
  const destroyer = Ship(3, 'destroyer');
  const submarine = Ship(3, 'submarine');
  const patrolBoat = Ship(2, 'Patrol Boat');

  //place ships on the boards; will need to automate this somehow later on; add constraints so that way can't place outside the board
  playerOneGameBoard.placeShip([0, 0], [0, 5], carrier);
  playerOneGameBoard.placeShip([9, 0], [9, 3], battleship);
  playerOneGameBoard.placeShip([3, 5], [5, 5], destroyer);
  playerOneGameBoard.placeShip([7, 7], [9, 7], submarine);
  playerOneGameBoard.placeShip([8, 8], [9, 8], patrolBoat);

  computerPlayerGameBoard.placeShip([0, 0], [0, 5], carrier);
  computerPlayerGameBoard.placeShip([9, 0], [9, 3], battleship);
  computerPlayerGameBoard.placeShip([3, 5], [5, 5], destroyer);
  computerPlayerGameBoard.placeShip([7, 7], [9, 7], submarine);
  computerPlayerGameBoard.placeShip([8, 8], [9, 8], patrolBoat);

  const whosTurn = () => {
    if (playerOne.isTurn() === true && computerPlayer.isTurn() === false)
      playerOne;
    if (playerOne.isTurn() === false && computerPlayer.isTurn() === true)
      computerPlayer;
  };

  let currentTurn = whosTurn();

  renderPlayerGameBoard(playerOneGameBoard.getGameSquares());

  renderComputerGameBoard(
    computerPlayerGameBoard.getGameSquares(),
    playerOne,
    computerPlayerGameBoard
  );
};

export { gameSetup };
