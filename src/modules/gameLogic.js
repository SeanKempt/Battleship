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

  const cCarrier = Ship(5, 'carrier');
  const cBattleship = Ship(4, 'battleship');
  const cDestroyer = Ship(3, 'destroyer');
  const cSubmarine = Ship(3, 'submarine');
  const cPatrolBoat = Ship(2, 'Patrol Boat');

  //place ships on the boards; will need to automate this somehow later on; add constraints so that way can't place outside the board
  playerOneGameBoard.placeShip(
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
    carrier
  );
  playerOneGameBoard.placeShip(
    [
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
    ],
    battleship
  );
  playerOneGameBoard.placeShip(
    [
      [3, 5],
      [4, 5],
      [5, 5],
    ],
    destroyer
  );
  playerOneGameBoard.placeShip(
    [
      [7, 7],
      [8, 7],
      [9, 7],
    ],
    submarine
  );
  playerOneGameBoard.placeShip(
    [
      [8, 8],
      [9, 8],
    ],
    patrolBoat
  );

  computerPlayerGameBoard.placeShip(
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
    cCarrier
  );
  computerPlayerGameBoard.placeShip(
    [
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
    ],
    cBattleship
  );
  computerPlayerGameBoard.placeShip(
    [
      [3, 5],
      [4, 5],
      [5, 5],
    ],
    cDestroyer
  );
  computerPlayerGameBoard.placeShip(
    [
      [7, 7],
      [8, 7],
      [9, 7],
    ],
    cSubmarine
  );
  computerPlayerGameBoard.placeShip(
    [
      [8, 8],
      [9, 8],
    ],
    cPatrolBoat
  );

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
