import { GameBoard } from './modules/gameBoard.js';
import { Ship } from './modules/ship.js';
import { Player } from './modules/player.js';
import { gameSetup } from './modules/gameLogic.js';

import './style.css';
const testGameBoard = GameBoard();
console.log(testGameBoard.getBoard());
testGameBoard.placeShip(1);
testGameBoard.placeShip(2);
testGameBoard.placeShip(3);
testGameBoard.placeShip(4);
testGameBoard.placeShip(5);
console.log(testGameBoard.getBoard());
