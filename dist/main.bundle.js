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

//player obj is the player that is created when the game starts. Not the computer. computer is the cpuObj.
//cpuBoard is the computers gameBoard. since that is the only one that is receiving attacks from the player clicking on the board.
const renderComputerGameBoard = (cpuBoard, playerObj, cpuObj, playerBoard) => {
  const cpuSquares = cpuBoard.getBoard();
  for (let i = 0; i < cpuSquares.length; i++) {
    for (let j = 0; j < cpuSquares[i].length; j++) {
      const square = document.createElement('div');
      square.dataset.cord = [[i], [j]];
      let cord = square.dataset.cord;
      square.innerHTML = '';
      square.classList.add('gameSquare');
      attackEventListener(
        square,
        playerObj,
        cpuBoard,
        cpuObj,
        playerBoard,
        cord
      );
      computerBoard.appendChild(square);
    }
  }
};

//if clicked it checks if its the players turn; if its the players turn then it launches the attack and changes the turns for both the player and the computer
const attackEventListener = (
  element,
  playerObj,
  enemyBoard,
  enemyObj,
  playerBoard,
  cord
) => {
  cord = cord.replaceAll(',', '');
  const strings = [...cord];
  const newCord = [];
  for (var i = 0; i < strings.length; i++) {
    newCord.push(parseInt(strings[i]));
  }
  element.addEventListener(
    'click',
    () => {
      const [x, y] = newCord;
      //what happens when its not the players turn and starts with the computer? Its going to break.
      if (playerObj.isTurn() === true) {
        playerObj.attack(x, y, enemyBoard);
        playerObj.changeTurn();
        enemyObj.changeTurn();
      }

      if (enemyObj.isTurn() === true) {
        enemyObj.randomAttack(playerBoard);
        enemyObj.changeTurn();
        playerObj.changeTurn();
      }
    },
    { once: true }
  );
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


const GameBoard = (name) => {
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
        if (attackedShip.isSunk()) {
          console.log(`${attackedShip.name} has been sunk!!!`);
          _isGameOver();
        }
        console.log('Attack Successful!');
      } else {
        pastAttacks.push(attack);
        console.log(`Attack Missed!`);
      }
    }
  };

  const randAttack = (x, y) => {
    const attack = [x, y];
    let attackedShip = board[attack[0]][attack[1]];
    let attackedSquareParent = document.querySelector('div#player-board');
    let attackedSquare = attackedSquareParent.querySelector(
      `[data-cord='${x},${y}']`
    );

    if (attackedShip) {
      pastAttacks.push(attack);
      attackedShip.hit(1);
      attackedSquare.style.backgroundColor = 'pink';
      if (attackedShip.isSunk()) {
        console.log(`${attackedShip.name} has been sunk!!!`);
        _isGameOver();
      }
      console.log('Attack Successful!');
    } else {
      attackedSquare.style.backgroundColor = 'blue';
      pastAttacks.push(attack);
      console.log(`Attack Missed!`);
    }
  };

  const _isGameOver = () => {
    if (allSunk()) {
      alert(`Game is over!`);
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
    name,
    placeShip,
    getPastAttacks,
    receiveAttack,
    allSunk,
    board,
    getBoard,
    getShips,
    randAttack,
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
  const playerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.GameBoard)('playerBoard');
  const playerOne = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('Sean', true);

  const computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.GameBoard)('computerBoard');
  const cpu = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('computer', false, true);

  //put the ships on the board for the player and computer
  shipSetup(playerBoard);
  shipSetup(computerBoard);

  //render the squares on the UI
  (0,_domChanges__WEBPACK_IMPORTED_MODULE_2__.renderComputerGameBoard)(computerBoard, playerOne, cpu, playerBoard);
  (0,_domChanges__WEBPACK_IMPORTED_MODULE_2__.renderPlayerGameBoard)(playerBoard);

  //turn based actions...
  // need to create game loop somehow

  //while loop???
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


