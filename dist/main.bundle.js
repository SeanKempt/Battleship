/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/domChanges.js":
/*!***********************************!*\
  !*** ./src/modules/domChanges.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderComputerGameBoard": () => (/* binding */ renderComputerGameBoard),
/* harmony export */   "renderPlayerGameBoard": () => (/* binding */ renderPlayerGameBoard)
/* harmony export */ });
const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const gameScoreboard = document.getElementById('scoreboard');

const renderPlayerGameBoard = (gameBoardSquares) => {
  for (let i = 0; i < gameBoardSquares.length; i++) {
    const square = document.createElement('div');
    square.dataset.cord = gameBoardSquares[i];
    square.innerHTML = '';
    square.classList.add('gameSquare');
    playerBoard.appendChild(square);
  }
};

const renderComputerGameBoard = (gameBoardSquares) => {
  for (let i = 0; i < gameBoardSquares.length; i++) {
    const square = document.createElement('div');
    square.dataset.cord = gameBoardSquares[i];
    square.innerHTML = '';
    square.classList.add('gameSquare');
    computerBoard.appendChild(square);
  }
};




/***/ }),

/***/ "./src/modules/gameBoard.js":
/*!**********************************!*\
  !*** ./src/modules/gameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameBoard": () => (/* binding */ GameBoard)
/* harmony export */ });
const GameBoard = () => {
  const missedAttacks = [];

  const shipsOnBoard = [];

  const placeShip = (x, y, shipToPlace) => {
    shipToPlace.setCoordinates(x, y);
    shipsOnBoard.push(shipToPlace);
  };

  const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const col = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const gameSquares = [];
  const generateSquares = () => {
    for (let i = 0; i < row.length; i++) {
      for (let j = 0; j < col.length; j++) {
        gameSquares.push([row[i], col[j]]);
      }
    }
  };

  generateSquares();

  const receiveAttack = (x, y) => {
    const hitShip = shipsOnBoard.find(
      (obj) => JSON.stringify(obj.getCoordinates()) === JSON.stringify([x, y])
    );
    if (hitShip) {
      hitShip.hit(1);
      return 'Attack successful!';
    } else {
      missedAttacks.push([x, y]);
      return 'The attack missed!';
    }
  };

  const getGameSquares = () => gameSquares;

  const allSunk = () => {
    return shipsOnBoard.every((obj) => obj.isSunk() === true);
  };
  const getMissedAttacks = () => missedAttacks;

  const getShipsOnBoard = () => shipsOnBoard;

  return {
    placeShip,
    getMissedAttacks,
    receiveAttack,
    getShipsOnBoard,
    allSunk,
    getGameSquares,
  };
};




/***/ }),

/***/ "./src/modules/gameLogic.js":
/*!**********************************!*\
  !*** ./src/modules/gameLogic.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameSetup": () => (/* binding */ gameSetup)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/modules/gameBoard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");




const gameSetup = (playerName) => {
  const playerOne = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)(playerName);
  const playerOneGameBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.GameBoard)();
  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)('Computer', true);
  const computerPlayerGameBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.GameBoard)();

  //create the ships that are to be used on the gameboards
  const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(5, 'carrier');
  const battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(4, 'battleship');
  const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(3, 'destroyer');
  const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(3, 'submarine');
  const patrolBoat = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(2, 'Patrol Boat');

  //place ships on the boards; will need to automate this somehow later on; add constraints so that way can't place outside the board
  playerOneGameBoard.placeShip([0, 0], [0, 5], carrier);
  playerOneGameBoard.placeShip([9, 0], [9, 3], battleship);
  playerOneGameBoard.placeShip([3, 5], [5, 5], destroyer);
  playerOneGameBoard.placeShip([7, 7], [9, 7], submarine);
  playerOneGameBoard.placeShip([8, 8], [9, 8], patrolBoat);

  computerPlayerGameBoard.placeShip([0, 0], [0, 5], carrier);
  computerPlayerGameBoard.placeShip([9, 0], [9, 3], battleship);
  computerPlayerGameBoard.placeShip([3, 5], [5, 5], destroyer);
  computerPlayerGameBoard.placeShip([7, 7], [9, 7], submarine);
  computerPlayerGameBoard.placeShip([8, 8], [9, 8], patrolBoat);

  const whosTurn = () => {
    if (playerOne.isTurn() === true && computerPlayer.isTurn() === false)
      playerOne;
    if (playerOne.isTurn() === false && computerPlayer.isTurn() === true)
      computerPlayer;

    let currentTurn = whosTurn();
  };
};




