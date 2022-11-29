import { GameBoard } from './modules/gameBoard.js';
import { Ship } from './modules/ship.js';
import { Player } from './modules/player.js';
import { gameSetup } from './modules/gameLogic.js';
import {
  renderComputerGameBoard,
  renderPlayerGameBoard,
} from './modules/domChanges.js';
import './style.css';

const testGameBoard = GameBoard();
const computerGameBoard = GameBoard();
renderPlayerGameBoard(testGameBoard.getGameSquares());
renderComputerGameBoard(computerGameBoard.getGameSquares());
gameSetup('Ezsean');
