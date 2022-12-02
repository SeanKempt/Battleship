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

  const shipsOnBoard = {
    1: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
    2: [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ],
    3: [
      [4, 5],
      [4, 6],
      [4, 7],
    ],
    4: [
      [4, 8],
      [5, 8],
      [6, 8],
    ],
    5: [
      [9, 2],
      [9, 3],
    ],
  };

  const ships = {
    carrier: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(5, 'carrier', 1),
    battleship: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(4, 'battleship', 2),
    destroyer: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(3, 'destroyer', 3),
    submarine: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(3, 'submarine', 4),
    patrolBoat: (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(2, 'patrol boat', 5),
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

  const placeShip = (id, cords = shipsOnBoard[id]) => {
    for (let i = 0; i < cords.length; i++) {
      const [x, y] = cords[i];
      board[x][y] = id;
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
    shipsOnBoard,
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
const Ship = (length, name, id, hits = 0, sunk = false) => {
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
    id,
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
console.log(testGameBoard.getBoard());
testGameBoard.placeShip(1);
testGameBoard.placeShip(2);
testGameBoard.placeShip(3);
testGameBoard.placeShip(4);
testGameBoard.placeShip(5);
console.log(testGameBoard.getBoard());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBOEI7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsMkNBQUk7QUFDakIsZ0JBQWdCLDJDQUFJO0FBQ3BCLGVBQWUsMkNBQUk7QUFDbkIsZUFBZSwyQ0FBSTtBQUNuQixnQkFBZ0IsMkNBQUk7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEZyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDa0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWdCOzs7Ozs7O1VDM0JoQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBQ1Y7QUFDSTtBQUNNOztBQUU5QjtBQUNyQixzQkFBc0IsZ0VBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBwYXN0QXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHNoaXBzT25Cb2FyZCA9IHtcbiAgICAxOiBbXG4gICAgICBbMCwgMF0sXG4gICAgICBbMCwgMV0sXG4gICAgICBbMCwgMl0sXG4gICAgICBbMCwgM10sXG4gICAgICBbMCwgNF0sXG4gICAgXSxcbiAgICAyOiBbXG4gICAgICBbNiwgMF0sXG4gICAgICBbNywgMF0sXG4gICAgICBbOCwgMF0sXG4gICAgICBbOSwgMF0sXG4gICAgXSxcbiAgICAzOiBbXG4gICAgICBbNCwgNV0sXG4gICAgICBbNCwgNl0sXG4gICAgICBbNCwgN10sXG4gICAgXSxcbiAgICA0OiBbXG4gICAgICBbNCwgOF0sXG4gICAgICBbNSwgOF0sXG4gICAgICBbNiwgOF0sXG4gICAgXSxcbiAgICA1OiBbXG4gICAgICBbOSwgMl0sXG4gICAgICBbOSwgM10sXG4gICAgXSxcbiAgfTtcblxuICBjb25zdCBzaGlwcyA9IHtcbiAgICBjYXJyaWVyOiBTaGlwKDUsICdjYXJyaWVyJywgMSksXG4gICAgYmF0dGxlc2hpcDogU2hpcCg0LCAnYmF0dGxlc2hpcCcsIDIpLFxuICAgIGRlc3Ryb3llcjogU2hpcCgzLCAnZGVzdHJveWVyJywgMyksXG4gICAgc3VibWFyaW5lOiBTaGlwKDMsICdzdWJtYXJpbmUnLCA0KSxcbiAgICBwYXRyb2xCb2F0OiBTaGlwKDIsICdwYXRyb2wgYm9hdCcsIDUpLFxuICB9O1xuXG4gIGNvbnN0IGJvYXJkID0gW1xuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoaWQsIGNvcmRzID0gc2hpcHNPbkJvYXJkW2lkXSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IGNvcmRzW2ldO1xuICAgICAgYm9hcmRbeF1beV0gPSBpZDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBhdHRhY2sgPSBbeCwgeV07XG4gICAgbGV0IHNoaXBJZCA9IGJvYXJkW2F0dGFja1swXV1bYXR0YWNrWzFdXTtcbiAgICBsZXQgYXR0YWNrZWRTaGlwQ29yZHMgPSBzaGlwc09uQm9hcmRbc2hpcElkXTtcbiAgfTtcblxuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge307XG5cbiAgY29uc3QgZ2V0UGFzdEF0dGFja3MgPSAoKSA9PiBwYXN0QXR0YWNrcztcblxuICBjb25zdCBnZXRTaGlwc09uQm9hcmQgPSAoKSA9PiBzaGlwc09uQm9hcmQ7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgZ2V0UGFzdEF0dGFja3MsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBzaGlwc09uQm9hcmQsXG4gICAgYWxsU3VuayxcbiAgICBib2FyZCxcbiAgICBnZXRCb2FyZCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiY29uc3QgUGxheWVyID0gKG5hbWUsIGlzQ29tcHV0ZXIgPSBmYWxzZSkgPT4ge1xyXG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PlxyXG4gICAgcGxheWVyVHVybiA9PT0gdHJ1ZSA/IChwbGF5ZXJUdXJuID0gZmFsc2UpIDogKHBsYXllclR1cm4gPSB0cnVlKTtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKCkgPT4ge307XHJcblxyXG4gIGNvbnN0IGdldElzQ29tcHV0ZXIgPSAoKSA9PiBpc0NvbXB1dGVyO1xyXG4gIGxldCBwbGF5ZXJUdXJuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3QgaXNUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcclxuXHJcbiAgY29uc3QgX3JhbmROdW0gPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcclxuICB9O1xyXG5cclxuICBjb25zdCByYW5kb21BdHRhY2sgPSAoZ2FtZUJvYXJkKSA9PiB7fTtcclxuXHJcbiAgY29uc3QgaXNQcmV2aW91c0F0dGFjayA9ICgpID0+IHt9O1xyXG5cclxuICBjb25zdCBnZXRBdHRhY2tzU2VudCA9ICgpID0+IGF0dGFja3NTZW50O1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lLFxyXG4gICAgaXNUdXJuLFxyXG4gICAgY2hhbmdlVHVybixcclxuICAgIGF0dGFjayxcclxuICAgIGdldElzQ29tcHV0ZXIsXHJcbiAgICByYW5kb21BdHRhY2ssXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IFBsYXllciB9O1xyXG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCwgbmFtZSwgaWQsIGhpdHMgPSAwLCBzdW5rID0gZmFsc2UpID0+IHtcbiAgY29uc3QgaGl0ID0gKHZhbHVlKSA9PiAoaGl0cyA9IGhpdHMgKyB2YWx1ZSk7XG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldFN1bmsgPSAoKSA9PiBzdW5rO1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgY3VycmVudEhpdHMgPSBnZXRIaXRzKCk7XG4gICAgaWYgKGN1cnJlbnRIaXRzID49IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdW5rID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBnZXRTdW5rKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGdldExlbmd0aCxcbiAgICBoaXQsXG4gICAgZ2V0SGl0cyxcbiAgICBpc1N1bmssXG4gICAgaWQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSAnLi9tb2R1bGVzL2dhbWVCb2FyZC5qcyc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9tb2R1bGVzL3NoaXAuanMnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9tb2R1bGVzL3BsYXllci5qcyc7XG5pbXBvcnQgeyBnYW1lU2V0dXAgfSBmcm9tICcuL21vZHVsZXMvZ2FtZUxvZ2ljLmpzJztcblxuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5jb25zdCB0ZXN0R2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5jb25zb2xlLmxvZyh0ZXN0R2FtZUJvYXJkLmdldEJvYXJkKCkpO1xudGVzdEdhbWVCb2FyZC5wbGFjZVNoaXAoMSk7XG50ZXN0R2FtZUJvYXJkLnBsYWNlU2hpcCgyKTtcbnRlc3RHYW1lQm9hcmQucGxhY2VTaGlwKDMpO1xudGVzdEdhbWVCb2FyZC5wbGFjZVNoaXAoNCk7XG50ZXN0R2FtZUJvYXJkLnBsYWNlU2hpcCg1KTtcbmNvbnNvbGUubG9nKHRlc3RHYW1lQm9hcmQuZ2V0Qm9hcmQoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=