import { ship } from './modules/ship.js';

const destroyer = ship(4);
console.log(destroyer);
console.log(destroyer.getHits());
destroyer.hit();
console.log(destroyer.getLength());
console.log(destroyer.getHits());
console.log(destroyer.isSunk());
