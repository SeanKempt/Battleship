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

  const ships = {
    battleship: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(4, 'battleship', [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ]),
    destroyer: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(3, 'destroyer', [
      [4, 5],
      [4, 6],
      [4, 7],
    ]),
    submarine: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(3, 'submarine', [
      [4, 8],
      [5, 8],
      [6, 8],
    ]),
    patrolBoat: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(2, 'patrol boat', [
      [9, 2],
      [9, 3],
    ]),
  };

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

  const allSunk = () => {};

  const getPastAttacks = () => pastAttacks;

  const getShipsOnBoard = () => shipsOnBoard;

  return {
    placeShip,
    getPastAttacks,
    receiveAttack,
    allSunk,
    board,
    getBoard,
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
const Player = (name, isComputer = false) => {
  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);

  const attack = () => {};

  const getIsComputer = () => isComputer;
  let playerTurn = true;

  const isTurn = () => playerTurn;

  const _randNum = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const randomAttack = (gameBoard) => {};

  const isPreviousAttack = () => {};

  const getAttacksSent = () => attacksSent;
  return {
    name,
    isTurn,
    changeTurn,
    attack,
    getIsComputer,
    randomAttack,
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






const testGameBoard = (0,_modules_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
testGameBoard.placeShip('carrier', [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]);
console.log(testGameBoard.getBoard());
console.log(testGameBoard.receiveAttack(0, 0));
console.log(testGameBoard.getPastAttacks());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBOEI7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsMkNBQUk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkNBQUk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDJDQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJDQUFJO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQiwyQ0FBSTs7QUFFdEIsb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsR3JCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWdCOzs7Ozs7O1VDM0JoQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBQ1Y7QUFDSTtBQUNNOztBQUU5QjtBQUNyQixzQkFBc0IsZ0VBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBwYXN0QXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHNoaXBzID0ge1xuICAgIGJhdHRsZXNoaXA6IFNoaXAoNCwgJ2JhdHRsZXNoaXAnLCBbXG4gICAgICBbNiwgMF0sXG4gICAgICBbNywgMF0sXG4gICAgICBbOCwgMF0sXG4gICAgICBbOSwgMF0sXG4gICAgXSksXG4gICAgZGVzdHJveWVyOiBTaGlwKDMsICdkZXN0cm95ZXInLCBbXG4gICAgICBbNCwgNV0sXG4gICAgICBbNCwgNl0sXG4gICAgICBbNCwgN10sXG4gICAgXSksXG4gICAgc3VibWFyaW5lOiBTaGlwKDMsICdzdWJtYXJpbmUnLCBbXG4gICAgICBbNCwgOF0sXG4gICAgICBbNSwgOF0sXG4gICAgICBbNiwgOF0sXG4gICAgXSksXG4gICAgcGF0cm9sQm9hdDogU2hpcCgyLCAncGF0cm9sIGJvYXQnLCBbXG4gICAgICBbOSwgMl0sXG4gICAgICBbOSwgM10sXG4gICAgXSksXG4gIH07XG5cbiAgY29uc3QgYm9hcmQgPSBbXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICBdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChuYW1lLCBjb3JkcykgPT4ge1xuICAgIHNoaXBzW25hbWVdID0gU2hpcChjb3Jkcy5sZW5ndGgsIG5hbWUsIGNvcmRzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IGNvcmRzW2ldO1xuICAgICAgYm9hcmRbeF1beV0gPSBzaGlwc1tuYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICBjb25zdCBfYXJyYXlpc1ByZXNlbnQgPSAoYSwgYikgPT4ge1xuICAgIGEgPSBKU09OLnN0cmluZ2lmeShhKTtcbiAgICBiID0gSlNPTi5zdHJpbmdpZnkoYik7XG4gICAgY29uc3QgcmVzdWx0ID0gYS5pbmRleE9mKGIpO1xuICAgIGlmIChyZXN1bHQgIT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IGF0dGFjayA9IFt4LCB5XTtcbiAgICBjb25zdCBwYXN0QXR0YWNrcyA9IGdldFBhc3RBdHRhY2tzKCk7XG4gICAgbGV0IGF0dGFja2VkU2hpcCA9IGJvYXJkW2F0dGFja1swXV1bYXR0YWNrWzFdXTtcbiAgICBsZXQgY2hlY2tBdHRhY2sgPSBfYXJyYXlpc1ByZXNlbnQocGFzdEF0dGFja3MsIGF0dGFjayk7XG5cbiAgICBpZiAoY2hlY2tBdHRhY2sgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICAgIHBhc3RBdHRhY2tzLnB1c2goYXR0YWNrKTtcbiAgICAgICAgYXR0YWNrZWRTaGlwLmhpdCgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhc3RBdHRhY2tzLnB1c2goYXR0YWNrKTtcbiAgICAgICAgY29uc29sZS5sb2coYGF0dGFja01pc3NlZGApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYHRoaXMgYXR0YWNrIGhhcyBhbHJlYWR5IGhhcHBlbmVkLiBUcnkgYW5vdGhlciBhdHRhY2shYDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWxsU3VuayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0IGdldFBhc3RBdHRhY2tzID0gKCkgPT4gcGFzdEF0dGFja3M7XG5cbiAgY29uc3QgZ2V0U2hpcHNPbkJvYXJkID0gKCkgPT4gc2hpcHNPbkJvYXJkO1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGdldFBhc3RBdHRhY2tzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU3VuayxcbiAgICBib2FyZCxcbiAgICBnZXRCb2FyZCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiY29uc3QgUGxheWVyID0gKG5hbWUsIGlzQ29tcHV0ZXIgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT5cbiAgICBwbGF5ZXJUdXJuID09PSB0cnVlID8gKHBsYXllclR1cm4gPSBmYWxzZSkgOiAocGxheWVyVHVybiA9IHRydWUpO1xuXG4gIGNvbnN0IGF0dGFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0IGdldElzQ29tcHV0ZXIgPSAoKSA9PiBpc0NvbXB1dGVyO1xuICBsZXQgcGxheWVyVHVybiA9IHRydWU7XG5cbiAgY29uc3QgaXNUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcblxuICBjb25zdCBfcmFuZE51bSA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgfTtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSAoZ2FtZUJvYXJkKSA9PiB7fTtcblxuICBjb25zdCBpc1ByZXZpb3VzQXR0YWNrID0gKCkgPT4ge307XG5cbiAgY29uc3QgZ2V0QXR0YWNrc1NlbnQgPSAoKSA9PiBhdHRhY2tzU2VudDtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGlzVHVybixcbiAgICBjaGFuZ2VUdXJuLFxuICAgIGF0dGFjayxcbiAgICBnZXRJc0NvbXB1dGVyLFxuICAgIHJhbmRvbUF0dGFjayxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIG5hbWUsIGNvcmRzLCBoaXRzID0gMCwgc3VuayA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGhpdCA9ICh2YWx1ZSkgPT4gKGhpdHMgPSBoaXRzICsgdmFsdWUpO1xuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gc3VuaztcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudExlbmd0aCA9IGdldExlbmd0aCgpO1xuICAgIGNvbnN0IGN1cnJlbnRIaXRzID0gZ2V0SGl0cygpO1xuICAgIGlmIChjdXJyZW50SGl0cyA+PSBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VuayA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0U3VuaygpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBnZXRMZW5ndGgsXG4gICAgaGl0LFxuICAgIGdldEhpdHMsXG4gICAgaXNTdW5rLFxuICAgIGNvcmRzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gJy4vbW9kdWxlcy9nYW1lQm9hcmQuanMnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vbW9kdWxlcy9zaGlwLmpzJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vbW9kdWxlcy9wbGF5ZXIuanMnO1xuaW1wb3J0IHsgZ2FtZVNldHVwIH0gZnJvbSAnLi9tb2R1bGVzL2dhbWVMb2dpYy5qcyc7XG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuY29uc3QgdGVzdEdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xudGVzdEdhbWVCb2FyZC5wbGFjZVNoaXAoJ2NhcnJpZXInLCBbXG4gIFswLCAwXSxcbiAgWzAsIDFdLFxuICBbMCwgMl0sXG4gIFswLCAzXSxcbiAgWzAsIDRdLFxuXSk7XG5jb25zb2xlLmxvZyh0ZXN0R2FtZUJvYXJkLmdldEJvYXJkKCkpO1xuY29uc29sZS5sb2codGVzdEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKDAsIDApKTtcbmNvbnNvbGUubG9nKHRlc3RHYW1lQm9hcmQuZ2V0UGFzdEF0dGFja3MoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=