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
    ships[name] = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(name, cords, cords.length);

    for (let i = 0; i < cords.length; i++) {
      const [x, y] = cords[i];
      board[x][y] = ships[name];
    }
  };

  const getBoard = () => board;

  const receiveAttack = (x, y) => {
    const attack = [x, y];
    let shipId = board[attack[0]][attack[1]];
    let attackedShipCords = shipsOnBoard[shipId];
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBOEI7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsMkNBQUk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkNBQUk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDJDQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJDQUFJO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQiwyQ0FBSTs7QUFFdEIsb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tCOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUJsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVnQjs7Ozs7OztVQzNCaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNWO0FBQ0k7QUFDTTs7QUFFOUI7QUFDckIsc0JBQXNCLGdFQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBwYXN0QXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHNoaXBzID0ge1xuICAgIGJhdHRsZXNoaXA6IFNoaXAoNCwgJ2JhdHRsZXNoaXAnLCBbXG4gICAgICBbNiwgMF0sXG4gICAgICBbNywgMF0sXG4gICAgICBbOCwgMF0sXG4gICAgICBbOSwgMF0sXG4gICAgXSksXG4gICAgZGVzdHJveWVyOiBTaGlwKDMsICdkZXN0cm95ZXInLCBbXG4gICAgICBbNCwgNV0sXG4gICAgICBbNCwgNl0sXG4gICAgICBbNCwgN10sXG4gICAgXSksXG4gICAgc3VibWFyaW5lOiBTaGlwKDMsICdzdWJtYXJpbmUnLCBbXG4gICAgICBbNCwgOF0sXG4gICAgICBbNSwgOF0sXG4gICAgICBbNiwgOF0sXG4gICAgXSksXG4gICAgcGF0cm9sQm9hdDogU2hpcCgyLCAncGF0cm9sIGJvYXQnLCBbXG4gICAgICBbOSwgMl0sXG4gICAgICBbOSwgM10sXG4gICAgXSksXG4gIH07XG5cbiAgY29uc3QgYm9hcmQgPSBbXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICBdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChuYW1lLCBjb3JkcykgPT4ge1xuICAgIHNoaXBzW25hbWVdID0gU2hpcChuYW1lLCBjb3JkcywgY29yZHMubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IGNvcmRzW2ldO1xuICAgICAgYm9hcmRbeF1beV0gPSBzaGlwc1tuYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBhdHRhY2sgPSBbeCwgeV07XG4gICAgbGV0IHNoaXBJZCA9IGJvYXJkW2F0dGFja1swXV1bYXR0YWNrWzFdXTtcbiAgICBsZXQgYXR0YWNrZWRTaGlwQ29yZHMgPSBzaGlwc09uQm9hcmRbc2hpcElkXTtcbiAgfTtcblxuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge307XG5cbiAgY29uc3QgZ2V0UGFzdEF0dGFja3MgPSAoKSA9PiBwYXN0QXR0YWNrcztcblxuICBjb25zdCBnZXRTaGlwc09uQm9hcmQgPSAoKSA9PiBzaGlwc09uQm9hcmQ7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgZ2V0UGFzdEF0dGFja3MsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTdW5rLFxuICAgIGJvYXJkLFxuICAgIGdldEJvYXJkLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZUJvYXJkIH07XG4iLCJjb25zdCBQbGF5ZXIgPSAobmFtZSwgaXNDb21wdXRlciA9IGZhbHNlKSA9PiB7XHJcbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+XHJcbiAgICBwbGF5ZXJUdXJuID09PSB0cnVlID8gKHBsYXllclR1cm4gPSBmYWxzZSkgOiAocGxheWVyVHVybiA9IHRydWUpO1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAoKSA9PiB7fTtcclxuXHJcbiAgY29uc3QgZ2V0SXNDb21wdXRlciA9ICgpID0+IGlzQ29tcHV0ZXI7XHJcbiAgbGV0IHBsYXllclR1cm4gPSB0cnVlO1xyXG5cclxuICBjb25zdCBpc1R1cm4gPSAoKSA9PiBwbGF5ZXJUdXJuO1xyXG5cclxuICBjb25zdCBfcmFuZE51bSA9ICgpID0+IHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IChnYW1lQm9hcmQpID0+IHt9O1xyXG5cclxuICBjb25zdCBpc1ByZXZpb3VzQXR0YWNrID0gKCkgPT4ge307XHJcblxyXG4gIGNvbnN0IGdldEF0dGFja3NTZW50ID0gKCkgPT4gYXR0YWNrc1NlbnQ7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICBpc1R1cm4sXHJcbiAgICBjaGFuZ2VUdXJuLFxyXG4gICAgYXR0YWNrLFxyXG4gICAgZ2V0SXNDb21wdXRlcixcclxuICAgIHJhbmRvbUF0dGFjayxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgUGxheWVyIH07XHJcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBuYW1lLCBjb3JkcywgaGl0cyA9IDAsIHN1bmsgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBoaXQgPSAodmFsdWUpID0+IChoaXRzID0gaGl0cyArIHZhbHVlKTtcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHM7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0U3VuayA9ICgpID0+IHN1bms7XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5ndGggPSBnZXRMZW5ndGgoKTtcbiAgICBjb25zdCBjdXJyZW50SGl0cyA9IGdldEhpdHMoKTtcbiAgICBpZiAoY3VycmVudEhpdHMgPj0gY3VycmVudExlbmd0aCkge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1bmsgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFN1bmsoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGhpdCxcbiAgICBnZXRIaXRzLFxuICAgIGlzU3VuayxcbiAgICBjb3JkcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL21vZHVsZXMvZ2FtZUJvYXJkLmpzJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL21vZHVsZXMvc2hpcC5qcyc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL21vZHVsZXMvcGxheWVyLmpzJztcbmltcG9ydCB7IGdhbWVTZXR1cCB9IGZyb20gJy4vbW9kdWxlcy9nYW1lTG9naWMuanMnO1xuXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmNvbnN0IHRlc3RHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcbnRlc3RHYW1lQm9hcmQucGxhY2VTaGlwKCdjYXJyaWVyJywgW1xuICBbMCwgMF0sXG4gIFswLCAxXSxcbiAgWzAsIDJdLFxuICBbMCwgM10sXG4gIFswLCA0XSxcbl0pO1xuY29uc29sZS5sb2codGVzdEdhbWVCb2FyZC5nZXRCb2FyZCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==