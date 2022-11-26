import { gameBoard } from './modules/gameBoard.js';
import { ship } from './modules/ship.js';
import { Player } from './modules/player.js';

const testComputerPlayer = Player('computerPlayer', true);
const destroyer = ship(4, 'destroyer');
const skif = ship(2, 'skif');
const submarine = ship(2, 'submarine');
const game = gameBoard();
game.placeShip([0, 3], [3, 0], destroyer);
game.placeShip([1, 3], [2, 3], skif);
console.log(destroyer.getHits());
game.receiveAttack([0, 3], [3, 0]);
console.log(destroyer.getHits());
testComputerPlayer.randomAttack(game);
console.log(game.getMissedAttacks());
