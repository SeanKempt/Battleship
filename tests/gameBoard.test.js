import { GameBoard } from '../src/modules/gameBoard';
import { Ship } from '../src/modules/ship';
import { Player } from '../src/modules/player';

let testShip = Ship(4, 'testShip');
let testGameBoard = GameBoard();
let testPlayer = Player('testPlayer');
let computerTestPlayer = Player('computerTestPlayer', true);

beforeEach(() => {
  testShip = Ship(4, 'testShip');
  testGameBoard = GameBoard();
  testPlayer = Player('testPlayer');
  computerTestPlayer = Player('computerTestPlayer', true);
});

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
    testGameBoard.placeShip([0, 0], [3, 0], testShip);
    testGameBoard.receiveAttack([0, 0], [3, 0]);
    expect(testShip.getHits()).toBe(1);
  });

  test('check if all ships are sunk on board', () => {
    testGameBoard.placeShip([0, 0], [3, 0], testShip);
    expect(testGameBoard.allSunk()).toBe(false);
    testShip.hit(4);
    expect(testGameBoard.allSunk()).toBe(true);
  });
});

describe('player operational', () => {
  test('check if player turn changes after attacking', () => {
    expect(testPlayer.isTurn()).toBe(true);
    testGameBoard.placeShip([0, 0], [3, 0], testShip);
    testPlayer.attack([0, 0], [3, 0], testGameBoard);
    expect(testPlayer.isTurn()).toBe(false);
    expect(testShip.getHits()).toBe(1);
  });

  test('check to make sure a computer attack is not a previous attack', () => {
    computerTestPlayer.randomAttack(testGameBoard);
    expect(computerTestPlayer.getAttacksSent().length).toBe(1);
  });
});