const Player = (name, turn = false, isComputer = false) => {
  const attacksSent = [];

  const changeTurn = () => (turn === true ? (turn = false) : (turn = true));

  const attack = (x, y, enemyBoard) => {
    enemyBoard.receiveAttack(x, y);
  };

  const randomAttack = (enemyBoard, x = _randNum(), y = _randNum()) => {
    const checkAttack = _isPreviousAttack(x, y, getAttacksSent());

    if (checkAttack === true) {
      x = _randNum();
      y = _randNum();
      randomAttack(enemyBoard, x, y);
    } else {
      attacksSent.push([x, y]);
      enemyBoard.randAttack(x, y);
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

  const _randNum = () => {
    return Math.floor(Math.random() * 10);
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

  const isTurn = () => turn;

  const getIsComputer = () => isComputer;

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
  const hit = (value) => {
    hits = hits + value;
    isSunk();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7O0FDbEVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVnQjs7Ozs7OztVQzlCaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOcUI7QUFDOEI7O0FBRW5ELGdFQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2RvbUNoYW5nZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUxvZ2ljLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWJvYXJkJyk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyLWJvYXJkJyk7XG5cbmNvbnN0IHJlbmRlclBsYXllckdhbWVCb2FyZCA9IChib2FyZCkgPT4ge1xuICBjb25zdCBib2FyZFNxdWFyZXMgPSBib2FyZC5nZXRCb2FyZCgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkU3F1YXJlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRTcXVhcmVzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvcmQgPSBbW2ldLCBbal1dO1xuICAgICAgc3F1YXJlLmlubmVySFRNTCA9ICcnO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2dhbWVTcXVhcmUnKTtcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG59O1xuXG4vL3BsYXllciBvYmogaXMgdGhlIHBsYXllciB0aGF0IGlzIGNyZWF0ZWQgd2hlbiB0aGUgZ2FtZSBzdGFydHMuIE5vdCB0aGUgY29tcHV0ZXIuIGNvbXB1dGVyIGlzIHRoZSBjcHVPYmouXG4vL2NwdUJvYXJkIGlzIHRoZSBjb21wdXRlcnMgZ2FtZUJvYXJkLiBzaW5jZSB0aGF0IGlzIHRoZSBvbmx5IG9uZSB0aGF0IGlzIHJlY2VpdmluZyBhdHRhY2tzIGZyb20gdGhlIHBsYXllciBjbGlja2luZyBvbiB0aGUgYm9hcmQuXG5jb25zdCByZW5kZXJDb21wdXRlckdhbWVCb2FyZCA9IChjcHVCb2FyZCwgcGxheWVyT2JqLCBjcHVPYmosIHBsYXllckJvYXJkKSA9PiB7XG4gIGNvbnN0IGNwdVNxdWFyZXMgPSBjcHVCb2FyZC5nZXRCb2FyZCgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNwdVNxdWFyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNwdVNxdWFyZXNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc3F1YXJlLmRhdGFzZXQuY29yZCA9IFtbaV0sIFtqXV07XG4gICAgICBsZXQgY29yZCA9IHNxdWFyZS5kYXRhc2V0LmNvcmQ7XG4gICAgICBzcXVhcmUuaW5uZXJIVE1MID0gJyc7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnZ2FtZVNxdWFyZScpO1xuICAgICAgYXR0YWNrRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgc3F1YXJlLFxuICAgICAgICBwbGF5ZXJPYmosXG4gICAgICAgIGNwdUJvYXJkLFxuICAgICAgICBjcHVPYmosXG4gICAgICAgIHBsYXllckJvYXJkLFxuICAgICAgICBjb3JkXG4gICAgICApO1xuICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxufTtcblxuLy9pZiBjbGlja2VkIGl0IGNoZWNrcyBpZiBpdHMgdGhlIHBsYXllcnMgdHVybjsgaWYgaXRzIHRoZSBwbGF5ZXJzIHR1cm4gdGhlbiBpdCBsYXVuY2hlcyB0aGUgYXR0YWNrIGFuZCBjaGFuZ2VzIHRoZSB0dXJucyBmb3IgYm90aCB0aGUgcGxheWVyIGFuZCB0aGUgY29tcHV0ZXJcbmNvbnN0IGF0dGFja0V2ZW50TGlzdGVuZXIgPSAoXG4gIGVsZW1lbnQsXG4gIHBsYXllck9iaixcbiAgZW5lbXlCb2FyZCxcbiAgZW5lbXlPYmosXG4gIHBsYXllckJvYXJkLFxuICBjb3JkXG4pID0+IHtcbiAgY29yZCA9IGNvcmQucmVwbGFjZUFsbCgnLCcsICcnKTtcbiAgY29uc3Qgc3RyaW5ncyA9IFsuLi5jb3JkXTtcbiAgY29uc3QgbmV3Q29yZCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICBuZXdDb3JkLnB1c2gocGFyc2VJbnQoc3RyaW5nc1tpXSkpO1xuICB9XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnY2xpY2snLFxuICAgICgpID0+IHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IG5ld0NvcmQ7XG4gICAgICAvL3doYXQgaGFwcGVucyB3aGVuIGl0cyBub3QgdGhlIHBsYXllcnMgdHVybiBhbmQgc3RhcnRzIHdpdGggdGhlIGNvbXB1dGVyPyBJdHMgZ29pbmcgdG8gYnJlYWsuXG4gICAgICBpZiAocGxheWVyT2JqLmlzVHVybigpID09PSB0cnVlKSB7XG4gICAgICAgIHBsYXllck9iai5hdHRhY2soeCwgeSwgZW5lbXlCb2FyZCk7XG4gICAgICAgIHBsYXllck9iai5jaGFuZ2VUdXJuKCk7XG4gICAgICAgIGVuZW15T2JqLmNoYW5nZVR1cm4oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuZW15T2JqLmlzVHVybigpID09PSB0cnVlKSB7XG4gICAgICAgIGVuZW15T2JqLnJhbmRvbUF0dGFjayhwbGF5ZXJCb2FyZCk7XG4gICAgICAgIGVuZW15T2JqLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgcGxheWVyT2JqLmNoYW5nZVR1cm4oKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59O1xuXG5leHBvcnQgeyByZW5kZXJQbGF5ZXJHYW1lQm9hcmQsIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR2FtZUJvYXJkID0gKG5hbWUpID0+IHtcbiAgY29uc3QgcGFzdEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBzaGlwcyA9IHt9O1xuXG4gIGNvbnN0IGJvYXJkID0gW1xuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAobmFtZSwgY29yZHMpID0+IHtcbiAgICBzaGlwc1tuYW1lXSA9IFNoaXAoY29yZHMubGVuZ3RoLCBuYW1lLCBjb3Jkcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBjb3Jkc1tpXTtcbiAgICAgIGJvYXJkW3hdW3ldID0gc2hpcHNbbmFtZV07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgX2FycmF5aXNQcmVzZW50ID0gKGEsIGIpID0+IHtcbiAgICBhID0gSlNPTi5zdHJpbmdpZnkoYSk7XG4gICAgYiA9IEpTT04uc3RyaW5naWZ5KGIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGEuaW5kZXhPZihiKTtcbiAgICBpZiAocmVzdWx0ICE9IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBhdHRhY2sgPSBbeCwgeV07XG4gICAgY29uc3QgcGFzdEF0dGFja3MgPSBnZXRQYXN0QXR0YWNrcygpO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBib2FyZFthdHRhY2tbMF1dW2F0dGFja1sxXV07XG4gICAgbGV0IGNoZWNrQXR0YWNrID0gX2FycmF5aXNQcmVzZW50KHBhc3RBdHRhY2tzLCBhdHRhY2spO1xuXG4gICAgaWYgKGNoZWNrQXR0YWNrID09PSBmYWxzZSkge1xuICAgICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgICBwYXN0QXR0YWNrcy5wdXNoKGF0dGFjayk7XG4gICAgICAgIGF0dGFja2VkU2hpcC5oaXQoMSk7XG4gICAgICAgIGlmIChhdHRhY2tlZFNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHthdHRhY2tlZFNoaXAubmFtZX0gaGFzIGJlZW4gc3VuayEhIWApO1xuICAgICAgICAgIF9pc0dhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBTdWNjZXNzZnVsIScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFzdEF0dGFja3MucHVzaChhdHRhY2spO1xuICAgICAgICBjb25zb2xlLmxvZyhgQXR0YWNrIE1pc3NlZCFgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmFuZEF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3QgYXR0YWNrID0gW3gsIHldO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBib2FyZFthdHRhY2tbMF1dW2F0dGFja1sxXV07XG4gICAgbGV0IGF0dGFja2VkU3F1YXJlUGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3BsYXllci1ib2FyZCcpO1xuICAgIGxldCBhdHRhY2tlZFNxdWFyZSA9IGF0dGFja2VkU3F1YXJlUGFyZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtY29yZD0nJHt4fSwke3l9J11gXG4gICAgKTtcblxuICAgIGlmIChhdHRhY2tlZFNoaXApIHtcbiAgICAgIHBhc3RBdHRhY2tzLnB1c2goYXR0YWNrKTtcbiAgICAgIGF0dGFja2VkU2hpcC5oaXQoMSk7XG4gICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncGluayc7XG4gICAgICBpZiAoYXR0YWNrZWRTaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke2F0dGFja2VkU2hpcC5uYW1lfSBoYXMgYmVlbiBzdW5rISEhYCk7XG4gICAgICAgIF9pc0dhbWVPdmVyKCk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygnQXR0YWNrIFN1Y2Nlc3NmdWwhJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJztcbiAgICAgIHBhc3RBdHRhY2tzLnB1c2goYXR0YWNrKTtcbiAgICAgIGNvbnNvbGUubG9nKGBBdHRhY2sgTWlzc2VkIWApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBfaXNHYW1lT3ZlciA9ICgpID0+IHtcbiAgICBpZiAoYWxsU3VuaygpKSB7XG4gICAgICBhbGVydChgR2FtZSBpcyBvdmVyIWApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgIGxldCByZXN1bHRzID0gT2JqZWN0LnZhbHVlcyhzaGlwcyk7XG4gICAgY29uc3Qgc3Vua1NoaXAgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN1bmtTaGlwLnB1c2gocmVzdWx0c1tpXS5pc1N1bmsoKSk7XG4gICAgfVxuICAgIGNvbnN0IGNoZWNrU3Vua1NoaXBzID0gc3Vua1NoaXAuZXZlcnkoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IHRydWUpO1xuICAgIGlmIChjaGVja1N1bmtTaGlwcyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0UGFzdEF0dGFja3MgPSAoKSA9PiBwYXN0QXR0YWNrcztcblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHNoaXBzO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBwbGFjZVNoaXAsXG4gICAgZ2V0UGFzdEF0dGFja3MsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTdW5rLFxuICAgIGJvYXJkLFxuICAgIGdldEJvYXJkLFxuICAgIGdldFNoaXBzLFxuICAgIHJhbmRBdHRhY2ssXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lQm9hcmQgfTtcbiIsIi8vY3JlYXRlIHRoZSB0dXJuIGJhc2VkIHBsYXkgYW5kIGxvZ2ljXG4vL2FmdGVyIG9uZSBwbGF5ZXIgYXR0YWNrcyB0aGVuIGl0IGdvZXMgdG8gdGhlIG5leHQgcGxheWVycyB0dXJuIGFuZCBzbyBvbiB1bnRpbGwgb25lIHBsYXllcnMgc2hpcHMgYXJlIGFsbCBzdW5rLlxuXG5pbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyByZW5kZXJDb21wdXRlckdhbWVCb2FyZCwgcmVuZGVyUGxheWVyR2FtZUJvYXJkIH0gZnJvbSAnLi9kb21DaGFuZ2VzJztcblxuY29uc3Qgc2hpcFNldHVwID0gKGJvYXJkKSA9PiB7XG4gIGJvYXJkLnBsYWNlU2hpcCgnY2FycmllcicsIFtcbiAgICBbMCwgMF0sXG4gICAgWzAsIDFdLFxuICAgIFswLCAyXSxcbiAgICBbMCwgM10sXG4gICAgWzAsIDRdLFxuICBdKTtcblxuICBib2FyZC5wbGFjZVNoaXAoJ2JhdHRsZXNoaXAnLCBbXG4gICAgWzYsIDBdLFxuICAgIFs3LCAwXSxcbiAgICBbOCwgMF0sXG4gICAgWzksIDBdLFxuICBdKTtcblxuICBib2FyZC5wbGFjZVNoaXAoJ2Rlc3Ryb3llcicsIFtcbiAgICBbNCwgNV0sXG4gICAgWzQsIDZdLFxuICAgIFs0LCA3XSxcbiAgXSk7XG5cbiAgYm9hcmQucGxhY2VTaGlwKCdzdWJtYXJpbmUnLCBbXG4gICAgWzQsIDhdLFxuICAgIFs1LCA4XSxcbiAgICBbNiwgOF0sXG4gIF0pO1xuXG4gIGJvYXJkLnBsYWNlU2hpcCgncGF0cm9sIGJvYXQnLCBbXG4gICAgWzksIDJdLFxuICAgIFs5LCAzXSxcbiAgXSk7XG59O1xuXG5jb25zdCBnYW1lU2V0dXAgPSAoKSA9PiB7XG4gIC8vY3JlYXRlIHBsYXllciBhbmQgY29tcHV0ZXIgb2JqZWN0cyBhbmQgYm9hcmRzXG4gIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZUJvYXJkKCdwbGF5ZXJCb2FyZCcpO1xuICBjb25zdCBwbGF5ZXJPbmUgPSBQbGF5ZXIoJ1NlYW4nLCB0cnVlKTtcblxuICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZUJvYXJkKCdjb21wdXRlckJvYXJkJyk7XG4gIGNvbnN0IGNwdSA9IFBsYXllcignY29tcHV0ZXInLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgLy9wdXQgdGhlIHNoaXBzIG9uIHRoZSBib2FyZCBmb3IgdGhlIHBsYXllciBhbmQgY29tcHV0ZXJcbiAgc2hpcFNldHVwKHBsYXllckJvYXJkKTtcbiAgc2hpcFNldHVwKGNvbXB1dGVyQm9hcmQpO1xuXG4gIC8vcmVuZGVyIHRoZSBzcXVhcmVzIG9uIHRoZSBVSVxuICByZW5kZXJDb21wdXRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLCBwbGF5ZXJPbmUsIGNwdSwgcGxheWVyQm9hcmQpO1xuICByZW5kZXJQbGF5ZXJHYW1lQm9hcmQocGxheWVyQm9hcmQpO1xuXG4gIC8vdHVybiBiYXNlZCBhY3Rpb25zLi4uXG4gIC8vIG5lZWQgdG8gY3JlYXRlIGdhbWUgbG9vcCBzb21laG93XG5cbiAgLy93aGlsZSBsb29wPz8/XG59O1xuXG5leHBvcnQgeyBnYW1lU2V0dXAgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gJy4vZ2FtZUJvYXJkJztcblxuY29uc3QgUGxheWVyID0gKG5hbWUsIHR1cm4gPSBmYWxzZSwgaXNDb21wdXRlciA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGF0dGFja3NTZW50ID0gW107XG5cbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+ICh0dXJuID09PSB0cnVlID8gKHR1cm4gPSBmYWxzZSkgOiAodHVybiA9IHRydWUpKTtcblxuICBjb25zdCBhdHRhY2sgPSAoeCwgeSwgZW5lbXlCb2FyZCkgPT4ge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgfTtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSAoZW5lbXlCb2FyZCwgeCA9IF9yYW5kTnVtKCksIHkgPSBfcmFuZE51bSgpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tBdHRhY2sgPSBfaXNQcmV2aW91c0F0dGFjayh4LCB5LCBnZXRBdHRhY2tzU2VudCgpKTtcblxuICAgIGlmIChjaGVja0F0dGFjayA9PT0gdHJ1ZSkge1xuICAgICAgeCA9IF9yYW5kTnVtKCk7XG4gICAgICB5ID0gX3JhbmROdW0oKTtcbiAgICAgIHJhbmRvbUF0dGFjayhlbmVteUJvYXJkLCB4LCB5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0YWNrc1NlbnQucHVzaChbeCwgeV0pO1xuICAgICAgZW5lbXlCb2FyZC5yYW5kQXR0YWNrKHgsIHkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBfYXJyYXlpc1ByZXNlbnQgPSAoYSwgYikgPT4ge1xuICAgIGEgPSBKU09OLnN0cmluZ2lmeShhKTtcbiAgICBiID0gSlNPTi5zdHJpbmdpZnkoYik7XG4gICAgY29uc3QgcmVzdWx0ID0gYS5pbmRleE9mKGIpO1xuICAgIGlmIChyZXN1bHQgIT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IF9yYW5kTnVtID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIH07XG5cbiAgY29uc3QgX2lzUHJldmlvdXNBdHRhY2sgPSAoeCwgeSwgcGFzdEF0dGFja3MpID0+IHtcbiAgICBsZXQgYXR0YWNrID0gW3gsIHldO1xuICAgIGxldCBjaGVja0F0dGFjayA9IF9hcnJheWlzUHJlc2VudChwYXN0QXR0YWNrcywgYXR0YWNrKTtcbiAgICBpZiAoY2hlY2tBdHRhY2sgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNUdXJuID0gKCkgPT4gdHVybjtcblxuICBjb25zdCBnZXRJc0NvbXB1dGVyID0gKCkgPT4gaXNDb21wdXRlcjtcblxuICBjb25zdCBnZXRBdHRhY2tzU2VudCA9ICgpID0+IGF0dGFja3NTZW50O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBpc1R1cm4sXG4gICAgY2hhbmdlVHVybixcbiAgICBhdHRhY2ssXG4gICAgZ2V0SXNDb21wdXRlcixcbiAgICByYW5kb21BdHRhY2ssXG4gICAgZ2V0QXR0YWNrc1NlbnQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBuYW1lLCBjb3JkcywgaGl0cyA9IDAsIHN1bmsgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBoaXQgPSAodmFsdWUpID0+IHtcbiAgICBoaXRzID0gaGl0cyArIHZhbHVlO1xuICAgIGlzU3VuaygpO1xuICB9O1xuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gc3VuaztcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudExlbmd0aCA9IGdldExlbmd0aCgpO1xuICAgIGNvbnN0IGN1cnJlbnRIaXRzID0gZ2V0SGl0cygpO1xuICAgIGlmIChjdXJyZW50SGl0cyA+PSBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VuayA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0U3VuaygpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBnZXRMZW5ndGgsXG4gICAgaGl0LFxuICAgIGdldEhpdHMsXG4gICAgaXNTdW5rLFxuICAgIGNvcmRzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IGdhbWVTZXR1cCB9IGZyb20gJy4vbW9kdWxlcy9nYW1lTG9naWMuanMnO1xuXG5nYW1lU2V0dXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==