/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
//might need to look into creating the gameboard on the players themselves

const Player = (name, isComputer = false) => {
  const attacksSent = [];
  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);
  const attack = (x, y, board) => {
    board.receiveAttack(x, y);
    attacksSent.push([x, y]);
    changeTurn();
  };
  const getIsComputer = () => isComputer;
  let playerTurn = true;
  const isTurn = () => playerTurn;
  const _randNum = () => {
    return Math.floor(Math.random() * 10) + 1;
  };
  const randomAttack = (gameBoard) => {
    const x = [_randNum(), _randNum()];
    const y = [_randNum(), _randNum()];
    const isPreviousAttack = (x, y) => {
      if (
        attacksSent.some(
          (attacks) => JSON.stringify(attacks) === JSON.stringify([x, y])
        )
      ) {
        x = [_randNum(), _randNum()];
        y = [_randNum(), _randNum()];
        return isPreviousAttack(x, y);
      } else {
        return;
      }
    };
    if (getIsComputer() === true) {
      isPreviousAttack(x, y);
      attack(x, y, gameBoard);
    }
  };

  const getAttacksSent = () => attacksSent;
  return {
    name,
    isTurn,
    changeTurn,
    attack,
    getIsComputer,
    randomAttack,
    getAttacksSent,
  };
};




/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
const Ship = (length, name, hits = 0, sunk = false) => {
  const coordinates = [];
  const hit = (value) => (hits = hits + value);
  const getCoordinates = () => coordinates;
  const setCoordinates = (x, y) => coordinates.push(x, y);
  const getHits = () => hits;
  const getLength = () => length;
  const getSunk = () => sunk;

  const isSunk = () => {
    const currentLength = getLength();
    const currentHits = getHits();
    if (currentHits >= currentLength) {
      sunk = true;
    } else {
      sunk = false;
    }
    return getSunk();
  };

  return {
    name,
    getLength,
    hit,
    getHits,
    isSunk,
    getCoordinates,
    setCoordinates,
  };
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameBoard.js */ "./src/modules/gameBoard.js");
/* harmony import */ var _modules_ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ship.js */ "./src/modules/ship.js");
/* harmony import */ var _modules_player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player.js */ "./src/modules/player.js");
/* harmony import */ var _modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/gameLogic.js */ "./src/modules/gameLogic.js");
/* harmony import */ var _modules_domChanges_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/domChanges.js */ "./src/modules/domChanges.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/style.css");







