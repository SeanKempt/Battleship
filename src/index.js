import { gameBoard } from './modules/gameBoard.js';
import { ship } from './modules/ship.js';

const destroyer = ship(4, 'destroyer');
const skif = ship(2, 'skif');
const game = gameBoard();
game.placeShip([0, 3], [3, 0], destroyer);
game.placeShip([1, 3], [2, 3], skif);
console.log(destroyer.getHits());
game.receiveAttack([0, 3], [3, 0]);
console.log(destroyer.getHits());
