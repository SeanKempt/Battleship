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

const renderPlayerGameBoard = (board) => {
  const boardSquares = board.getBoard();
  for (let i = 0; i < boardSquares.length; i++) {
    for (let j = 0; j < boardSquares[i].length; j++) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      square.innerHTML = '';
      square.classList.add('gameSquare');
      playerBoard.appendChild(square);
    }
  }
};

//player obj is the player that is created when the game starts. Not the computer. computer would be computerObj
//cpuBoard is the computers gameBoard. since that is the only one that is receiving attacks from the player clicking on the board.
const renderComputerGameBoard = (cpuBoard, playerObj) => {
  const cpuSquares = cpuBoard.getBoard();
  for (let i = 0; i < cpuSquares.length; i++) {
    for (let j = 0; j < cpuSquares[i].length; j++) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      let cord = square.dataset.cord;
      square.innerHTML = '';
      square.classList.add('gameSquare');
      attackEventListener(square, playerObj, cpuBoard, cord);
      computerBoard.appendChild(square);
    }
  }
};

const attackEventListener = (element, playerObj, enemyBoard, cord) => {
  cord = cord.replaceAll(',', '');
  const strings = [...cord];
  const newCord = [];
  for (var i = 0; i < strings.length; i++) {
    newCord.push(parseInt(strings[i]));
  }
  element.addEventListener('click', () => {
    const [x, y] = newCord;
    playerObj.attack(x, y, enemyBoard);
  });
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
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");


const GameBoard = () => {
  const pastAttacks = [];

  const ships = {};

  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const placeShip = (name, cords) => {
    ships[name] = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(cords.length, name, cords);

    for (let i = 0; i < cords.length; i++) {
      const [x, y] = cords[i];
      board[x][y] = ships[name];
    }
  };

  const getBoard = () => board;

  const _arrayisPresent = (a, b) => {
    a = JSON.stringify(a);
    b = JSON.stringify(b);
    const result = a.indexOf(b);
    if (result != -1) {
      return true;
    } else {
      return false;
    }
  };

  const receiveAttack = (x, y) => {
    const attack = [x, y];
    const pastAttacks = getPastAttacks();
    let attackedShip = board[attack[0]][attack[1]];
    let checkAttack = _arrayisPresent(pastAttacks, attack);

    if (checkAttack === false) {
      if (attackedShip) {
        pastAttacks.push(attack);
        attackedShip.hit(1);
      } else {
        pastAttacks.push(attack);
        console.log(`attackMissed`);
      }
    } else {
      return `this attack has already happened. Try another attack!`;
    }
  };

  const allSunk = () => {
    let results = Object.values(ships);
    const sunkShip = [];
    for (let i = 0; i < results.length; i++) {
      sunkShip.push(results[i].isSunk());
    }
    const checkSunkShips = sunkShip.every((element) => element === true);
    if (checkSunkShips === true) {
      return true;
    } else {
      return false;
    }
  };

  const getPastAttacks = () => pastAttacks;

  const getShips = () => ships;

  return {
    placeShip,
    getPastAttacks,
    receiveAttack,
    allSunk,
    board,
    getBoard,
    getShips,
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
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/modules/gameBoard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _domChanges__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domChanges */ "./src/modules/domChanges.js");
//create the turn based play and logic
//after one player attacks then it goes to the next players turn and so on untill one players ships are all sunk.





const shipSetup = (board) => {
  board.placeShip('carrier', [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  board.placeShip('battleship', [
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
  ]);

  board.placeShip('destroyer', [
    [4, 5],
    [4, 6],
    [4, 7],
  ]);

  board.placeShip('submarine', [
    [4, 8],
    [5, 8],
    [6, 8],
  ]);

  board.placeShip('patrol boat', [
    [9, 2],
    [9, 3],
  ]);
};

const gameSetup = () => {
  //create player and computer objects and boards
  const playerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
  const playerOne = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('Sean');

  const computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
  const cpu = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('computer', true);

  //render the squares on the UI
  (0,_domChanges__WEBPACK_IMPORTED_MODULE_2__.renderComputerGameBoard)(computerBoard, playerOne);
  (0,_domChanges__WEBPACK_IMPORTED_MODULE_2__.renderPlayerGameBoard)(playerBoard);

  //put the ships on the board for the player and computer
  shipSetup(playerBoard);
  shipSetup(computerBoard);
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
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/modules/gameBoard.js");


const Player = (name, isComputer = false) => {
  const attacksSent = [];

  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);

  // make player able to call an attack which uses the gameboard attack
  const attack = (x, y, enemyBoard) => {
    enemyBoard.receiveAttack(x, y);
  };

  const getIsComputer = () => isComputer;
  let playerTurn = true;

  const isTurn = () => playerTurn;

  const _randNum = () => {
    return Math.floor(Math.random() * 10);
  };

  const randomAttack = (enemyBoard, x = _randNum(), y = _randNum()) => {
    const checkAttack = _isPreviousAttack(x, y, getAttacksSent());

    if (checkAttack === true) {
      x = _randNum();
      y = _randNum();
      randomAttack(x, y, enemyBoard);
    } else {
      attacksSent.push([x, y]);
      attack(x, y, enemyBoard);
    }
  };

  const _arrayisPresent = (a, b) => {
    a = JSON.stringify(a);
    b = JSON.stringify(b);
    const result = a.indexOf(b);
    if (result != -1) {
      return true;
    } else {
      return false;
    }
  };

  const _isPreviousAttack = (x, y, pastAttacks) => {
    let attack = [x, y];
    let checkAttack = _arrayisPresent(pastAttacks, attack);
    if (checkAttack === true) {
      return true;
    } else {
      false;
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
const Ship = (length, name, cords, hits = 0, sunk = false) => {
  const hit = (value) => (hits = hits + value);
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
    cords,
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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameLogic.js */ "./src/modules/gameLogic.js");



(0,_modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_1__.gameSetup)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOcUI7QUFDOEI7O0FBRW5ELGdFQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2RvbUNoYW5nZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUxvZ2ljLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWJvYXJkJyk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyLWJvYXJkJyk7XG5cbmNvbnN0IHJlbmRlclBsYXllckdhbWVCb2FyZCA9IChib2FyZCkgPT4ge1xuICBjb25zdCBib2FyZFNxdWFyZXMgPSBib2FyZC5nZXRCb2FyZCgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkU3F1YXJlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRTcXVhcmVzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvcmQgPSBbW2ldLCBbal1dO1xuICAgICAgc3F1YXJlLmlubmVySFRNTCA9ICcnO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2dhbWVTcXVhcmUnKTtcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG59O1xuXG4vL3BsYXllciBvYmogaXMgdGhlIHBsYXllciB0aGF0IGlzIGNyZWF0ZWQgd2hlbiB0aGUgZ2FtZSBzdGFydHMuIE5vdCB0aGUgY29tcHV0ZXIuIGNvbXB1dGVyIHdvdWxkIGJlIGNvbXB1dGVyT2JqXG4vL2NwdUJvYXJkIGlzIHRoZSBjb21wdXRlcnMgZ2FtZUJvYXJkLiBzaW5jZSB0aGF0IGlzIHRoZSBvbmx5IG9uZSB0aGF0IGlzIHJlY2VpdmluZyBhdHRhY2tzIGZyb20gdGhlIHBsYXllciBjbGlja2luZyBvbiB0aGUgYm9hcmQuXG5jb25zdCByZW5kZXJDb21wdXRlckdhbWVCb2FyZCA9IChjcHVCb2FyZCwgcGxheWVyT2JqKSA9PiB7XG4gIGNvbnN0IGNwdVNxdWFyZXMgPSBjcHVCb2FyZC5nZXRCb2FyZCgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNwdVNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNwdVNxdWFyZXNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc3F1YXJlLmRhdGFzZXQuY29yZCA9IFtbaV0sIFtqXV07XG4gICAgICBsZXQgY29yZCA9IHNxdWFyZS5kYXRhc2V0LmNvcmQ7XG4gICAgICBzcXVhcmUuaW5uZXJIVE1MID0gJyc7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnZ2FtZVNxdWFyZScpO1xuICAgICAgYXR0YWNrRXZlbnRMaXN0ZW5lcihzcXVhcmUsIHBsYXllck9iaiwgY3B1Qm9hcmQsIGNvcmQpO1xuICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgYXR0YWNrRXZlbnRMaXN0ZW5lciA9IChlbGVtZW50LCBwbGF5ZXJPYmosIGVuZW15Qm9hcmQsIGNvcmQpID0+IHtcbiAgY29yZCA9IGNvcmQucmVwbGFjZUFsbCgnLCcsICcnKTtcbiAgY29uc3Qgc3RyaW5ncyA9IFsuLi5jb3JkXTtcbiAgY29uc3QgbmV3Q29yZCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICBuZXdDb3JkLnB1c2gocGFyc2VJbnQoc3RyaW5nc1tpXSkpO1xuICB9XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgW3gsIHldID0gbmV3Q29yZDtcbiAgICBwbGF5ZXJPYmouYXR0YWNrKHgsIHksIGVuZW15Qm9hcmQpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IHJlbmRlclBsYXllckdhbWVCb2FyZCwgcmVuZGVyQ29tcHV0ZXJHYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHBhc3RBdHRhY2tzID0gW107XG5cbiAgY29uc3Qgc2hpcHMgPSB7fTtcblxuICBjb25zdCBib2FyZCA9IFtcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gIF07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKG5hbWUsIGNvcmRzKSA9PiB7XG4gICAgc2hpcHNbbmFtZV0gPSBTaGlwKGNvcmRzLmxlbmd0aCwgbmFtZSwgY29yZHMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgW3gsIHldID0gY29yZHNbaV07XG4gICAgICBib2FyZFt4XVt5XSA9IHNoaXBzW25hbWVdO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIGNvbnN0IF9hcnJheWlzUHJlc2VudCA9IChhLCBiKSA9PiB7XG4gICAgYSA9IEpTT04uc3RyaW5naWZ5KGEpO1xuICAgIGIgPSBKU09OLnN0cmluZ2lmeShiKTtcbiAgICBjb25zdCByZXN1bHQgPSBhLmluZGV4T2YoYik7XG4gICAgaWYgKHJlc3VsdCAhPSAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3QgYXR0YWNrID0gW3gsIHldO1xuICAgIGNvbnN0IHBhc3RBdHRhY2tzID0gZ2V0UGFzdEF0dGFja3MoKTtcbiAgICBsZXQgYXR0YWNrZWRTaGlwID0gYm9hcmRbYXR0YWNrWzBdXVthdHRhY2tbMV1dO1xuICAgIGxldCBjaGVja0F0dGFjayA9IF9hcnJheWlzUHJlc2VudChwYXN0QXR0YWNrcywgYXR0YWNrKTtcblxuICAgIGlmIChjaGVja0F0dGFjayA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChhdHRhY2tlZFNoaXApIHtcbiAgICAgICAgcGFzdEF0dGFja3MucHVzaChhdHRhY2spO1xuICAgICAgICBhdHRhY2tlZFNoaXAuaGl0KDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFzdEF0dGFja3MucHVzaChhdHRhY2spO1xuICAgICAgICBjb25zb2xlLmxvZyhgYXR0YWNrTWlzc2VkYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgdGhpcyBhdHRhY2sgaGFzIGFscmVhZHkgaGFwcGVuZWQuIFRyeSBhbm90aGVyIGF0dGFjayFgO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgIGxldCByZXN1bHRzID0gT2JqZWN0LnZhbHVlcyhzaGlwcyk7XG4gICAgY29uc3Qgc3Vua1NoaXAgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN1bmtTaGlwLnB1c2gocmVzdWx0c1tpXS5pc1N1bmsoKSk7XG4gICAgfVxuICAgIGNvbnN0IGNoZWNrU3Vua1NoaXBzID0gc3Vua1NoaXAuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IHRydWUpO1xuICAgIGlmIChjaGVja1N1bmtTaGlwcyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0UGFzdEF0dGFja3MgPSAoKSA9PiBwYXN0QXR0YWNrcztcblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHNoaXBzO1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGdldFBhc3RBdHRhY2tzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU3VuayxcbiAgICBib2FyZCxcbiAgICBnZXRCb2FyZCxcbiAgICBnZXRTaGlwcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiLy9jcmVhdGUgdGhlIHR1cm4gYmFzZWQgcGxheSBhbmQgbG9naWNcbi8vYWZ0ZXIgb25lIHBsYXllciBhdHRhY2tzIHRoZW4gaXQgZ29lcyB0byB0aGUgbmV4dCBwbGF5ZXJzIHR1cm4gYW5kIHNvIG9uIHVudGlsbCBvbmUgcGxheWVycyBzaGlwcyBhcmUgYWxsIHN1bmsuXG5cbmltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gJy4vZ2FtZUJvYXJkJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkLCByZW5kZXJQbGF5ZXJHYW1lQm9hcmQgfSBmcm9tICcuL2RvbUNoYW5nZXMnO1xuXG5jb25zdCBzaGlwU2V0dXAgPSAoYm9hcmQpID0+IHtcbiAgYm9hcmQucGxhY2VTaGlwKCdjYXJyaWVyJywgW1xuICAgIFswLCAwXSxcbiAgICBbMCwgMV0sXG4gICAgWzAsIDJdLFxuICAgIFswLCAzXSxcbiAgICBbMCwgNF0sXG4gIF0pO1xuXG4gIGJvYXJkLnBsYWNlU2hpcCgnYmF0dGxlc2hpcCcsIFtcbiAgICBbNiwgMF0sXG4gICAgWzcsIDBdLFxuICAgIFs4LCAwXSxcbiAgICBbOSwgMF0sXG4gIF0pO1xuXG4gIGJvYXJkLnBsYWNlU2hpcCgnZGVzdHJveWVyJywgW1xuICAgIFs0LCA1XSxcbiAgICBbNCwgNl0sXG4gICAgWzQsIDddLFxuICBdKTtcblxuICBib2FyZC5wbGFjZVNoaXAoJ3N1Ym1hcmluZScsIFtcbiAgICBbNCwgOF0sXG4gICAgWzUsIDhdLFxuICAgIFs2LCA4XSxcbiAgXSk7XG5cbiAgYm9hcmQucGxhY2VTaGlwKCdwYXRyb2wgYm9hdCcsIFtcbiAgICBbOSwgMl0sXG4gICAgWzksIDNdLFxuICBdKTtcbn07XG5cbmNvbnN0IGdhbWVTZXR1cCA9ICgpID0+IHtcbiAgLy9jcmVhdGUgcGxheWVyIGFuZCBjb21wdXRlciBvYmplY3RzIGFuZCBib2FyZHNcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgY29uc3QgcGxheWVyT25lID0gUGxheWVyKCdTZWFuJyk7XG5cbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBjb25zdCBjcHUgPSBQbGF5ZXIoJ2NvbXB1dGVyJywgdHJ1ZSk7XG5cbiAgLy9yZW5kZXIgdGhlIHNxdWFyZXMgb24gdGhlIFVJXG4gIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkKGNvbXB1dGVyQm9hcmQsIHBsYXllck9uZSk7XG4gIHJlbmRlclBsYXllckdhbWVCb2FyZChwbGF5ZXJCb2FyZCk7XG5cbiAgLy9wdXQgdGhlIHNoaXBzIG9uIHRoZSBib2FyZCBmb3IgdGhlIHBsYXllciBhbmQgY29tcHV0ZXJcbiAgc2hpcFNldHVwKHBsYXllckJvYXJkKTtcbiAgc2hpcFNldHVwKGNvbXB1dGVyQm9hcmQpO1xufTtcblxuZXhwb3J0IHsgZ2FtZVNldHVwIH07XG4iLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL2dhbWVCb2FyZCc7XG5cbmNvbnN0IFBsYXllciA9IChuYW1lLCBpc0NvbXB1dGVyID0gZmFsc2UpID0+IHtcbiAgY29uc3QgYXR0YWNrc1NlbnQgPSBbXTtcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT5cbiAgICBwbGF5ZXJUdXJuID09PSB0cnVlID8gKHBsYXllclR1cm4gPSBmYWxzZSkgOiAocGxheWVyVHVybiA9IHRydWUpO1xuXG4gIC8vIG1ha2UgcGxheWVyIGFibGUgdG8gY2FsbCBhbiBhdHRhY2sgd2hpY2ggdXNlcyB0aGUgZ2FtZWJvYXJkIGF0dGFja1xuICBjb25zdCBhdHRhY2sgPSAoeCwgeSwgZW5lbXlCb2FyZCkgPT4ge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgfTtcblxuICBjb25zdCBnZXRJc0NvbXB1dGVyID0gKCkgPT4gaXNDb21wdXRlcjtcbiAgbGV0IHBsYXllclR1cm4gPSB0cnVlO1xuXG4gIGNvbnN0IGlzVHVybiA9ICgpID0+IHBsYXllclR1cm47XG5cbiAgY29uc3QgX3JhbmROdW0gPSAoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgfTtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSAoZW5lbXlCb2FyZCwgeCA9IF9yYW5kTnVtKCksIHkgPSBfcmFuZE51bSgpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tBdHRhY2sgPSBfaXNQcmV2aW91c0F0dGFjayh4LCB5LCBnZXRBdHRhY2tzU2VudCgpKTtcblxuICAgIGlmIChjaGVja0F0dGFjayA9PT0gdHJ1ZSkge1xuICAgICAgeCA9IF9yYW5kTnVtKCk7XG4gICAgICB5ID0gX3JhbmROdW0oKTtcbiAgICAgIHJhbmRvbUF0dGFjayh4LCB5LCBlbmVteUJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0YWNrc1NlbnQucHVzaChbeCwgeV0pO1xuICAgICAgYXR0YWNrKHgsIHksIGVuZW15Qm9hcmQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBfYXJyYXlpc1ByZXNlbnQgPSAoYSwgYikgPT4ge1xuICAgIGEgPSBKU09OLnN0cmluZ2lmeShhKTtcbiAgICBiID0gSlNPTi5zdHJpbmdpZnkoYik7XG4gICAgY29uc3QgcmVzdWx0ID0gYS5pbmRleE9mKGIpO1xuICAgIGlmIChyZXN1bHQgIT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IF9pc1ByZXZpb3VzQXR0YWNrID0gKHgsIHksIHBhc3RBdHRhY2tzKSA9PiB7XG4gICAgbGV0IGF0dGFjayA9IFt4LCB5XTtcbiAgICBsZXQgY2hlY2tBdHRhY2sgPSBfYXJyYXlpc1ByZXNlbnQocGFzdEF0dGFja3MsIGF0dGFjayk7XG4gICAgaWYgKGNoZWNrQXR0YWNrID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEF0dGFja3NTZW50ID0gKCkgPT4gYXR0YWNrc1NlbnQ7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBpc1R1cm4sXG4gICAgY2hhbmdlVHVybixcbiAgICBhdHRhY2ssXG4gICAgZ2V0SXNDb21wdXRlcixcbiAgICByYW5kb21BdHRhY2ssXG4gICAgZ2V0QXR0YWNrc1NlbnQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBuYW1lLCBjb3JkcywgaGl0cyA9IDAsIHN1bmsgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBoaXQgPSAodmFsdWUpID0+IChoaXRzID0gaGl0cyArIHZhbHVlKTtcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHM7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0U3VuayA9ICgpID0+IHN1bms7XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5ndGggPSBnZXRMZW5ndGgoKTtcbiAgICBjb25zdCBjdXJyZW50SGl0cyA9IGdldEhpdHMoKTtcbiAgICBpZiAoY3VycmVudEhpdHMgPj0gY3VycmVudExlbmd0aCkge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1bmsgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFN1bmsoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGhpdCxcbiAgICBnZXRIaXRzLFxuICAgIGlzU3VuayxcbiAgICBjb3JkcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBnYW1lU2V0dXAgfSBmcm9tICcuL21vZHVsZXMvZ2FtZUxvZ2ljLmpzJztcblxuZ2FtZVNldHVwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=