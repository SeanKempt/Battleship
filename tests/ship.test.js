import { ship } from '../src/modules/ship.js';

describe('test if ship is operational', () => {
  const testShip = ship(4);
  testShip.hit();
  test('if hits is increased by 1 when called', () => {
    expect(testShip.getHits()).toBe(1);
  });
});