const testGameBoard = (0,_modules_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
const computerGameBoard = (0,_modules_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
(0,_modules_domChanges_js__WEBPACK_IMPORTED_MODULE_4__.renderPlayerGameBoard)(testGameBoard.getGameSquares());
(0,_modules_domChanges_js__WEBPACK_IMPORTED_MODULE_4__.renderComputerGameBoard)(computerGameBoard.getGameSquares());
(0,_modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_3__.gameSetup)('Ezsean');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsNkJBQTZCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUwRDs7Ozs7Ozs7Ozs7Ozs7O0FDeEIxRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQyxzQkFBc0IsZ0JBQWdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZEYTtBQUNNO0FBQ1Y7O0FBRTlCO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCLDZCQUE2QixxREFBUztBQUN0Qyx5QkFBeUIsK0NBQU07QUFDL0Isa0NBQWtDLHFEQUFTOztBQUUzQztBQUNBLGtCQUFrQiwyQ0FBSTtBQUN0QixxQkFBcUIsMkNBQUk7QUFDekIsb0JBQW9CLDJDQUFJO0FBQ3hCLG9CQUFvQiwyQ0FBSTtBQUN4QixxQkFBcUIsMkNBQUk7O0FBRXpCLCtCQUErQiw2Q0FBNkM7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVxQjs7Ozs7Ozs7Ozs7Ozs7O0FDeENyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7O0FDbkRsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWdCOzs7Ozs7O1VDL0JoQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNObUQ7QUFDVjtBQUNJO0FBQ007QUFJbEI7QUFDWjs7QUFFckIsc0JBQXNCLGdFQUFTO0FBQy9CLDBCQUEwQixnRUFBUztBQUNuQyw2RUFBcUI7QUFDckIsK0VBQXVCO0FBQ3ZCLGdFQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2RvbUNoYW5nZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUxvZ2ljLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWJvYXJkJyk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyLWJvYXJkJyk7XG5jb25zdCBnYW1lU2NvcmVib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZWJvYXJkJyk7XG5cbmNvbnN0IHJlbmRlclBsYXllckdhbWVCb2FyZCA9IChnYW1lQm9hcmRTcXVhcmVzKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZUJvYXJkU3F1YXJlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNxdWFyZS5kYXRhc2V0LmNvcmQgPSBnYW1lQm9hcmRTcXVhcmVzW2ldO1xuICAgIHNxdWFyZS5pbm5lckhUTUwgPSAnJztcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnZ2FtZVNxdWFyZScpO1xuICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkID0gKGdhbWVCb2FyZFNxdWFyZXMpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lQm9hcmRTcXVhcmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc3F1YXJlLmRhdGFzZXQuY29yZCA9IGdhbWVCb2FyZFNxdWFyZXNbaV07XG4gICAgc3F1YXJlLmlubmVySFRNTCA9ICcnO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdnYW1lU3F1YXJlJyk7XG4gICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG59O1xuXG5leHBvcnQgeyByZW5kZXJQbGF5ZXJHYW1lQm9hcmQsIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkIH07XG4iLCJjb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBzaGlwc09uQm9hcmQgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgc2hpcFRvUGxhY2UpID0+IHtcbiAgICBzaGlwVG9QbGFjZS5zZXRDb29yZGluYXRlcyh4LCB5KTtcbiAgICBzaGlwc09uQm9hcmQucHVzaChzaGlwVG9QbGFjZSk7XG4gIH07XG5cbiAgY29uc3Qgcm93ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldO1xuICBjb25zdCBjb2wgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG4gIGNvbnN0IGdhbWVTcXVhcmVzID0gW107XG4gIGNvbnN0IGdlbmVyYXRlU3F1YXJlcyA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2wubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZ2FtZVNxdWFyZXMucHVzaChbcm93W2ldLCBjb2xbal1dKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZ2VuZXJhdGVTcXVhcmVzKCk7XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3QgaGl0U2hpcCA9IHNoaXBzT25Cb2FyZC5maW5kKFxuICAgICAgKG9iaikgPT4gSlNPTi5zdHJpbmdpZnkob2JqLmdldENvb3JkaW5hdGVzKCkpID09PSBKU09OLnN0cmluZ2lmeShbeCwgeV0pXG4gICAgKTtcbiAgICBpZiAoaGl0U2hpcCkge1xuICAgICAgaGl0U2hpcC5oaXQoMSk7XG4gICAgICByZXR1cm4gJ0F0dGFjayBzdWNjZXNzZnVsISc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZEF0dGFja3MucHVzaChbeCwgeV0pO1xuICAgICAgcmV0dXJuICdUaGUgYXR0YWNrIG1pc3NlZCEnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRHYW1lU3F1YXJlcyA9ICgpID0+IGdhbWVTcXVhcmVzO1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBzT25Cb2FyZC5ldmVyeSgob2JqKSA9PiBvYmouaXNTdW5rKCkgPT09IHRydWUpO1xuICB9O1xuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4gbWlzc2VkQXR0YWNrcztcblxuICBjb25zdCBnZXRTaGlwc09uQm9hcmQgPSAoKSA9PiBzaGlwc09uQm9hcmQ7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgZ2V0TWlzc2VkQXR0YWNrcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzT25Cb2FyZCxcbiAgICBhbGxTdW5rLFxuICAgIGdldEdhbWVTcXVhcmVzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgZ2FtZVNldHVwID0gKHBsYXllck5hbWUpID0+IHtcbiAgY29uc3QgcGxheWVyT25lID0gUGxheWVyKHBsYXllck5hbWUpO1xuICBjb25zdCBwbGF5ZXJPbmVHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBQbGF5ZXIoJ0NvbXB1dGVyJywgdHJ1ZSk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyR2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy9jcmVhdGUgdGhlIHNoaXBzIHRoYXQgYXJlIHRvIGJlIHVzZWQgb24gdGhlIGdhbWVib2FyZHNcbiAgY29uc3QgY2FycmllciA9IFNoaXAoNSwgJ2NhcnJpZXInKTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoNCwgJ2JhdHRsZXNoaXAnKTtcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcCgzLCAnZGVzdHJveWVyJyk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoMywgJ3N1Ym1hcmluZScpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcblxuICAvL3BsYWNlIHNoaXBzIG9uIHRoZSBib2FyZHM7IHdpbGwgbmVlZCB0byBhdXRvbWF0ZSB0aGlzIHNvbWVob3cgbGF0ZXIgb247IGFkZCBjb25zdHJhaW50cyBzbyB0aGF0IHdheSBjYW4ndCBwbGFjZSBvdXRzaWRlIHRoZSBib2FyZFxuICBwbGF5ZXJPbmVHYW1lQm9hcmQucGxhY2VTaGlwKFswLCAwXSwgWzAsIDVdLCBjYXJyaWVyKTtcbiAgcGxheWVyT25lR2FtZUJvYXJkLnBsYWNlU2hpcChbOSwgMF0sIFs5LCAzXSwgYmF0dGxlc2hpcCk7XG4gIHBsYXllck9uZUdhbWVCb2FyZC5wbGFjZVNoaXAoWzMsIDVdLCBbNSwgNV0sIGRlc3Ryb3llcik7XG4gIHBsYXllck9uZUdhbWVCb2FyZC5wbGFjZVNoaXAoWzcsIDddLCBbOSwgN10sIHN1Ym1hcmluZSk7XG4gIHBsYXllck9uZUdhbWVCb2FyZC5wbGFjZVNoaXAoWzgsIDhdLCBbOSwgOF0sIHBhdHJvbEJvYXQpO1xuXG4gIGNvbXB1dGVyUGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChbMCwgMF0sIFswLCA1XSwgY2Fycmllcik7XG4gIGNvbXB1dGVyUGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChbOSwgMF0sIFs5LCAzXSwgYmF0dGxlc2hpcCk7XG4gIGNvbXB1dGVyUGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChbMywgNV0sIFs1LCA1XSwgZGVzdHJveWVyKTtcbiAgY29tcHV0ZXJQbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKFs3LCA3XSwgWzksIDddLCBzdWJtYXJpbmUpO1xuICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoWzgsIDhdLCBbOSwgOF0sIHBhdHJvbEJvYXQpO1xuXG4gIGNvbnN0IHdob3NUdXJuID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXJPbmUuaXNUdXJuKCkgPT09IHRydWUgJiYgY29tcHV0ZXJQbGF5ZXIuaXNUdXJuKCkgPT09IGZhbHNlKVxuICAgICAgcGxheWVyT25lO1xuICAgIGlmIChwbGF5ZXJPbmUuaXNUdXJuKCkgPT09IGZhbHNlICYmIGNvbXB1dGVyUGxheWVyLmlzVHVybigpID09PSB0cnVlKVxuICAgICAgY29tcHV0ZXJQbGF5ZXI7XG5cbiAgICBsZXQgY3VycmVudFR1cm4gPSB3aG9zVHVybigpO1xuICB9O1xufTtcblxuZXhwb3J0IHsgZ2FtZVNldHVwIH07XG4iLCIvL21pZ2h0IG5lZWQgdG8gbG9vayBpbnRvIGNyZWF0aW5nIHRoZSBnYW1lYm9hcmQgb24gdGhlIHBsYXllcnMgdGhlbXNlbHZlc1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSwgaXNDb21wdXRlciA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGF0dGFja3NTZW50ID0gW107XG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PlxuICAgIHBsYXllclR1cm4gPT09IHRydWUgPyAocGxheWVyVHVybiA9IGZhbHNlKSA6IChwbGF5ZXJUdXJuID0gdHJ1ZSk7XG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5LCBib2FyZCkgPT4ge1xuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgYXR0YWNrc1NlbnQucHVzaChbeCwgeV0pO1xuICAgIGNoYW5nZVR1cm4oKTtcbiAgfTtcbiAgY29uc3QgZ2V0SXNDb21wdXRlciA9ICgpID0+IGlzQ29tcHV0ZXI7XG4gIGxldCBwbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgY29uc3QgaXNUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcbiAgY29uc3QgX3JhbmROdW0gPSAoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gIH07XG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IChnYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCB4ID0gW19yYW5kTnVtKCksIF9yYW5kTnVtKCldO1xuICAgIGNvbnN0IHkgPSBbX3JhbmROdW0oKSwgX3JhbmROdW0oKV07XG4gICAgY29uc3QgaXNQcmV2aW91c0F0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGF0dGFja3NTZW50LnNvbWUoXG4gICAgICAgICAgKGF0dGFja3MpID0+IEpTT04uc3RyaW5naWZ5KGF0dGFja3MpID09PSBKU09OLnN0cmluZ2lmeShbeCwgeV0pXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICB4ID0gW19yYW5kTnVtKCksIF9yYW5kTnVtKCldO1xuICAgICAgICB5ID0gW19yYW5kTnVtKCksIF9yYW5kTnVtKCldO1xuICAgICAgICByZXR1cm4gaXNQcmV2aW91c0F0dGFjayh4LCB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChnZXRJc0NvbXB1dGVyKCkgPT09IHRydWUpIHtcbiAgICAgIGlzUHJldmlvdXNBdHRhY2soeCwgeSk7XG4gICAgICBhdHRhY2soeCwgeSwgZ2FtZUJvYXJkKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0QXR0YWNrc1NlbnQgPSAoKSA9PiBhdHRhY2tzU2VudDtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGlzVHVybixcbiAgICBjaGFuZ2VUdXJuLFxuICAgIGF0dGFjayxcbiAgICBnZXRJc0NvbXB1dGVyLFxuICAgIHJhbmRvbUF0dGFjayxcbiAgICBnZXRBdHRhY2tzU2VudCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIG5hbWUsIGhpdHMgPSAwLCBzdW5rID0gZmFsc2UpID0+IHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcbiAgY29uc3QgaGl0ID0gKHZhbHVlKSA9PiAoaGl0cyA9IGhpdHMgKyB2YWx1ZSk7XG4gIGNvbnN0IGdldENvb3JkaW5hdGVzID0gKCkgPT4gY29vcmRpbmF0ZXM7XG4gIGNvbnN0IHNldENvb3JkaW5hdGVzID0gKHgsIHkpID0+IGNvb3JkaW5hdGVzLnB1c2goeCwgeSk7XG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldFN1bmsgPSAoKSA9PiBzdW5rO1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgY3VycmVudEhpdHMgPSBnZXRIaXRzKCk7XG4gICAgaWYgKGN1cnJlbnRIaXRzID49IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdW5rID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBnZXRTdW5rKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGdldExlbmd0aCxcbiAgICBoaXQsXG4gICAgZ2V0SGl0cyxcbiAgICBpc1N1bmssXG4gICAgZ2V0Q29vcmRpbmF0ZXMsXG4gICAgc2V0Q29vcmRpbmF0ZXMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gJy4vbW9kdWxlcy9nYW1lQm9hcmQuanMnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vbW9kdWxlcy9zaGlwLmpzJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vbW9kdWxlcy9wbGF5ZXIuanMnO1xuaW1wb3J0IHsgZ2FtZVNldHVwIH0gZnJvbSAnLi9tb2R1bGVzL2dhbWVMb2dpYy5qcyc7XG5pbXBvcnQge1xuICByZW5kZXJDb21wdXRlckdhbWVCb2FyZCxcbiAgcmVuZGVyUGxheWVyR2FtZUJvYXJkLFxufSBmcm9tICcuL21vZHVsZXMvZG9tQ2hhbmdlcy5qcyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuY29uc3QgdGVzdEdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcbnJlbmRlclBsYXllckdhbWVCb2FyZCh0ZXN0R2FtZUJvYXJkLmdldEdhbWVTcXVhcmVzKCkpO1xucmVuZGVyQ29tcHV0ZXJHYW1lQm9hcmQoY29tcHV0ZXJHYW1lQm9hcmQuZ2V0R2FtZVNxdWFyZXMoKSk7XG5nYW1lU2V0dXAoJ0V6c2VhbicpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9