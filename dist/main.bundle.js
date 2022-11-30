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

const renderPlayerGameBoard = (gameBoardSquares) => {
  for (let i = 0; i < gameBoardSquares.length; i++) {
    const square = document.createElement('div');
    square.dataset.cord = gameBoardSquares[i];
    square.innerHTML = '';
    square.classList.add('gameSquare');
    playerBoard.appendChild(square);
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
    playerObj.attack(newCord, enemyBoard);
  });
};

const renderComputerGameBoard = (gameBoardSquares, playerObj, enemyBoard) => {
  for (let i = 0; i < gameBoardSquares.length; i++) {
    const square = document.createElement('div');
    square.dataset.cord = gameBoardSquares[i];
    let cord = square.dataset.cord;
    square.innerHTML = '';
    square.classList.add('gameSquare');
    attackEventListener(square, playerObj, enemyBoard, cord);
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

  const placeShip = (cords, shipToPlace) => {
    shipToPlace.setCoordinates(cords);
    shipsOnBoard.push(shipToPlace);
  };

  const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const col = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const gameSquares = [];

  const generateSquares = () => {
    for (let i = 0; i < row.length; i++) {
      for (let j = 0; j < col.length; j++) {
        gameSquares.push([row[j], col[i]]);
      }
    }
  };

  generateSquares();

  const receiveAttack = (cord) => {
    const hitShip = shipsOnBoard.find((obj) =>
      obj
        .getCoordinates()
        .find((ary) => JSON.stringify(ary) === JSON.stringify(cord))
    );

    if (hitShip) {
      hitShip.hit(1);
      return 'Attack successful!';
    } else {
      missedAttacks.push(cord);
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
/* harmony import */ var _modules_domChanges_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/domChanges.js */ "./src/modules/domChanges.js");





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

  const cCarrier = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(5, 'carrier');
  const cBattleship = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(4, 'battleship');
  const cDestroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(3, 'destroyer');
  const cSubmarine = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(3, 'submarine');
  const cPatrolBoat = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.Ship)(2, 'Patrol Boat');

  //place ships on the boards; will need to automate this somehow later on; add constraints so that way can't place outside the board
  playerOneGameBoard.placeShip(
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
    carrier
  );
  playerOneGameBoard.placeShip(
    [
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
    ],
    battleship
  );
  playerOneGameBoard.placeShip(
    [
      [3, 5],
      [4, 5],
      [5, 5],
    ],
    destroyer
  );
  playerOneGameBoard.placeShip(
    [
      [7, 7],
      [8, 7],
      [9, 7],
    ],
    submarine
  );
  playerOneGameBoard.placeShip(
    [
      [8, 8],
      [9, 8],
    ],
    patrolBoat
  );

  computerPlayerGameBoard.placeShip(
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
    cCarrier
  );
  computerPlayerGameBoard.placeShip(
    [
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
    ],
    cBattleship
  );
  computerPlayerGameBoard.placeShip(
    [
      [3, 5],
      [4, 5],
      [5, 5],
    ],
    cDestroyer
  );
  computerPlayerGameBoard.placeShip(
    [
      [7, 7],
      [8, 7],
      [9, 7],
    ],
    cSubmarine
  );
  computerPlayerGameBoard.placeShip(
    [
      [8, 8],
      [9, 8],
    ],
    cPatrolBoat
  );

  const whosTurn = () => {
    if (playerOne.isTurn() === true && computerPlayer.isTurn() === false)
      playerOne;
    if (playerOne.isTurn() === false && computerPlayer.isTurn() === true)
      computerPlayer;
  };

  let currentTurn = whosTurn();

  (0,_modules_domChanges_js__WEBPACK_IMPORTED_MODULE_3__.renderPlayerGameBoard)(playerOneGameBoard.getGameSquares());

  (0,_modules_domChanges_js__WEBPACK_IMPORTED_MODULE_3__.renderComputerGameBoard)(
    computerPlayerGameBoard.getGameSquares(),
    playerOne,
    computerPlayerGameBoard
  );
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
const Player = (name, isComputer = false) => {
  const attacksSent = [];

  const changeTurn = () =>
    playerTurn === true ? (playerTurn = false) : (playerTurn = true);

  const attack = (cord, board) => {
    board.receiveAttack(cord);
    attacksSent.push(cord);
    changeTurn();
  };

  const getIsComputer = () => isComputer;
  let playerTurn = true;

  const isTurn = () => playerTurn;

  const _randNum = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const randomAttack = (gameBoard) => {
    let cord = [_randNum(), _randNum()];

    const isPreviousAttack = (cord) => {
      if (
        attacksSent.some(
          (attacks) => JSON.stringify(attacks) === JSON.stringify(cord)
        )
      ) {
        cord = [_randNum(), _randNum()];
        return isPreviousAttack(x, y);
      } else {
        return;
      }
    };
    if (getIsComputer() === true) {
      isPreviousAttack(cord);
      attack(cord, gameBoard);
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
  let coordinates;
  const hit = (value) => (hits = hits + value);
  const getCoordinates = () => coordinates;
  const setCoordinates = (cords) => {
    coordinates = cords;
  };
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






(0,_modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_3__.gameSetup)('john');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsNkJBQTZCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUwRDs7Ozs7Ozs7Ozs7Ozs7O0FDckMxRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDLHNCQUFzQixnQkFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNURhO0FBQ007QUFDVjtBQUlJOztBQUVsQztBQUNBLG9CQUFvQiwrQ0FBTTtBQUMxQiw2QkFBNkIscURBQVM7QUFDdEMseUJBQXlCLCtDQUFNO0FBQy9CLGtDQUFrQyxxREFBUzs7QUFFM0M7QUFDQSxrQkFBa0IsMkNBQUk7QUFDdEIscUJBQXFCLDJDQUFJO0FBQ3pCLG9CQUFvQiwyQ0FBSTtBQUN4QixvQkFBb0IsMkNBQUk7QUFDeEIscUJBQXFCLDJDQUFJOztBQUV6QixtQkFBbUIsMkNBQUk7QUFDdkIsc0JBQXNCLDJDQUFJO0FBQzFCLHFCQUFxQiwyQ0FBSTtBQUN6QixxQkFBcUIsMkNBQUk7QUFDekIsc0JBQXNCLDJDQUFJOztBQUUxQiwrQkFBK0IsNkNBQTZDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFLDZFQUFxQjs7QUFFdkIsRUFBRSwrRUFBdUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7OztBQ3RJckI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0I7Ozs7Ozs7Ozs7Ozs7OztBQ3REbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZ0I7Ozs7Ozs7VUNqQ2hCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBQ1Y7QUFDSTtBQUNNOztBQUU5QjtBQUNyQixnRUFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb21DaGFuZ2VzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVMb2dpYy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpO1xuXG5jb25zdCByZW5kZXJQbGF5ZXJHYW1lQm9hcmQgPSAoZ2FtZUJvYXJkU3F1YXJlcykgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVCb2FyZFNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmUuZGF0YXNldC5jb3JkID0gZ2FtZUJvYXJkU3F1YXJlc1tpXTtcbiAgICBzcXVhcmUuaW5uZXJIVE1MID0gJyc7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2dhbWVTcXVhcmUnKTtcbiAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG59O1xuXG5jb25zdCBhdHRhY2tFdmVudExpc3RlbmVyID0gKGVsZW1lbnQsIHBsYXllck9iaiwgZW5lbXlCb2FyZCwgY29yZCkgPT4ge1xuICBjb3JkID0gY29yZC5yZXBsYWNlQWxsKCcsJywgJycpO1xuICBjb25zdCBzdHJpbmdzID0gWy4uLmNvcmRdO1xuICBjb25zdCBuZXdDb3JkID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIG5ld0NvcmQucHVzaChwYXJzZUludChzdHJpbmdzW2ldKSk7XG4gIH1cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwbGF5ZXJPYmouYXR0YWNrKG5ld0NvcmQsIGVuZW15Qm9hcmQpO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkID0gKGdhbWVCb2FyZFNxdWFyZXMsIHBsYXllck9iaiwgZW5lbXlCb2FyZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVCb2FyZFNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmUuZGF0YXNldC5jb3JkID0gZ2FtZUJvYXJkU3F1YXJlc1tpXTtcbiAgICBsZXQgY29yZCA9IHNxdWFyZS5kYXRhc2V0LmNvcmQ7XG4gICAgc3F1YXJlLmlubmVySFRNTCA9ICcnO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdnYW1lU3F1YXJlJyk7XG4gICAgYXR0YWNrRXZlbnRMaXN0ZW5lcihzcXVhcmUsIHBsYXllck9iaiwgZW5lbXlCb2FyZCwgY29yZCk7XG4gICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG59O1xuXG5leHBvcnQgeyByZW5kZXJQbGF5ZXJHYW1lQm9hcmQsIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkIH07XG4iLCJjb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBzaGlwc09uQm9hcmQgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29yZHMsIHNoaXBUb1BsYWNlKSA9PiB7XG4gICAgc2hpcFRvUGxhY2Uuc2V0Q29vcmRpbmF0ZXMoY29yZHMpO1xuICAgIHNoaXBzT25Cb2FyZC5wdXNoKHNoaXBUb1BsYWNlKTtcbiAgfTtcblxuICBjb25zdCByb3cgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG4gIGNvbnN0IGNvbCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XTtcblxuICBjb25zdCBnYW1lU3F1YXJlcyA9IFtdO1xuXG4gIGNvbnN0IGdlbmVyYXRlU3F1YXJlcyA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2wubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZ2FtZVNxdWFyZXMucHVzaChbcm93W2pdLCBjb2xbaV1dKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZ2VuZXJhdGVTcXVhcmVzKCk7XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb3JkKSA9PiB7XG4gICAgY29uc3QgaGl0U2hpcCA9IHNoaXBzT25Cb2FyZC5maW5kKChvYmopID0+XG4gICAgICBvYmpcbiAgICAgICAgLmdldENvb3JkaW5hdGVzKClcbiAgICAgICAgLmZpbmQoKGFyeSkgPT4gSlNPTi5zdHJpbmdpZnkoYXJ5KSA9PT0gSlNPTi5zdHJpbmdpZnkoY29yZCkpXG4gICAgKTtcblxuICAgIGlmIChoaXRTaGlwKSB7XG4gICAgICBoaXRTaGlwLmhpdCgxKTtcbiAgICAgIHJldHVybiAnQXR0YWNrIHN1Y2Nlc3NmdWwhJztcbiAgICB9IGVsc2Uge1xuICAgICAgbWlzc2VkQXR0YWNrcy5wdXNoKGNvcmQpO1xuICAgICAgcmV0dXJuICdUaGUgYXR0YWNrIG1pc3NlZCEnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRHYW1lU3F1YXJlcyA9ICgpID0+IGdhbWVTcXVhcmVzO1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBzT25Cb2FyZC5ldmVyeSgob2JqKSA9PiBvYmouaXNTdW5rKCkgPT09IHRydWUpO1xuICB9O1xuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4gbWlzc2VkQXR0YWNrcztcblxuICBjb25zdCBnZXRTaGlwc09uQm9hcmQgPSAoKSA9PiBzaGlwc09uQm9hcmQ7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgZ2V0TWlzc2VkQXR0YWNrcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzT25Cb2FyZCxcbiAgICBhbGxTdW5rLFxuICAgIGdldEdhbWVTcXVhcmVzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7XG4gIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkLFxuICByZW5kZXJQbGF5ZXJHYW1lQm9hcmQsXG59IGZyb20gJy4uL21vZHVsZXMvZG9tQ2hhbmdlcy5qcyc7XG5cbmNvbnN0IGdhbWVTZXR1cCA9IChwbGF5ZXJOYW1lKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZSA9IFBsYXllcihwbGF5ZXJOYW1lKTtcbiAgY29uc3QgcGxheWVyT25lR2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gUGxheWVyKCdDb21wdXRlcicsIHRydWUpO1xuICBjb25zdCBjb21wdXRlclBsYXllckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIC8vY3JlYXRlIHRoZSBzaGlwcyB0aGF0IGFyZSB0byBiZSB1c2VkIG9uIHRoZSBnYW1lYm9hcmRzXG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKDUsICdjYXJyaWVyJyk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKDQsICdiYXR0bGVzaGlwJyk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoMywgJ2Rlc3Ryb3llcicpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKDMsICdzdWJtYXJpbmUnKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IFNoaXAoMiwgJ1BhdHJvbCBCb2F0Jyk7XG5cbiAgY29uc3QgY0NhcnJpZXIgPSBTaGlwKDUsICdjYXJyaWVyJyk7XG4gIGNvbnN0IGNCYXR0bGVzaGlwID0gU2hpcCg0LCAnYmF0dGxlc2hpcCcpO1xuICBjb25zdCBjRGVzdHJveWVyID0gU2hpcCgzLCAnZGVzdHJveWVyJyk7XG4gIGNvbnN0IGNTdWJtYXJpbmUgPSBTaGlwKDMsICdzdWJtYXJpbmUnKTtcbiAgY29uc3QgY1BhdHJvbEJvYXQgPSBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuXG4gIC8vcGxhY2Ugc2hpcHMgb24gdGhlIGJvYXJkczsgd2lsbCBuZWVkIHRvIGF1dG9tYXRlIHRoaXMgc29tZWhvdyBsYXRlciBvbjsgYWRkIGNvbnN0cmFpbnRzIHNvIHRoYXQgd2F5IGNhbid0IHBsYWNlIG91dHNpZGUgdGhlIGJvYXJkXG4gIHBsYXllck9uZUdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgW1xuICAgICAgWzAsIDBdLFxuICAgICAgWzAsIDFdLFxuICAgICAgWzAsIDJdLFxuICAgICAgWzAsIDNdLFxuICAgICAgWzAsIDRdLFxuICAgICAgWzAsIDVdLFxuICAgIF0sXG4gICAgY2FycmllclxuICApO1xuICBwbGF5ZXJPbmVHYW1lQm9hcmQucGxhY2VTaGlwKFxuICAgIFtcbiAgICAgIFs5LCAwXSxcbiAgICAgIFs5LCAxXSxcbiAgICAgIFs5LCAyXSxcbiAgICAgIFs5LCAzXSxcbiAgICBdLFxuICAgIGJhdHRsZXNoaXBcbiAgKTtcbiAgcGxheWVyT25lR2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICBbXG4gICAgICBbMywgNV0sXG4gICAgICBbNCwgNV0sXG4gICAgICBbNSwgNV0sXG4gICAgXSxcbiAgICBkZXN0cm95ZXJcbiAgKTtcbiAgcGxheWVyT25lR2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICBbXG4gICAgICBbNywgN10sXG4gICAgICBbOCwgN10sXG4gICAgICBbOSwgN10sXG4gICAgXSxcbiAgICBzdWJtYXJpbmVcbiAgKTtcbiAgcGxheWVyT25lR2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICBbXG4gICAgICBbOCwgOF0sXG4gICAgICBbOSwgOF0sXG4gICAgXSxcbiAgICBwYXRyb2xCb2F0XG4gICk7XG5cbiAgY29tcHV0ZXJQbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKFxuICAgIFtcbiAgICAgIFswLCAwXSxcbiAgICAgIFswLCAxXSxcbiAgICAgIFswLCAyXSxcbiAgICAgIFswLCAzXSxcbiAgICAgIFswLCA0XSxcbiAgICAgIFswLCA1XSxcbiAgICBdLFxuICAgIGNDYXJyaWVyXG4gICk7XG4gIGNvbXB1dGVyUGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICBbXG4gICAgICBbOSwgMF0sXG4gICAgICBbOSwgMV0sXG4gICAgICBbOSwgMl0sXG4gICAgICBbOSwgM10sXG4gICAgXSxcbiAgICBjQmF0dGxlc2hpcFxuICApO1xuICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgW1xuICAgICAgWzMsIDVdLFxuICAgICAgWzQsIDVdLFxuICAgICAgWzUsIDVdLFxuICAgIF0sXG4gICAgY0Rlc3Ryb3llclxuICApO1xuICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgW1xuICAgICAgWzcsIDddLFxuICAgICAgWzgsIDddLFxuICAgICAgWzksIDddLFxuICAgIF0sXG4gICAgY1N1Ym1hcmluZVxuICApO1xuICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgW1xuICAgICAgWzgsIDhdLFxuICAgICAgWzksIDhdLFxuICAgIF0sXG4gICAgY1BhdHJvbEJvYXRcbiAgKTtcblxuICBjb25zdCB3aG9zVHVybiA9ICgpID0+IHtcbiAgICBpZiAocGxheWVyT25lLmlzVHVybigpID09PSB0cnVlICYmIGNvbXB1dGVyUGxheWVyLmlzVHVybigpID09PSBmYWxzZSlcbiAgICAgIHBsYXllck9uZTtcbiAgICBpZiAocGxheWVyT25lLmlzVHVybigpID09PSBmYWxzZSAmJiBjb21wdXRlclBsYXllci5pc1R1cm4oKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbXB1dGVyUGxheWVyO1xuICB9O1xuXG4gIGxldCBjdXJyZW50VHVybiA9IHdob3NUdXJuKCk7XG5cbiAgcmVuZGVyUGxheWVyR2FtZUJvYXJkKHBsYXllck9uZUdhbWVCb2FyZC5nZXRHYW1lU3F1YXJlcygpKTtcblxuICByZW5kZXJDb21wdXRlckdhbWVCb2FyZChcbiAgICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5nZXRHYW1lU3F1YXJlcygpLFxuICAgIHBsYXllck9uZSxcbiAgICBjb21wdXRlclBsYXllckdhbWVCb2FyZFxuICApO1xufTtcblxuZXhwb3J0IHsgZ2FtZVNldHVwIH07XG4iLCJjb25zdCBQbGF5ZXIgPSAobmFtZSwgaXNDb21wdXRlciA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGF0dGFja3NTZW50ID0gW107XG5cbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+XG4gICAgcGxheWVyVHVybiA9PT0gdHJ1ZSA/IChwbGF5ZXJUdXJuID0gZmFsc2UpIDogKHBsYXllclR1cm4gPSB0cnVlKTtcblxuICBjb25zdCBhdHRhY2sgPSAoY29yZCwgYm9hcmQpID0+IHtcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvcmQpO1xuICAgIGF0dGFja3NTZW50LnB1c2goY29yZCk7XG4gICAgY2hhbmdlVHVybigpO1xuICB9O1xuXG4gIGNvbnN0IGdldElzQ29tcHV0ZXIgPSAoKSA9PiBpc0NvbXB1dGVyO1xuICBsZXQgcGxheWVyVHVybiA9IHRydWU7XG5cbiAgY29uc3QgaXNUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcblxuICBjb25zdCBfcmFuZE51bSA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgfTtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgbGV0IGNvcmQgPSBbX3JhbmROdW0oKSwgX3JhbmROdW0oKV07XG5cbiAgICBjb25zdCBpc1ByZXZpb3VzQXR0YWNrID0gKGNvcmQpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgYXR0YWNrc1NlbnQuc29tZShcbiAgICAgICAgICAoYXR0YWNrcykgPT4gSlNPTi5zdHJpbmdpZnkoYXR0YWNrcykgPT09IEpTT04uc3RyaW5naWZ5KGNvcmQpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBjb3JkID0gW19yYW5kTnVtKCksIF9yYW5kTnVtKCldO1xuICAgICAgICByZXR1cm4gaXNQcmV2aW91c0F0dGFjayh4LCB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChnZXRJc0NvbXB1dGVyKCkgPT09IHRydWUpIHtcbiAgICAgIGlzUHJldmlvdXNBdHRhY2soY29yZCk7XG4gICAgICBhdHRhY2soY29yZCwgZ2FtZUJvYXJkKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0QXR0YWNrc1NlbnQgPSAoKSA9PiBhdHRhY2tzU2VudDtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGlzVHVybixcbiAgICBjaGFuZ2VUdXJuLFxuICAgIGF0dGFjayxcbiAgICBnZXRJc0NvbXB1dGVyLFxuICAgIHJhbmRvbUF0dGFjayxcbiAgICBnZXRBdHRhY2tzU2VudCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIG5hbWUsIGhpdHMgPSAwLCBzdW5rID0gZmFsc2UpID0+IHtcbiAgbGV0IGNvb3JkaW5hdGVzO1xuICBjb25zdCBoaXQgPSAodmFsdWUpID0+IChoaXRzID0gaGl0cyArIHZhbHVlKTtcbiAgY29uc3QgZ2V0Q29vcmRpbmF0ZXMgPSAoKSA9PiBjb29yZGluYXRlcztcbiAgY29uc3Qgc2V0Q29vcmRpbmF0ZXMgPSAoY29yZHMpID0+IHtcbiAgICBjb29yZGluYXRlcyA9IGNvcmRzO1xuICB9O1xuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gc3VuaztcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudExlbmd0aCA9IGdldExlbmd0aCgpO1xuICAgIGNvbnN0IGN1cnJlbnRIaXRzID0gZ2V0SGl0cygpO1xuICAgIGlmIChjdXJyZW50SGl0cyA+PSBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VuayA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0U3VuaygpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBnZXRMZW5ndGgsXG4gICAgaGl0LFxuICAgIGdldEhpdHMsXG4gICAgaXNTdW5rLFxuICAgIGdldENvb3JkaW5hdGVzLFxuICAgIHNldENvb3JkaW5hdGVzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL21vZHVsZXMvZ2FtZUJvYXJkLmpzJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL21vZHVsZXMvc2hpcC5qcyc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL21vZHVsZXMvcGxheWVyLmpzJztcbmltcG9ydCB7IGdhbWVTZXR1cCB9IGZyb20gJy4vbW9kdWxlcy9nYW1lTG9naWMuanMnO1xuXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmdhbWVTZXR1cCgnam9obicpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9