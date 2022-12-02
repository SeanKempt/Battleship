import { GameBoard } from './modules/gameBoard.js';
import { Ship } from './modules/ship.js';
import { Player } from './modules/player.js';
import { gameSetup } from './modules/gameLogic.js';

import './style.css';
const testGameBoard = GameBoard();
testGameBoard.placeShip('carrier', [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]);
console.log(testGameBoard.getBoard());
