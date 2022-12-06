import { GameBoard } from './modules/gameBoard.js';
import { Ship } from './modules/ship.js';
import { Player } from './modules/player.js';
import { gameSetup } from './modules/gameLogic.js';

import './style.css';
import {
  renderComputerGameBoard,
  renderPlayerGameBoard,
} from './modules/domChanges.js';
const testGameBoard = GameBoard();
const computerTestGameBoard = GameBoard();
const testPlayer = Player('Ezsean');
const testComputerPlayer = Player('testComputer', true);
testGameBoard.placeShip('carrier', [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]);

renderPlayerGameBoard(testGameBoard);
renderComputerGameBoard(computerTestGameBoard, testPlayer);
