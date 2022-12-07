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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZFQUFxQjtBQUNyQiwrRUFBdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tQ2hhbmdlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lTG9naWMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpO1xuXG5jb25zdCByZW5kZXJQbGF5ZXJHYW1lQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgYm9hcmRTcXVhcmVzID0gYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZFNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkU3F1YXJlc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzcXVhcmUuZGF0YXNldC5jb3JkID0gW1tpXSwgW2pdXTtcbiAgICAgIHNxdWFyZS5pbm5lckhUTUwgPSAnJztcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdnYW1lU3F1YXJlJyk7XG4gICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxufTtcblxuLy9wbGF5ZXIgb2JqIGlzIHRoZSBwbGF5ZXIgdGhhdCBpcyBjcmVhdGVkIHdoZW4gdGhlIGdhbWUgc3RhcnRzLiBOb3QgdGhlIGNvbXB1dGVyLiBjb21wdXRlciB3b3VsZCBiZSBjb21wdXRlck9ialxuLy9jcHVCb2FyZCBpcyB0aGUgY29tcHV0ZXJzIGdhbWVCb2FyZC4gc2luY2UgdGhhdCBpcyB0aGUgb25seSBvbmUgdGhhdCBpcyByZWNlaXZpbmcgYXR0YWNrcyBmcm9tIHRoZSBwbGF5ZXIgY2xpY2tpbmcgb24gdGhlIGJvYXJkLlxuY29uc3QgcmVuZGVyQ29tcHV0ZXJHYW1lQm9hcmQgPSAoY3B1Qm9hcmQsIHBsYXllck9iaikgPT4ge1xuICBjb25zdCBjcHVTcXVhcmVzID0gY3B1Qm9hcmQuZ2V0Qm9hcmQoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcHVTcXVhcmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjcHVTcXVhcmVzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvcmQgPSBbW2ldLCBbal1dO1xuICAgICAgbGV0IGNvcmQgPSBzcXVhcmUuZGF0YXNldC5jb3JkO1xuICAgICAgc3F1YXJlLmlubmVySFRNTCA9ICcnO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2dhbWVTcXVhcmUnKTtcbiAgICAgIGF0dGFja0V2ZW50TGlzdGVuZXIoc3F1YXJlLCBwbGF5ZXJPYmosIGNwdUJvYXJkLCBjb3JkKTtcbiAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGF0dGFja0V2ZW50TGlzdGVuZXIgPSAoZWxlbWVudCwgcGxheWVyT2JqLCBlbmVteUJvYXJkLCBjb3JkKSA9PiB7XG4gIGNvcmQgPSBjb3JkLnJlcGxhY2VBbGwoJywnLCAnJyk7XG4gIGNvbnN0IHN0cmluZ3MgPSBbLi4uY29yZF07XG4gIGNvbnN0IG5ld0NvcmQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgbmV3Q29yZC5wdXNoKHBhcnNlSW50KHN0cmluZ3NbaV0pKTtcbiAgfVxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IFt4LCB5XSA9IG5ld0NvcmQ7XG4gICAgcGxheWVyT2JqLmF0dGFjayh4LCB5LCBlbmVteUJvYXJkKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyByZW5kZXJQbGF5ZXJHYW1lQm9hcmQsIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBwYXN0QXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHNoaXBzID0ge307XG5cbiAgY29uc3QgYm9hcmQgPSBbXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICBdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChuYW1lLCBjb3JkcykgPT4ge1xuICAgIHNoaXBzW25hbWVdID0gU2hpcChjb3Jkcy5sZW5ndGgsIG5hbWUsIGNvcmRzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IGNvcmRzW2ldO1xuICAgICAgYm9hcmRbeF1beV0gPSBzaGlwc1tuYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICBjb25zdCBfYXJyYXlpc1ByZXNlbnQgPSAoYSwgYikgPT4ge1xuICAgIGEgPSBKU09OLnN0cmluZ2lmeShhKTtcbiAgICBiID0gSlNPTi5zdHJpbmdpZnkoYik7XG4gICAgY29uc3QgcmVzdWx0ID0gYS5pbmRleE9mKGIpO1xuICAgIGlmIChyZXN1bHQgIT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IGF0dGFjayA9IFt4LCB5XTtcbiAgICBjb25zdCBwYXN0QXR0YWNrcyA9IGdldFBhc3RBdHRhY2tzKCk7XG4gICAgbGV0IGF0dGFja2VkU2hpcCA9IGJvYXJkW2F0dGFja1swXV1bYXR0YWNrWzFdXTtcbiAgICBsZXQgY2hlY2tBdHRhY2sgPSBfYXJyYXlpc1ByZXNlbnQocGFzdEF0dGFja3MsIGF0dGFjayk7XG5cbiAgICBpZiAoY2hlY2tBdHRhY2sgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICAgIHBhc3RBdHRhY2tzLnB1c2goYXR0YWNrKTtcbiAgICAgICAgYXR0YWNrZWRTaGlwLmhpdCgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhc3RBdHRhY2tzLnB1c2goYXR0YWNrKTtcbiAgICAgICAgY29uc29sZS5sb2coYGF0dGFja01pc3NlZGApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYHRoaXMgYXR0YWNrIGhhcyBhbHJlYWR5IGhhcHBlbmVkLiBUcnkgYW5vdGhlciBhdHRhY2shYDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWxsU3VuayA9ICgpID0+IHtcbiAgICBsZXQgcmVzdWx0cyA9IE9iamVjdC52YWx1ZXMoc2hpcHMpO1xuICAgIGNvbnN0IHN1bmtTaGlwID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdW5rU2hpcC5wdXNoKHJlc3VsdHNbaV0uaXNTdW5rKCkpO1xuICAgIH1cbiAgICBjb25zdCBjaGVja1N1bmtTaGlwcyA9IHN1bmtTaGlwLmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ID09PSB0cnVlKTtcbiAgICBpZiAoY2hlY2tTdW5rU2hpcHMgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFBhc3RBdHRhY2tzID0gKCkgPT4gcGFzdEF0dGFja3M7XG5cbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBzaGlwcztcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICBnZXRQYXN0QXR0YWNrcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFN1bmssXG4gICAgYm9hcmQsXG4gICAgZ2V0Qm9hcmQsXG4gICAgZ2V0U2hpcHMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lQm9hcmQgfTtcbiIsIlxuIiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSAnLi9nYW1lQm9hcmQnO1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSwgaXNDb21wdXRlciA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGF0dGFja3NTZW50ID0gW107XG5cbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+XG4gICAgcGxheWVyVHVybiA9PT0gdHJ1ZSA/IChwbGF5ZXJUdXJuID0gZmFsc2UpIDogKHBsYXllclR1cm4gPSB0cnVlKTtcblxuICAvLyBtYWtlIHBsYXllciBhYmxlIHRvIGNhbGwgYW4gYXR0YWNrIHdoaWNoIHVzZXMgdGhlIGdhbWVib2FyZCBhdHRhY2tcbiAgY29uc3QgYXR0YWNrID0gKHgsIHksIGVuZW15Qm9hcmQpID0+IHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0SXNDb21wdXRlciA9ICgpID0+IGlzQ29tcHV0ZXI7XG4gIGxldCBwbGF5ZXJUdXJuID0gdHJ1ZTtcblxuICBjb25zdCBpc1R1cm4gPSAoKSA9PiBwbGF5ZXJUdXJuO1xuXG4gIGNvbnN0IF9yYW5kTnVtID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIH07XG5cbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gKGVuZW15Qm9hcmQsIHggPSBfcmFuZE51bSgpLCB5ID0gX3JhbmROdW0oKSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrQXR0YWNrID0gX2lzUHJldmlvdXNBdHRhY2soeCwgeSwgZ2V0QXR0YWNrc1NlbnQoKSk7XG5cbiAgICBpZiAoY2hlY2tBdHRhY2sgPT09IHRydWUpIHtcbiAgICAgIHggPSBfcmFuZE51bSgpO1xuICAgICAgeSA9IF9yYW5kTnVtKCk7XG4gICAgICByYW5kb21BdHRhY2soeCwgeSwgZW5lbXlCb2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF0dGFja3NTZW50LnB1c2goW3gsIHldKTtcbiAgICAgIGF0dGFjayh4LCB5LCBlbmVteUJvYXJkKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgX2FycmF5aXNQcmVzZW50ID0gKGEsIGIpID0+IHtcbiAgICBhID0gSlNPTi5zdHJpbmdpZnkoYSk7XG4gICAgYiA9IEpTT04uc3RyaW5naWZ5KGIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGEuaW5kZXhPZihiKTtcbiAgICBpZiAocmVzdWx0ICE9IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBfaXNQcmV2aW91c0F0dGFjayA9ICh4LCB5LCBwYXN0QXR0YWNrcykgPT4ge1xuICAgIGxldCBhdHRhY2sgPSBbeCwgeV07XG4gICAgbGV0IGNoZWNrQXR0YWNrID0gX2FycmF5aXNQcmVzZW50KHBhc3RBdHRhY2tzLCBhdHRhY2spO1xuICAgIGlmIChjaGVja0F0dGFjayA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRBdHRhY2tzU2VudCA9ICgpID0+IGF0dGFja3NTZW50O1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgaXNUdXJuLFxuICAgIGNoYW5nZVR1cm4sXG4gICAgYXR0YWNrLFxuICAgIGdldElzQ29tcHV0ZXIsXG4gICAgcmFuZG9tQXR0YWNrLFxuICAgIGdldEF0dGFja3NTZW50LFxuICB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCwgbmFtZSwgY29yZHMsIGhpdHMgPSAwLCBzdW5rID0gZmFsc2UpID0+IHtcbiAgY29uc3QgaGl0ID0gKHZhbHVlKSA9PiAoaGl0cyA9IGhpdHMgKyB2YWx1ZSk7XG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldFN1bmsgPSAoKSA9PiBzdW5rO1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgY3VycmVudEhpdHMgPSBnZXRIaXRzKCk7XG4gICAgaWYgKGN1cnJlbnRIaXRzID49IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdW5rID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBnZXRTdW5rKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGdldExlbmd0aCxcbiAgICBoaXQsXG4gICAgZ2V0SGl0cyxcbiAgICBpc1N1bmssXG4gICAgY29yZHMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSAnLi9tb2R1bGVzL2dhbWVCb2FyZC5qcyc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9tb2R1bGVzL3NoaXAuanMnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9tb2R1bGVzL3BsYXllci5qcyc7XG5pbXBvcnQgeyBnYW1lU2V0dXAgfSBmcm9tICcuL21vZHVsZXMvZ2FtZUxvZ2ljLmpzJztcblxuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQge1xuICByZW5kZXJDb21wdXRlckdhbWVCb2FyZCxcbiAgcmVuZGVyUGxheWVyR2FtZUJvYXJkLFxufSBmcm9tICcuL21vZHVsZXMvZG9tQ2hhbmdlcy5qcyc7XG5jb25zdCB0ZXN0R2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlclRlc3RHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcbmNvbnN0IHRlc3RQbGF5ZXIgPSBQbGF5ZXIoJ0V6c2VhbicpO1xuY29uc3QgdGVzdENvbXB1dGVyUGxheWVyID0gUGxheWVyKCd0ZXN0Q29tcHV0ZXInLCB0cnVlKTtcbnRlc3RHYW1lQm9hcmQucGxhY2VTaGlwKCdjYXJyaWVyJywgW1xuICBbMCwgMF0sXG4gIFswLCAxXSxcbiAgWzAsIDJdLFxuICBbMCwgM10sXG4gIFswLCA0XSxcbl0pO1xuXG5yZW5kZXJQbGF5ZXJHYW1lQm9hcmQodGVzdEdhbWVCb2FyZCk7XG5yZW5kZXJDb21wdXRlckdhbWVCb2FyZChjb21wdXRlclRlc3RHYW1lQm9hcmQsIHRlc3RQbGF5ZXIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9