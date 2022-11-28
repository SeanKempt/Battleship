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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");






(0,_modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_3__.gameSetup)('Ezsean');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNhO0FBQ007QUFDVjs7QUFFOUI7QUFDQSxvQkFBb0IsK0NBQU07QUFDMUIsNkJBQTZCLHFEQUFTO0FBQ3RDLHlCQUF5QiwrQ0FBTTtBQUMvQixrQ0FBa0MscURBQVM7O0FBRTNDO0FBQ0Esa0JBQWtCLDJDQUFJO0FBQ3RCLHFCQUFxQiwyQ0FBSTtBQUN6QixvQkFBb0IsMkNBQUk7QUFDeEIsb0JBQW9CLDJDQUFJO0FBQ3hCLHFCQUFxQiwyQ0FBSTs7QUFFekIsK0JBQStCLDZDQUE2QztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRXFCOzs7Ozs7Ozs7Ozs7Ozs7QUN4Q3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUNuRGxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZ0I7Ozs7Ozs7VUMvQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBQ1Y7QUFDSTtBQUNNO0FBQzlCOztBQUVyQixnRUFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUxvZ2ljLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBtaXNzZWRBdHRhY2tzID0gW107XG4gIGNvbnN0IHNoaXBzT25Cb2FyZCA9IFtdO1xuICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgc2hpcFRvUGxhY2UpID0+IHtcbiAgICBzaGlwVG9QbGFjZS5zZXRDb29yZGluYXRlcyh4LCB5KTtcbiAgICBzaGlwc09uQm9hcmQucHVzaChzaGlwVG9QbGFjZSk7XG4gIH07XG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IGhpdFNoaXAgPSBzaGlwc09uQm9hcmQuZmluZChcbiAgICAgIChvYmopID0+IEpTT04uc3RyaW5naWZ5KG9iai5nZXRDb29yZGluYXRlcygpKSA9PT0gSlNPTi5zdHJpbmdpZnkoW3gsIHldKVxuICAgICk7XG4gICAgaWYgKGhpdFNoaXApIHtcbiAgICAgIGhpdFNoaXAuaGl0KDEpO1xuICAgICAgcmV0dXJuICdBdHRhY2sgc3VjY2Vzc2Z1bCEnO1xuICAgIH0gZWxzZSB7XG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goW3gsIHldKTtcbiAgICAgIHJldHVybiAnVGhlIGF0dGFjayBtaXNzZWQhJztcbiAgICB9XG4gIH07XG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBzT25Cb2FyZC5ldmVyeSgob2JqKSA9PiBvYmouaXNTdW5rKCkgPT09IHRydWUpO1xuICB9O1xuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4gbWlzc2VkQXR0YWNrcztcbiAgY29uc3QgZ2V0U2hpcHNPbkJvYXJkID0gKCkgPT4gc2hpcHNPbkJvYXJkO1xuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICBnZXRNaXNzZWRBdHRhY2tzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0U2hpcHNPbkJvYXJkLFxuICAgIGFsbFN1bmssXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gJy4vZ2FtZUJvYXJkJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBnYW1lU2V0dXAgPSAocGxheWVyTmFtZSkgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmUgPSBQbGF5ZXIocGxheWVyTmFtZSk7XG4gIGNvbnN0IHBsYXllck9uZUdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlclBsYXllciA9IFBsYXllcignQ29tcHV0ZXInLCB0cnVlKTtcbiAgY29uc3QgY29tcHV0ZXJQbGF5ZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuICAvL2NyZWF0ZSB0aGUgc2hpcHMgdGhhdCBhcmUgdG8gYmUgdXNlZCBvbiB0aGUgZ2FtZWJvYXJkc1xuICBjb25zdCBjYXJyaWVyID0gU2hpcCg1LCAnY2FycmllcicpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gU2hpcCg0LCAnYmF0dGxlc2hpcCcpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKDMsICdkZXN0cm95ZXInKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gU2hpcCgzLCAnc3VibWFyaW5lJyk7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuXG4gIC8vcGxhY2Ugc2hpcHMgb24gdGhlIGJvYXJkczsgd2lsbCBuZWVkIHRvIGF1dG9tYXRlIHRoaXMgc29tZWhvdyBsYXRlciBvbjsgYWRkIGNvbnN0cmFpbnRzIHNvIHRoYXQgd2F5IGNhbid0IHBsYWNlIG91dHNpZGUgdGhlIGJvYXJkXG4gIHBsYXllck9uZUdhbWVCb2FyZC5wbGFjZVNoaXAoWzAsIDBdLCBbMCwgNV0sIGNhcnJpZXIpO1xuICBwbGF5ZXJPbmVHYW1lQm9hcmQucGxhY2VTaGlwKFs5LCAwXSwgWzksIDNdLCBiYXR0bGVzaGlwKTtcbiAgcGxheWVyT25lR2FtZUJvYXJkLnBsYWNlU2hpcChbMywgNV0sIFs1LCA1XSwgZGVzdHJveWVyKTtcbiAgcGxheWVyT25lR2FtZUJvYXJkLnBsYWNlU2hpcChbNywgN10sIFs5LCA3XSwgc3VibWFyaW5lKTtcbiAgcGxheWVyT25lR2FtZUJvYXJkLnBsYWNlU2hpcChbOCwgOF0sIFs5LCA4XSwgcGF0cm9sQm9hdCk7XG5cbiAgY29tcHV0ZXJQbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKFswLCAwXSwgWzAsIDVdLCBjYXJyaWVyKTtcbiAgY29tcHV0ZXJQbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKFs5LCAwXSwgWzksIDNdLCBiYXR0bGVzaGlwKTtcbiAgY29tcHV0ZXJQbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKFszLCA1XSwgWzUsIDVdLCBkZXN0cm95ZXIpO1xuICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoWzcsIDddLCBbOSwgN10sIHN1Ym1hcmluZSk7XG4gIGNvbXB1dGVyUGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChbOCwgOF0sIFs5LCA4XSwgcGF0cm9sQm9hdCk7XG5cbiAgY29uc3Qgd2hvc1R1cm4gPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllck9uZS5pc1R1cm4oKSA9PT0gdHJ1ZSAmJiBjb21wdXRlclBsYXllci5pc1R1cm4oKSA9PT0gZmFsc2UpXG4gICAgICBwbGF5ZXJPbmU7XG4gICAgaWYgKHBsYXllck9uZS5pc1R1cm4oKSA9PT0gZmFsc2UgJiYgY29tcHV0ZXJQbGF5ZXIuaXNUdXJuKCkgPT09IHRydWUpXG4gICAgICBjb21wdXRlclBsYXllcjtcblxuICAgIGxldCBjdXJyZW50VHVybiA9IHdob3NUdXJuKCk7XG4gIH07XG59O1xuXG5leHBvcnQgeyBnYW1lU2V0dXAgfTtcbiIsIi8vbWlnaHQgbmVlZCB0byBsb29rIGludG8gY3JlYXRpbmcgdGhlIGdhbWVib2FyZCBvbiB0aGUgcGxheWVycyB0aGVtc2VsdmVzXG5cbmNvbnN0IFBsYXllciA9IChuYW1lLCBpc0NvbXB1dGVyID0gZmFsc2UpID0+IHtcbiAgY29uc3QgYXR0YWNrc1NlbnQgPSBbXTtcbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+XG4gICAgcGxheWVyVHVybiA9PT0gdHJ1ZSA/IChwbGF5ZXJUdXJuID0gZmFsc2UpIDogKHBsYXllclR1cm4gPSB0cnVlKTtcbiAgY29uc3QgYXR0YWNrID0gKHgsIHksIGJvYXJkKSA9PiB7XG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICBhdHRhY2tzU2VudC5wdXNoKFt4LCB5XSk7XG4gICAgY2hhbmdlVHVybigpO1xuICB9O1xuICBjb25zdCBnZXRJc0NvbXB1dGVyID0gKCkgPT4gaXNDb21wdXRlcjtcbiAgbGV0IHBsYXllclR1cm4gPSB0cnVlO1xuICBjb25zdCBpc1R1cm4gPSAoKSA9PiBwbGF5ZXJUdXJuO1xuICBjb25zdCBfcmFuZE51bSA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgfTtcbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gKGdhbWVCb2FyZCkgPT4ge1xuICAgIGNvbnN0IHggPSBbX3JhbmROdW0oKSwgX3JhbmROdW0oKV07XG4gICAgY29uc3QgeSA9IFtfcmFuZE51bSgpLCBfcmFuZE51bSgpXTtcbiAgICBjb25zdCBpc1ByZXZpb3VzQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgYXR0YWNrc1NlbnQuc29tZShcbiAgICAgICAgICAoYXR0YWNrcykgPT4gSlNPTi5zdHJpbmdpZnkoYXR0YWNrcykgPT09IEpTT04uc3RyaW5naWZ5KFt4LCB5XSlcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHggPSBbX3JhbmROdW0oKSwgX3JhbmROdW0oKV07XG4gICAgICAgIHkgPSBbX3JhbmROdW0oKSwgX3JhbmROdW0oKV07XG4gICAgICAgIHJldHVybiBpc1ByZXZpb3VzQXR0YWNrKHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKGdldElzQ29tcHV0ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgaXNQcmV2aW91c0F0dGFjayh4LCB5KTtcbiAgICAgIGF0dGFjayh4LCB5LCBnYW1lQm9hcmQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRBdHRhY2tzU2VudCA9ICgpID0+IGF0dGFja3NTZW50O1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgaXNUdXJuLFxuICAgIGNoYW5nZVR1cm4sXG4gICAgYXR0YWNrLFxuICAgIGdldElzQ29tcHV0ZXIsXG4gICAgcmFuZG9tQXR0YWNrLFxuICAgIGdldEF0dGFja3NTZW50LFxuICB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCwgbmFtZSwgaGl0cyA9IDAsIHN1bmsgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuICBjb25zdCBoaXQgPSAodmFsdWUpID0+IChoaXRzID0gaGl0cyArIHZhbHVlKTtcbiAgY29uc3QgZ2V0Q29vcmRpbmF0ZXMgPSAoKSA9PiBjb29yZGluYXRlcztcbiAgY29uc3Qgc2V0Q29vcmRpbmF0ZXMgPSAoeCwgeSkgPT4gY29vcmRpbmF0ZXMucHVzaCh4LCB5KTtcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHM7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0U3VuayA9ICgpID0+IHN1bms7XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5ndGggPSBnZXRMZW5ndGgoKTtcbiAgICBjb25zdCBjdXJyZW50SGl0cyA9IGdldEhpdHMoKTtcbiAgICBpZiAoY3VycmVudEhpdHMgPj0gY3VycmVudExlbmd0aCkge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1bmsgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFN1bmsoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGhpdCxcbiAgICBnZXRIaXRzLFxuICAgIGlzU3VuayxcbiAgICBnZXRDb29yZGluYXRlcyxcbiAgICBzZXRDb29yZGluYXRlcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSAnLi9tb2R1bGVzL2dhbWVCb2FyZC5qcyc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9tb2R1bGVzL3NoaXAuanMnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9tb2R1bGVzL3BsYXllci5qcyc7XG5pbXBvcnQgeyBnYW1lU2V0dXAgfSBmcm9tICcuL21vZHVsZXMvZ2FtZUxvZ2ljLmpzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5nYW1lU2V0dXAoJ0V6c2VhbicpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9