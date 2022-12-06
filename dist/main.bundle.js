/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/domChanges.js":
/*!***********************************!*\
  !*** ./src/modules/domChanges.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
/***/ (() => {




/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameBoard.js */ "./src/modules/gameBoard.js");
/* harmony import */ var _modules_ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ship.js */ "./src/modules/ship.js");
/* harmony import */ var _modules_player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player.js */ "./src/modules/player.js");
/* harmony import */ var _modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/gameLogic.js */ "./src/modules/gameLogic.js");
/* harmony import */ var _modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_domChanges_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/domChanges.js */ "./src/modules/domChanges.js");







const testGameBoard = (0,_modules_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
const computerTestGameBoard = (0,_modules_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
const testPlayer = (0,_modules_player_js__WEBPACK_IMPORTED_MODULE_2__.Player)('Ezsean');
const testComputerPlayer = (0,_modules_player_js__WEBPACK_IMPORTED_MODULE_2__.Player)('testComputer', true);
testGameBoard.placeShip('carrier', [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]);

(0,_modules_domChanges_js__WEBPACK_IMPORTED_MODULE_5__.renderPlayerGameBoard)(testGameBoard);
(0,_modules_domChanges_js__WEBPACK_IMPORTED_MODULE_5__.renderComputerGameBoard)(computerTestGameBoard, testPlayer);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZFQUFxQjtBQUNyQiwrRUFBdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tQ2hhbmdlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItYm9hcmQnKTtcblxuY29uc3QgcmVuZGVyUGxheWVyR2FtZUJvYXJkID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGJvYXJkU3F1YXJlcyA9IGJvYXJkLmdldEJvYXJkKCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmRTcXVhcmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZFNxdWFyZXNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc3F1YXJlLmRhdGFzZXQuY29yZCA9IFtbaV0sIFtqXV07XG4gICAgICBzcXVhcmUuaW5uZXJIVE1MID0gJyc7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnZ2FtZVNxdWFyZScpO1xuICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vcGxheWVyIG9iaiBpcyB0aGUgcGxheWVyIHRoYXQgaXMgY3JlYXRlZCB3aGVuIHRoZSBnYW1lIHN0YXJ0cy4gTm90IHRoZSBjb21wdXRlci4gY29tcHV0ZXIgd291bGQgYmUgY29tcHV0ZXJPYmpcbi8vY3B1Qm9hcmQgaXMgdGhlIGNvbXB1dGVycyBnYW1lQm9hcmQuIHNpbmNlIHRoYXQgaXMgdGhlIG9ubHkgb25lIHRoYXQgaXMgcmVjZWl2aW5nIGF0dGFja3MgZnJvbSB0aGUgcGxheWVyIGNsaWNraW5nIG9uIHRoZSBib2FyZC5cbmNvbnN0IHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkID0gKGNwdUJvYXJkLCBwbGF5ZXJPYmopID0+IHtcbiAgY29uc3QgY3B1U3F1YXJlcyA9IGNwdUJvYXJkLmdldEJvYXJkKCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3B1U3F1YXJlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY3B1U3F1YXJlc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzcXVhcmUuZGF0YXNldC5jb3JkID0gW1tpXSwgW2pdXTtcbiAgICAgIGxldCBjb3JkID0gc3F1YXJlLmRhdGFzZXQuY29yZDtcbiAgICAgIHNxdWFyZS5pbm5lckhUTUwgPSAnJztcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdnYW1lU3F1YXJlJyk7XG4gICAgICBhdHRhY2tFdmVudExpc3RlbmVyKHNxdWFyZSwgcGxheWVyT2JqLCBjcHVCb2FyZCwgY29yZCk7XG4gICAgICBjb21wdXRlckJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBhdHRhY2tFdmVudExpc3RlbmVyID0gKGVsZW1lbnQsIHBsYXllck9iaiwgZW5lbXlCb2FyZCwgY29yZCkgPT4ge1xuICBjb3JkID0gY29yZC5yZXBsYWNlQWxsKCcsJywgJycpO1xuICBjb25zdCBzdHJpbmdzID0gWy4uLmNvcmRdO1xuICBjb25zdCBuZXdDb3JkID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIG5ld0NvcmQucHVzaChwYXJzZUludChzdHJpbmdzW2ldKSk7XG4gIH1cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBbeCwgeV0gPSBuZXdDb3JkO1xuICAgIHBsYXllck9iai5hdHRhY2soeCwgeSwgZW5lbXlCb2FyZCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgcmVuZGVyUGxheWVyR2FtZUJvYXJkLCByZW5kZXJDb21wdXRlckdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IEdhbWVCb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgcGFzdEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBzaGlwcyA9IHt9O1xuXG4gIGNvbnN0IGJvYXJkID0gW1xuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAobmFtZSwgY29yZHMpID0+IHtcbiAgICBzaGlwc1tuYW1lXSA9IFNoaXAoY29yZHMubGVuZ3RoLCBuYW1lLCBjb3Jkcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBjb3Jkc1tpXTtcbiAgICAgIGJvYXJkW3hdW3ldID0gc2hpcHNbbmFtZV07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgX2FycmF5aXNQcmVzZW50ID0gKGEsIGIpID0+IHtcbiAgICBhID0gSlNPTi5zdHJpbmdpZnkoYSk7XG4gICAgYiA9IEpTT04uc3RyaW5naWZ5KGIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGEuaW5kZXhPZihiKTtcbiAgICBpZiAocmVzdWx0ICE9IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBhdHRhY2sgPSBbeCwgeV07XG4gICAgY29uc3QgcGFzdEF0dGFja3MgPSBnZXRQYXN0QXR0YWNrcygpO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBib2FyZFthdHRhY2tbMF1dW2F0dGFja1sxXV07XG4gICAgbGV0IGNoZWNrQXR0YWNrID0gX2FycmF5aXNQcmVzZW50KHBhc3RBdHRhY2tzLCBhdHRhY2spO1xuXG4gICAgaWYgKGNoZWNrQXR0YWNrID09PSBmYWxzZSkge1xuICAgICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgICBwYXN0QXR0YWNrcy5wdXNoKGF0dGFjayk7XG4gICAgICAgIGF0dGFja2VkU2hpcC5oaXQoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXN0QXR0YWNrcy5wdXNoKGF0dGFjayk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBhdHRhY2tNaXNzZWRgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGB0aGlzIGF0dGFjayBoYXMgYWxyZWFkeSBoYXBwZW5lZC4gVHJ5IGFub3RoZXIgYXR0YWNrIWA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHJlc3VsdHMgPSBPYmplY3QudmFsdWVzKHNoaXBzKTtcbiAgICBjb25zdCBzdW5rU2hpcCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgc3Vua1NoaXAucHVzaChyZXN1bHRzW2ldLmlzU3VuaygpKTtcbiAgICB9XG4gICAgY29uc3QgY2hlY2tTdW5rU2hpcHMgPSBzdW5rU2hpcC5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gdHJ1ZSk7XG4gICAgaWYgKGNoZWNrU3Vua1NoaXBzID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRQYXN0QXR0YWNrcyA9ICgpID0+IHBhc3RBdHRhY2tzO1xuXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4gc2hpcHM7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgZ2V0UGFzdEF0dGFja3MsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTdW5rLFxuICAgIGJvYXJkLFxuICAgIGdldEJvYXJkLFxuICAgIGdldFNoaXBzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL2dhbWVCb2FyZCc7XG5cbmNvbnN0IFBsYXllciA9IChuYW1lLCBpc0NvbXB1dGVyID0gZmFsc2UpID0+IHtcbiAgY29uc3QgYXR0YWNrc1NlbnQgPSBbXTtcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT5cbiAgICBwbGF5ZXJUdXJuID09PSB0cnVlID8gKHBsYXllclR1cm4gPSBmYWxzZSkgOiAocGxheWVyVHVybiA9IHRydWUpO1xuXG4gIC8vIG1ha2UgcGxheWVyIGFibGUgdG8gY2FsbCBhbiBhdHRhY2sgd2hpY2ggdXNlcyB0aGUgZ2FtZWJvYXJkIGF0dGFja1xuICBjb25zdCBhdHRhY2sgPSAoeCwgeSwgZW5lbXlCb2FyZCkgPT4ge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgfTtcblxuICBjb25zdCBnZXRJc0NvbXB1dGVyID0gKCkgPT4gaXNDb21wdXRlcjtcbiAgbGV0IHBsYXllclR1cm4gPSB0cnVlO1xuXG4gIGNvbnN0IGlzVHVybiA9ICgpID0+IHBsYXllclR1cm47XG5cbiAgY29uc3QgX3JhbmROdW0gPSAoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgfTtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSAoZW5lbXlCb2FyZCwgeCA9IF9yYW5kTnVtKCksIHkgPSBfcmFuZE51bSgpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tBdHRhY2sgPSBfaXNQcmV2aW91c0F0dGFjayh4LCB5LCBnZXRBdHRhY2tzU2VudCgpKTtcblxuICAgIGlmIChjaGVja0F0dGFjayA9PT0gdHJ1ZSkge1xuICAgICAgeCA9IF9yYW5kTnVtKCk7XG4gICAgICB5ID0gX3JhbmROdW0oKTtcbiAgICAgIHJhbmRvbUF0dGFjayh4LCB5LCBlbmVteUJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0YWNrc1NlbnQucHVzaChbeCwgeV0pO1xuICAgICAgYXR0YWNrKHgsIHksIGVuZW15Qm9hcmQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBfYXJyYXlpc1ByZXNlbnQgPSAoYSwgYikgPT4ge1xuICAgIGEgPSBKU09OLnN0cmluZ2lmeShhKTtcbiAgICBiID0gSlNPTi5zdHJpbmdpZnkoYik7XG4gICAgY29uc3QgcmVzdWx0ID0gYS5pbmRleE9mKGIpO1xuICAgIGlmIChyZXN1bHQgIT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IF9pc1ByZXZpb3VzQXR0YWNrID0gKHgsIHksIHBhc3RBdHRhY2tzKSA9PiB7XG4gICAgbGV0IGF0dGFjayA9IFt4LCB5XTtcbiAgICBsZXQgY2hlY2tBdHRhY2sgPSBfYXJyYXlpc1ByZXNlbnQocGFzdEF0dGFja3MsIGF0dGFjayk7XG4gICAgaWYgKGNoZWNrQXR0YWNrID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEF0dGFja3NTZW50ID0gKCkgPT4gYXR0YWNrc1NlbnQ7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBpc1R1cm4sXG4gICAgY2hhbmdlVHVybixcbiAgICBhdHRhY2ssXG4gICAgZ2V0SXNDb21wdXRlcixcbiAgICByYW5kb21BdHRhY2ssXG4gICAgZ2V0QXR0YWNrc1NlbnQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBuYW1lLCBjb3JkcywgaGl0cyA9IDAsIHN1bmsgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBoaXQgPSAodmFsdWUpID0+IChoaXRzID0gaGl0cyArIHZhbHVlKTtcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHM7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0U3VuayA9ICgpID0+IHN1bms7XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5ndGggPSBnZXRMZW5ndGgoKTtcbiAgICBjb25zdCBjdXJyZW50SGl0cyA9IGdldEhpdHMoKTtcbiAgICBpZiAoY3VycmVudEhpdHMgPj0gY3VycmVudExlbmd0aCkge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1bmsgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFN1bmsoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGhpdCxcbiAgICBnZXRIaXRzLFxuICAgIGlzU3VuayxcbiAgICBjb3JkcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL21vZHVsZXMvZ2FtZUJvYXJkLmpzJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL21vZHVsZXMvc2hpcC5qcyc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL21vZHVsZXMvcGxheWVyLmpzJztcbmltcG9ydCB7IGdhbWVTZXR1cCB9IGZyb20gJy4vbW9kdWxlcy9nYW1lTG9naWMuanMnO1xuXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7XG4gIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkLFxuICByZW5kZXJQbGF5ZXJHYW1lQm9hcmQsXG59IGZyb20gJy4vbW9kdWxlcy9kb21DaGFuZ2VzLmpzJztcbmNvbnN0IHRlc3RHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyVGVzdEdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuY29uc3QgdGVzdFBsYXllciA9IFBsYXllcignRXpzZWFuJyk7XG5jb25zdCB0ZXN0Q29tcHV0ZXJQbGF5ZXIgPSBQbGF5ZXIoJ3Rlc3RDb21wdXRlcicsIHRydWUpO1xudGVzdEdhbWVCb2FyZC5wbGFjZVNoaXAoJ2NhcnJpZXInLCBbXG4gIFswLCAwXSxcbiAgWzAsIDFdLFxuICBbMCwgMl0sXG4gIFswLCAzXSxcbiAgWzAsIDRdLFxuXSk7XG5cbnJlbmRlclBsYXllckdhbWVCb2FyZCh0ZXN0R2FtZUJvYXJkKTtcbnJlbmRlckNvbXB1dGVyR2FtZUJvYXJkKGNvbXB1dGVyVGVzdEdhbWVCb2FyZCwgdGVzdFBsYXllcik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=