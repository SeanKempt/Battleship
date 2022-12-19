import GameBoard from './gameBoard';
import { Player } from './player';
import {
  renderComputerGameBoard,
  renderPlayerGameBoard,
  renderWelcomeModal,
} from './domChanges';

const gameSetup = () => {
  renderWelcomeModal();
  // create player and computer objects and boards
  const playerBoard = GameBoard('playerBoard');
  const playerOne = Player('Sean', true);

  const computerBoard = GameBoard('computerBoard');
  const cpu = Player('computer', false, true);

  // render the squares on the UI
  renderComputerGameBoard(computerBoard, playerOne, cpu, playerBoard);
  computerBoard.generateComputerShipPlacement();
  renderPlayerGameBoard(playerBoard);

  console.log(computerBoard.getBoard());
  console.log(playerBoard.getBoard());

  // turn based actions...
  // need to create game loop somehow

  // while loop???
};

export default gameSetup;
