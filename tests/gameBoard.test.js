import GameBoard from '../src/modules/gameBoard';
import Player from '../src/modules/player';

let testGameBoard = GameBoard();
let testPlayer = Player('testPlayer');
let computerTestPlayer = Player('computerTestPlayer', true);

beforeEach(() => {
    testGameBoard = GameBoard();
    testPlayer = Player('testPlayer');
    testGameBoard.placeShip('carrier', [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
    ]);
    computerTestPlayer = Player('computerTestPlayer', true);
});

describe('is gameboard operational', () => {
    test('check if able to place ship with coordinates', () => {
        expect(Object.keys(testGameBoard.getShips()).length).toBe(1);
        testGameBoard.placeShip('battleship', [
            [6, 0],
            [7, 0],
            [8, 0],
            [9, 0],
        ]);
        expect(Object.keys(testGameBoard.getShips()).length).toBe(2);
    });

    test('check if receiveAttack hit a ship', () => {
        expect(testGameBoard.getShips().carrier.getHits()).toBe(0);
        testGameBoard.receiveAttack(0, 0);
        expect(testGameBoard.getShips().carrier.getHits()).toBe(1);
    });

    test('check if all ships are sunk on board', () => {
        expect(testGameBoard.allSunk()).toBe(false);
        testGameBoard.getShips().carrier.hit(5);
        expect(testGameBoard.allSunk()).toBe(true);
    });
});
