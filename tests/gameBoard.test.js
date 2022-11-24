import { gameBoard } from '../src/modules/gameBoard';
import { ship } from '../src/modules/ship';

const testShip = ship(4, 'testShip');
const testGameBoard = gameBoard();

describe('is gameboard operational', () => {
  test('check if able to place ship with coordinates', () => {
    expect(testShip.getCoordinates()).toStrictEqual([]);
    testGameBoard.placeShip([0, 0], [3, 0], testShip);
    expect(testShip.getCoordinates()).toStrictEqual([
      [0, 0],
      [3, 0],
    ]);
  });
  test('check if receiveAttack hit a ship', () => {
    expect(testShip.getHits()).toBe(0);
    testGameBoard.receiveAttack([0, 0], [3, 0]);
    expect(testShip.getHits()).toBe(1);
  });

  test('check if all ships are sunk on board', () => {
    expect(testGameBoard.allSunk()).toBe(false);
    testShip.hit(4);
    expect(testGameBoard.allSunk()).toBe(true);
  });
});
