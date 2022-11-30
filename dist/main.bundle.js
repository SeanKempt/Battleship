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
        gameSquares.push([row[j], col[i]]);
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
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/modules/gameBoard.js");
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






console.log(`i'm running`);
(0,_modules_gameLogic_js__WEBPACK_IMPORTED_MODULE_3__.gameSetup)(`john`);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsNkJBQTZCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUwRDs7Ozs7Ozs7Ozs7Ozs7O0FDckMxRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQyxzQkFBc0IsZ0JBQWdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RGE7QUFDTTtBQUNWO0FBSUk7O0FBRWxDO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCLDZCQUE2QixxREFBUztBQUN0Qyx5QkFBeUIsK0NBQU07QUFDL0Isa0NBQWtDLHFEQUFTOztBQUUzQztBQUNBLGtCQUFrQiwyQ0FBSTtBQUN0QixxQkFBcUIsMkNBQUk7QUFDekIsb0JBQW9CLDJDQUFJO0FBQ3hCLG9CQUFvQiwyQ0FBSTtBQUN4QixxQkFBcUIsMkNBQUk7O0FBRXpCLCtCQUErQiw2Q0FBNkM7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFLDZFQUFxQjs7QUFFdkIsRUFBRSwrRUFBdUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRHJCO0FBQ3dDOztBQUV4QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7O0FDMURsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWdCOzs7Ozs7O1VDL0JoQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNWO0FBQ0k7QUFDTTs7QUFFOUI7QUFDckI7QUFDQSxnRUFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb21DaGFuZ2VzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVMb2dpYy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpO1xuXG5jb25zdCByZW5kZXJQbGF5ZXJHYW1lQm9hcmQgPSAoZ2FtZUJvYXJkU3F1YXJlcykgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVCb2FyZFNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmUuZGF0YXNldC5jb3JkID0gZ2FtZUJvYXJkU3F1YXJlc1tpXTtcbiAgICBzcXVhcmUuaW5uZXJIVE1MID0gJyc7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2dhbWVTcXVhcmUnKTtcbiAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG59O1xuXG5jb25zdCBhdHRhY2tFdmVudExpc3RlbmVyID0gKGVsZW1lbnQsIHBsYXllck9iaiwgZW5lbXlCb2FyZCwgY29yZCkgPT4ge1xuICBjb3JkID0gY29yZC5yZXBsYWNlQWxsKCcsJywgJycpO1xuICBjb25zdCBzdHJpbmdzID0gWy4uLmNvcmRdO1xuICBjb25zdCBuZXdDb3JkID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIG5ld0NvcmQucHVzaChwYXJzZUludChzdHJpbmdzW2ldKSk7XG4gIH1cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwbGF5ZXJPYmouYXR0YWNrKG5ld0NvcmQsIGVuZW15Qm9hcmQpO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkID0gKGdhbWVCb2FyZFNxdWFyZXMsIHBsYXllck9iaiwgZW5lbXlCb2FyZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVCb2FyZFNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmUuZGF0YXNldC5jb3JkID0gZ2FtZUJvYXJkU3F1YXJlc1tpXTtcbiAgICBsZXQgY29yZCA9IHNxdWFyZS5kYXRhc2V0LmNvcmQ7XG4gICAgc3F1YXJlLmlubmVySFRNTCA9ICcnO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdnYW1lU3F1YXJlJyk7XG4gICAgYXR0YWNrRXZlbnRMaXN0ZW5lcihzcXVhcmUsIHBsYXllck9iaiwgZW5lbXlCb2FyZCwgY29yZCk7XG4gICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG59O1xuXG5leHBvcnQgeyByZW5kZXJQbGF5ZXJHYW1lQm9hcmQsIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkIH07XG4iLCJjb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBzaGlwc09uQm9hcmQgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgc2hpcFRvUGxhY2UpID0+IHtcbiAgICBzaGlwVG9QbGFjZS5zZXRDb29yZGluYXRlcyh4LCB5KTtcbiAgICBzaGlwc09uQm9hcmQucHVzaChzaGlwVG9QbGFjZSk7XG4gIH07XG5cbiAgY29uc3Qgcm93ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldO1xuICBjb25zdCBjb2wgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG4gIGNvbnN0IGdhbWVTcXVhcmVzID0gW107XG4gIGNvbnN0IGdlbmVyYXRlU3F1YXJlcyA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2wubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZ2FtZVNxdWFyZXMucHVzaChbcm93W2pdLCBjb2xbaV1dKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZ2VuZXJhdGVTcXVhcmVzKCk7XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3QgaGl0U2hpcCA9IHNoaXBzT25Cb2FyZC5maW5kKFxuICAgICAgKG9iaikgPT4gSlNPTi5zdHJpbmdpZnkob2JqLmdldENvb3JkaW5hdGVzKCkpID09PSBKU09OLnN0cmluZ2lmeShbeCwgeV0pXG4gICAgKTtcbiAgICBpZiAoaGl0U2hpcCkge1xuICAgICAgaGl0U2hpcC5oaXQoMSk7XG4gICAgICByZXR1cm4gJ0F0dGFjayBzdWNjZXNzZnVsISc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZEF0dGFja3MucHVzaChbeCwgeV0pO1xuICAgICAgcmV0dXJuICdUaGUgYXR0YWNrIG1pc3NlZCEnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRHYW1lU3F1YXJlcyA9ICgpID0+IGdhbWVTcXVhcmVzO1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBzT25Cb2FyZC5ldmVyeSgob2JqKSA9PiBvYmouaXNTdW5rKCkgPT09IHRydWUpO1xuICB9O1xuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4gbWlzc2VkQXR0YWNrcztcblxuICBjb25zdCBnZXRTaGlwc09uQm9hcmQgPSAoKSA9PiBzaGlwc09uQm9hcmQ7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgZ2V0TWlzc2VkQXR0YWNrcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzT25Cb2FyZCxcbiAgICBhbGxTdW5rLFxuICAgIGdldEdhbWVTcXVhcmVzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7XG4gIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkLFxuICByZW5kZXJQbGF5ZXJHYW1lQm9hcmQsXG59IGZyb20gJy4uL21vZHVsZXMvZG9tQ2hhbmdlcy5qcyc7XG5cbmNvbnN0IGdhbWVTZXR1cCA9IChwbGF5ZXJOYW1lKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZSA9IFBsYXllcihwbGF5ZXJOYW1lKTtcbiAgY29uc3QgcGxheWVyT25lR2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gUGxheWVyKCdDb21wdXRlcicsIHRydWUpO1xuICBjb25zdCBjb21wdXRlclBsYXllckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIC8vY3JlYXRlIHRoZSBzaGlwcyB0aGF0IGFyZSB0byBiZSB1c2VkIG9uIHRoZSBnYW1lYm9hcmRzXG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKDUsICdjYXJyaWVyJyk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKDQsICdiYXR0bGVzaGlwJyk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoMywgJ2Rlc3Ryb3llcicpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKDMsICdzdWJtYXJpbmUnKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IFNoaXAoMiwgJ1BhdHJvbCBCb2F0Jyk7XG5cbiAgLy9wbGFjZSBzaGlwcyBvbiB0aGUgYm9hcmRzOyB3aWxsIG5lZWQgdG8gYXV0b21hdGUgdGhpcyBzb21laG93IGxhdGVyIG9uOyBhZGQgY29uc3RyYWludHMgc28gdGhhdCB3YXkgY2FuJ3QgcGxhY2Ugb3V0c2lkZSB0aGUgYm9hcmRcbiAgcGxheWVyT25lR2FtZUJvYXJkLnBsYWNlU2hpcChbMCwgMF0sIFswLCA1XSwgY2Fycmllcik7XG4gIHBsYXllck9uZUdhbWVCb2FyZC5wbGFjZVNoaXAoWzksIDBdLCBbOSwgM10sIGJhdHRsZXNoaXApO1xuICBwbGF5ZXJPbmVHYW1lQm9hcmQucGxhY2VTaGlwKFszLCA1XSwgWzUsIDVdLCBkZXN0cm95ZXIpO1xuICBwbGF5ZXJPbmVHYW1lQm9hcmQucGxhY2VTaGlwKFs3LCA3XSwgWzksIDddLCBzdWJtYXJpbmUpO1xuICBwbGF5ZXJPbmVHYW1lQm9hcmQucGxhY2VTaGlwKFs4LCA4XSwgWzksIDhdLCBwYXRyb2xCb2F0KTtcblxuICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoWzAsIDBdLCBbMCwgNV0sIGNhcnJpZXIpO1xuICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoWzksIDBdLCBbOSwgM10sIGJhdHRsZXNoaXApO1xuICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoWzMsIDVdLCBbNSwgNV0sIGRlc3Ryb3llcik7XG4gIGNvbXB1dGVyUGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChbNywgN10sIFs5LCA3XSwgc3VibWFyaW5lKTtcbiAgY29tcHV0ZXJQbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKFs4LCA4XSwgWzksIDhdLCBwYXRyb2xCb2F0KTtcblxuICBjb25zdCB3aG9zVHVybiA9ICgpID0+IHtcbiAgICBpZiAocGxheWVyT25lLmlzVHVybigpID09PSB0cnVlICYmIGNvbXB1dGVyUGxheWVyLmlzVHVybigpID09PSBmYWxzZSlcbiAgICAgIHBsYXllck9uZTtcbiAgICBpZiAocGxheWVyT25lLmlzVHVybigpID09PSBmYWxzZSAmJiBjb21wdXRlclBsYXllci5pc1R1cm4oKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbXB1dGVyUGxheWVyO1xuICB9O1xuXG4gIGxldCBjdXJyZW50VHVybiA9IHdob3NUdXJuKCk7XG5cbiAgcmVuZGVyUGxheWVyR2FtZUJvYXJkKHBsYXllck9uZUdhbWVCb2FyZC5nZXRHYW1lU3F1YXJlcygpKTtcblxuICByZW5kZXJDb21wdXRlckdhbWVCb2FyZChcbiAgICBjb21wdXRlclBsYXllckdhbWVCb2FyZC5nZXRHYW1lU3F1YXJlcygpLFxuICAgIHBsYXllck9uZSxcbiAgICBjb21wdXRlclBsYXllckdhbWVCb2FyZFxuICApO1xufTtcblxuZXhwb3J0IHsgZ2FtZVNldHVwIH07XG4iLCIvL21pZ2h0IG5lZWQgdG8gbG9vayBpbnRvIGNyZWF0aW5nIHRoZSBnYW1lYm9hcmQgb24gdGhlIHBsYXllcnMgdGhlbXNlbHZlc1xuaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSAnLi9nYW1lQm9hcmQnO1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSwgaXNDb21wdXRlciA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGF0dGFja3NTZW50ID0gW107XG5cbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+XG4gICAgcGxheWVyVHVybiA9PT0gdHJ1ZSA/IChwbGF5ZXJUdXJuID0gZmFsc2UpIDogKHBsYXllclR1cm4gPSB0cnVlKTtcblxuICBjb25zdCBhdHRhY2sgPSAoeCwgeSwgYm9hcmQpID0+IHtcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIGF0dGFja3NTZW50LnB1c2goW3gsIHldKTtcbiAgICBjaGFuZ2VUdXJuKCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0SXNDb21wdXRlciA9ICgpID0+IGlzQ29tcHV0ZXI7XG4gIGxldCBwbGF5ZXJUdXJuID0gdHJ1ZTtcblxuICBjb25zdCBpc1R1cm4gPSAoKSA9PiBwbGF5ZXJUdXJuO1xuXG4gIGNvbnN0IF9yYW5kTnVtID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IChnYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCB4ID0gW19yYW5kTnVtKCksIF9yYW5kTnVtKCldO1xuICAgIGNvbnN0IHkgPSBbX3JhbmROdW0oKSwgX3JhbmROdW0oKV07XG4gICAgY29uc3QgaXNQcmV2aW91c0F0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGF0dGFja3NTZW50LnNvbWUoXG4gICAgICAgICAgKGF0dGFja3MpID0+IEpTT04uc3RyaW5naWZ5KGF0dGFja3MpID09PSBKU09OLnN0cmluZ2lmeShbeCwgeV0pXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICB4ID0gW19yYW5kTnVtKCksIF9yYW5kTnVtKCldO1xuICAgICAgICB5ID0gW19yYW5kTnVtKCksIF9yYW5kTnVtKCldO1xuICAgICAgICByZXR1cm4gaXNQcmV2aW91c0F0dGFjayh4LCB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChnZXRJc0NvbXB1dGVyKCkgPT09IHRydWUpIHtcbiAgICAgIGlzUHJldmlvdXNBdHRhY2soeCwgeSk7XG4gICAgICBhdHRhY2soeCwgeSwgZ2FtZUJvYXJkKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0QXR0YWNrc1NlbnQgPSAoKSA9PiBhdHRhY2tzU2VudDtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGlzVHVybixcbiAgICBjaGFuZ2VUdXJuLFxuICAgIGF0dGFjayxcbiAgICBnZXRJc0NvbXB1dGVyLFxuICAgIHJhbmRvbUF0dGFjayxcbiAgICBnZXRBdHRhY2tzU2VudCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIG5hbWUsIGhpdHMgPSAwLCBzdW5rID0gZmFsc2UpID0+IHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcbiAgY29uc3QgaGl0ID0gKHZhbHVlKSA9PiAoaGl0cyA9IGhpdHMgKyB2YWx1ZSk7XG4gIGNvbnN0IGdldENvb3JkaW5hdGVzID0gKCkgPT4gY29vcmRpbmF0ZXM7XG4gIGNvbnN0IHNldENvb3JkaW5hdGVzID0gKHgsIHkpID0+IGNvb3JkaW5hdGVzLnB1c2goeCwgeSk7XG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldFN1bmsgPSAoKSA9PiBzdW5rO1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgY3VycmVudEhpdHMgPSBnZXRIaXRzKCk7XG4gICAgaWYgKGN1cnJlbnRIaXRzID49IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdW5rID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBnZXRTdW5rKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGdldExlbmd0aCxcbiAgICBoaXQsXG4gICAgZ2V0SGl0cyxcbiAgICBpc1N1bmssXG4gICAgZ2V0Q29vcmRpbmF0ZXMsXG4gICAgc2V0Q29vcmRpbmF0ZXMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gJy4vbW9kdWxlcy9nYW1lQm9hcmQuanMnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vbW9kdWxlcy9zaGlwLmpzJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vbW9kdWxlcy9wbGF5ZXIuanMnO1xuaW1wb3J0IHsgZ2FtZVNldHVwIH0gZnJvbSAnLi9tb2R1bGVzL2dhbWVMb2dpYy5qcyc7XG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuY29uc29sZS5sb2coYGknbSBydW5uaW5nYCk7XG5nYW1lU2V0dXAoYGpvaG5gKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==