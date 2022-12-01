import { GameBoard } from './modules/gameBoard.js';
import { Ship } from './modules/ship.js';
import { Player } from './modules/player.js';
import { gameSetup } from './modules/gameLogic.js';

import './style.css';
const testGameBoard = GameBoard();
console.log(testGameBoard.board);
