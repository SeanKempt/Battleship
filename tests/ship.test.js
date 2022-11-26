import { Ship } from '../src/modules/ship';
const testShip = Ship(4);

describe('ship is operational', () => {
  test('check if the ship is sunk after being hit', () => {
    expect(testShip.isSunk()).toBe(false);
    testShip.hit(5);
    expect(testShip.isSunk()).toBe(true);
  });
});
