import GameBoard from './gameBoard';
import { Player } from './player';
import {
  renderComputerGameBoard,
  renderDraggableShips,
  renderPlayerGameBoard,
  renderWelcomeModal,
  renderShipFlyout,
} from './domChanges';

const gameSetup = () => {
  renderShipFlyout();
  // create player and computer objects and boards
  const playerBoard = GameBoard('playerBoard');
  const playerOne = Player('Sean', true);

  const computerBoard = GameBoard('computerBoard');
  const cpu = Player('computer', false, true);

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
