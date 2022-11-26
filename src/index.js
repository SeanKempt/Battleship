import { GameBoard } from './modules/gameBoard.js';
import { Ship } from './modules/ship.js';
import { Player } from './modules/player.js';

const testComputerPlayer = Player('computerPlayer', true);
const destroyer = Ship(4, 'destroyer');
const skif = Ship(2, 'skif');
const submarine = Ship(2, 'submarine');
const game = GameBoard();
game.placeShip([0, 3], [3, 0], destroyer);
game.placeShip([1, 3], [2, 3], skif);
console.log(destroyer.getHits());
game.receiveAttack([0, 3], [3, 0]);
console.log(destroyer.getHits());
testComputerPlayer.randomAttack(game);
console.log(testComputerPlayer.getAttacksSent());
