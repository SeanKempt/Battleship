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
    for (let i = 0; i < boardSquares.length; i += 1) {
        for (let j = 0; j < boardSquares[i].length; j += 1) {
            const square = document.createElement('div');
            square.dataset.cord = [[i], [j]];
            square.innerHTML = '';
            square.classList.add('gameSquare');
            playerBoard.appendChild(square);
        }
    }
};

const attackEventListener = (element, playerObj, enemyBoard, enemyObj, pBoard, attackCord) => {
    const cord = attackCord.replaceAll(',', '');
    const strings = [...cord];
    const newCord = [];
    for (let i = 0; i < strings.length; i += 1) {
        newCord.push(parseInt(strings[i], 10));
    }
    element.addEventListener(
        'click',
        () => {
            const [x, y] = newCord;
            // what happens when its not the players turn and starts with the computer? Its going to break
            if (playerObj.isTurn() === true) {
                playerObj.sendAttack(x, y, enemyBoard);
                playerObj.changeTurn();
                enemyObj.changeTurn();
            }

            if (enemyObj.isTurn() === true) {
                enemyObj.randomAttack(pBoard);
                enemyObj.changeTurn();
                playerObj.changeTurn();
            }
        },
        { once: true }
    );
};

const renderComputerGameBoard = (cpuBoard, playerObj, cpuObj, pBoard) => {
    const cpuSquares = cpuBoard.getBoard();
    for (let i = 0; i < cpuSquares.length; i += 1) {
        for (let j = 0; j < cpuSquares[i].length; j += 1) {
            const square = document.createElement('div');
            square.dataset.cord = [[i], [j]];
            const { cord } = square.dataset;
            square.innerHTML = '';
            square.classList.add('gameSquare');
            attackEventListener(square, playerObj, cpuBoard, cpuObj, pBoard, cord);
            computerBoard.appendChild(square);
        }
    }
};

// if clicked it checks if its the players turn; if its the players turn then it launches the attack and changes the turns for both the player and the computer




/***/ }),

/***/ "./src/modules/gameBoard.js":
/*!**********************************!*\
  !*** ./src/modules/gameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");



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

    const placeShip = (shipName, cords) => {
        ships[shipName] = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(cords.length, shipName, cords);

        for (let i = 0; i < cords.length; i += 1) {
            const [x, y] = cords[i];
            board[x][y] = ships[shipName];
        }
    };

    const getBoard = () => board;

    const allSunk = () => {
        const results = Object.values(ships);
        const sunkShip = [];
        for (let i = 0; i < results.length; i += 1) {
            sunkShip.push(results[i].isSunk());
        }
        const checkSunkShips = sunkShip.every((element) => element === true);
        if (checkSunkShips === true) {
            return true;
        }
        return false;
    };

    const _isGameOver = () => {
        if (allSunk()) {
            console.log(`Game is over!`);
        }
    };

    const getPastAttacks = () => pastAttacks;

    const receiveAttack = (x, y) => {
        const attack = [x, y];
        const oldAttacks = getPastAttacks();
        const attackedShip = board[attack[0]][attack[1]];
        const checkAttack = (0,_player__WEBPACK_IMPORTED_MODULE_1__.arrayisPresent)(oldAttacks, attack);
        const attackedSquareParent = document.querySelector('div#computer-board');
        const attackedSquare = attackedSquareParent.querySelector(`[data-cord='${x},${y}']`);

        if (checkAttack === false) {
            if (attackedShip) {
                oldAttacks.push(attack);
                attackedShip.hit(1);
                attackedSquare.innerHTML = `&#x1F4A5`;
                attackedSquare.classList.add('hit');
                if (attackedShip.isSunk()) {
                    console.log(`${attackedShip.name} has been sunk!!!`);
                    _isGameOver();
                }
                console.log('Attack Successful!');
            } else {
                oldAttacks.push(attack);
                attackedSquare.style.backgroundColor = 'blue';
                console.log(`Attack Missed!`);
            }
        }
    };

    const randAttack = (x, y) => {
        const attack = [x, y];
        const attackedShip = board[attack[0]][attack[1]];
        const attackedSquareParent = document.querySelector('div#player-board');
        const attackedSquare = attackedSquareParent.querySelector(`[data-cord='${x},${y}']`);

        if (attackedShip) {
            pastAttacks.push(attack);
            attackedShip.hit(1);
            attackedSquare.innerHTML = `&#x1F4A5`;
            attackedSquare.classList.add('hit');
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);


/***/ }),

/***/ "./src/modules/gameLogic.js":
/*!**********************************!*\
  !*** ./src/modules/gameLogic.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/modules/gameBoard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _domChanges__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domChanges */ "./src/modules/domChanges.js");




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
    // create player and computer objects and boards
    const playerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])('playerBoard');
    const playerOne = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('Sean', true);

    const computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])('computerBoard');
    const cpu = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('computer', false, true);

    // put the ships on the board for the player and computer
    shipSetup(playerBoard);
    shipSetup(computerBoard);

    // render the squares on the UI
    (0,_domChanges__WEBPACK_IMPORTED_MODULE_2__.renderComputerGameBoard)(computerBoard, playerOne, cpu, playerBoard);
    (0,_domChanges__WEBPACK_IMPORTED_MODULE_2__.renderPlayerGameBoard)(playerBoard);

    console.log(computerBoard.getBoard());
    console.log(playerBoard.getBoard());

    // turn based actions...
    // need to create game loop somehow

    // while loop???
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameSetup);


/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "arrayisPresent": () => (/* binding */ arrayisPresent)
/* harmony export */ });
const arrayisPresent = (a, b) => {
    const newA = JSON.stringify(a);
    const newB = JSON.stringify(b);
    const result = newA.indexOf(newB);
    if (result !== -1) {
        return true;
    }
    return false;
};

const Player = (name, currentTurn, isComputer = false) => {
    const attacksSent = [];

    let turn = currentTurn;

    const isTurn = () => turn;

    const changeTurn = () => {
        const playerTurn = isTurn();

        if (playerTurn === true) {
            turn = false;
        } else {
            turn = true;
        }
    };

    const sendAttack = (x, y, enemyBoard) => {
        enemyBoard.receiveAttack(x, y);
    };

    const _randNum = () => Math.floor(Math.random() * 10);

    const _isPreviousAttack = (x, y, pastAttacks) => {
        const attack = [x, y];
        const checkAttack = arrayisPresent(pastAttacks, attack);
        if (checkAttack === true) {
            return true;
        }
        return false;
    };

    const getAttacksSent = () => attacksSent;

    const randomAttack = (enemyBoard, x = _randNum(), y = _randNum()) => {
        const checkAttack = _isPreviousAttack(x, y, getAttacksSent());

        if (checkAttack === true) {
            const newX = _randNum();
            const newY = _randNum();
            randomAttack(enemyBoard, newX, newY);
        } else {
            attacksSent.push([x, y]);
            enemyBoard.randAttack(x, y);
        }
    };

    const getIsComputer = () => isComputer;

    return {
        name,
        isTurn,
        changeTurn,
        sendAttack,
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = (length, name, cords) => {
    let hits = 0;
    let sunk = false;

    const getSunk = () => sunk;

    const getLength = () => length;

    const getHits = () => hits;

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

    const hit = (value) => {
        hits += value;
        isSunk();
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


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
/* harmony import */ var _modules_gameLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameLogic */ "./src/modules/gameLogic.js");



(0,_modules_gameLogic__WEBPACK_IMPORTED_MODULE_1__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVrQzs7Ozs7Ozs7Ozs7Ozs7O0FDdEVsQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDcENwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05xQjtBQUN1Qjs7QUFFNUMsOERBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tQ2hhbmdlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lTG9naWMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItYm9hcmQnKTtcblxuY29uc3QgcmVuZGVyUGxheWVyR2FtZUJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgY29uc3QgYm9hcmRTcXVhcmVzID0gYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkU3F1YXJlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkU3F1YXJlc1tpXS5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzcXVhcmUuZGF0YXNldC5jb3JkID0gW1tpXSwgW2pdXTtcbiAgICAgICAgICAgIHNxdWFyZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdnYW1lU3F1YXJlJyk7XG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuY29uc3QgYXR0YWNrRXZlbnRMaXN0ZW5lciA9IChlbGVtZW50LCBwbGF5ZXJPYmosIGVuZW15Qm9hcmQsIGVuZW15T2JqLCBwQm9hcmQsIGF0dGFja0NvcmQpID0+IHtcbiAgICBjb25zdCBjb3JkID0gYXR0YWNrQ29yZC5yZXBsYWNlQWxsKCcsJywgJycpO1xuICAgIGNvbnN0IHN0cmluZ3MgPSBbLi4uY29yZF07XG4gICAgY29uc3QgbmV3Q29yZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBuZXdDb3JkLnB1c2gocGFyc2VJbnQoc3RyaW5nc1tpXSwgMTApKTtcbiAgICB9XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnY2xpY2snLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbeCwgeV0gPSBuZXdDb3JkO1xuICAgICAgICAgICAgLy8gd2hhdCBoYXBwZW5zIHdoZW4gaXRzIG5vdCB0aGUgcGxheWVycyB0dXJuIGFuZCBzdGFydHMgd2l0aCB0aGUgY29tcHV0ZXI/IEl0cyBnb2luZyB0byBicmVha1xuICAgICAgICAgICAgaWYgKHBsYXllck9iai5pc1R1cm4oKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHBsYXllck9iai5zZW5kQXR0YWNrKHgsIHksIGVuZW15Qm9hcmQpO1xuICAgICAgICAgICAgICAgIHBsYXllck9iai5jaGFuZ2VUdXJuKCk7XG4gICAgICAgICAgICAgICAgZW5lbXlPYmouY2hhbmdlVHVybigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZW5lbXlPYmouaXNUdXJuKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbmVteU9iai5yYW5kb21BdHRhY2socEJvYXJkKTtcbiAgICAgICAgICAgICAgICBlbmVteU9iai5jaGFuZ2VUdXJuKCk7XG4gICAgICAgICAgICAgICAgcGxheWVyT2JqLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICApO1xufTtcblxuY29uc3QgcmVuZGVyQ29tcHV0ZXJHYW1lQm9hcmQgPSAoY3B1Qm9hcmQsIHBsYXllck9iaiwgY3B1T2JqLCBwQm9hcmQpID0+IHtcbiAgICBjb25zdCBjcHVTcXVhcmVzID0gY3B1Qm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNwdVNxdWFyZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjcHVTcXVhcmVzW2ldLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNxdWFyZS5kYXRhc2V0LmNvcmQgPSBbW2ldLCBbal1dO1xuICAgICAgICAgICAgY29uc3QgeyBjb3JkIH0gPSBzcXVhcmUuZGF0YXNldDtcbiAgICAgICAgICAgIHNxdWFyZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdnYW1lU3F1YXJlJyk7XG4gICAgICAgICAgICBhdHRhY2tFdmVudExpc3RlbmVyKHNxdWFyZSwgcGxheWVyT2JqLCBjcHVCb2FyZCwgY3B1T2JqLCBwQm9hcmQsIGNvcmQpO1xuICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLy8gaWYgY2xpY2tlZCBpdCBjaGVja3MgaWYgaXRzIHRoZSBwbGF5ZXJzIHR1cm47IGlmIGl0cyB0aGUgcGxheWVycyB0dXJuIHRoZW4gaXQgbGF1bmNoZXMgdGhlIGF0dGFjayBhbmQgY2hhbmdlcyB0aGUgdHVybnMgZm9yIGJvdGggdGhlIHBsYXllciBhbmQgdGhlIGNvbXB1dGVyXG5cbmV4cG9ydCB7IHJlbmRlclBsYXllckdhbWVCb2FyZCwgcmVuZGVyQ29tcHV0ZXJHYW1lQm9hcmQgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBhcnJheWlzUHJlc2VudCB9IGZyb20gJy4vcGxheWVyJztcblxuY29uc3QgR2FtZUJvYXJkID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBwYXN0QXR0YWNrcyA9IFtdO1xuXG4gICAgY29uc3Qgc2hpcHMgPSB7fTtcblxuICAgIGNvbnN0IGJvYXJkID0gW1xuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgXTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTmFtZSwgY29yZHMpID0+IHtcbiAgICAgICAgc2hpcHNbc2hpcE5hbWVdID0gU2hpcChjb3Jkcy5sZW5ndGgsIHNoaXBOYW1lLCBjb3Jkcyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3Jkcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgW3gsIHldID0gY29yZHNbaV07XG4gICAgICAgICAgICBib2FyZFt4XVt5XSA9IHNoaXBzW3NoaXBOYW1lXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gICAgY29uc3QgYWxsU3VuayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IE9iamVjdC52YWx1ZXMoc2hpcHMpO1xuICAgICAgICBjb25zdCBzdW5rU2hpcCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHN1bmtTaGlwLnB1c2gocmVzdWx0c1tpXS5pc1N1bmsoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hlY2tTdW5rU2hpcHMgPSBzdW5rU2hpcC5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gdHJ1ZSk7XG4gICAgICAgIGlmIChjaGVja1N1bmtTaGlwcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBjb25zdCBfaXNHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKGFsbFN1bmsoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEdhbWUgaXMgb3ZlciFgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXRQYXN0QXR0YWNrcyA9ICgpID0+IHBhc3RBdHRhY2tzO1xuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dGFjayA9IFt4LCB5XTtcbiAgICAgICAgY29uc3Qgb2xkQXR0YWNrcyA9IGdldFBhc3RBdHRhY2tzKCk7XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU2hpcCA9IGJvYXJkW2F0dGFja1swXV1bYXR0YWNrWzFdXTtcbiAgICAgICAgY29uc3QgY2hlY2tBdHRhY2sgPSBhcnJheWlzUHJlc2VudChvbGRBdHRhY2tzLCBhdHRhY2spO1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNxdWFyZVBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNjb21wdXRlci1ib2FyZCcpO1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNxdWFyZSA9IGF0dGFja2VkU3F1YXJlUGFyZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvcmQ9JyR7eH0sJHt5fSddYCk7XG5cbiAgICAgICAgaWYgKGNoZWNrQXR0YWNrID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgICAgICAgICAgIG9sZEF0dGFja3MucHVzaChhdHRhY2spO1xuICAgICAgICAgICAgICAgIGF0dGFja2VkU2hpcC5oaXQoMSk7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRTcXVhcmUuaW5uZXJIVE1MID0gYCYjeDFGNEE1YDtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrZWRTaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2F0dGFja2VkU2hpcC5uYW1lfSBoYXMgYmVlbiBzdW5rISEhYCk7XG4gICAgICAgICAgICAgICAgICAgIF9pc0dhbWVPdmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgU3VjY2Vzc2Z1bCEnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2xkQXR0YWNrcy5wdXNoKGF0dGFjayk7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRTcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBdHRhY2sgTWlzc2VkIWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHJhbmRBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRhY2sgPSBbeCwgeV07XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU2hpcCA9IGJvYXJkW2F0dGFja1swXV1bYXR0YWNrWzFdXTtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTcXVhcmVQYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjcGxheWVyLWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU3F1YXJlID0gYXR0YWNrZWRTcXVhcmVQYXJlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29yZD0nJHt4fSwke3l9J11gKTtcblxuICAgICAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICAgICAgICBwYXN0QXR0YWNrcy5wdXNoKGF0dGFjayk7XG4gICAgICAgICAgICBhdHRhY2tlZFNoaXAuaGl0KDEpO1xuICAgICAgICAgICAgYXR0YWNrZWRTcXVhcmUuaW5uZXJIVE1MID0gYCYjeDFGNEE1YDtcbiAgICAgICAgICAgIGF0dGFja2VkU3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgaWYgKGF0dGFja2VkU2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2F0dGFja2VkU2hpcC5uYW1lfSBoYXMgYmVlbiBzdW5rISEhYCk7XG4gICAgICAgICAgICAgICAgX2lzR2FtZU92ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgU3VjY2Vzc2Z1bCEnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJztcbiAgICAgICAgICAgIHBhc3RBdHRhY2tzLnB1c2goYXR0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBdHRhY2sgTWlzc2VkIWApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFNoaXBzID0gKCkgPT4gc2hpcHM7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIGdldFBhc3RBdHRhY2tzLFxuICAgICAgICByZWNlaXZlQXR0YWNrLFxuICAgICAgICBhbGxTdW5rLFxuICAgICAgICBib2FyZCxcbiAgICAgICAgZ2V0Qm9hcmQsXG4gICAgICAgIGdldFNoaXBzLFxuICAgICAgICByYW5kQXR0YWNrLFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQ7XG4iLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gJy4vZ2FtZUJvYXJkJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkLCByZW5kZXJQbGF5ZXJHYW1lQm9hcmQgfSBmcm9tICcuL2RvbUNoYW5nZXMnO1xuXG5jb25zdCBzaGlwU2V0dXAgPSAoYm9hcmQpID0+IHtcbiAgICBib2FyZC5wbGFjZVNoaXAoJ2NhcnJpZXInLCBbXG4gICAgICAgIFswLCAwXSxcbiAgICAgICAgWzAsIDFdLFxuICAgICAgICBbMCwgMl0sXG4gICAgICAgIFswLCAzXSxcbiAgICAgICAgWzAsIDRdLFxuICAgIF0pO1xuXG4gICAgYm9hcmQucGxhY2VTaGlwKCdiYXR0bGVzaGlwJywgW1xuICAgICAgICBbNiwgMF0sXG4gICAgICAgIFs3LCAwXSxcbiAgICAgICAgWzgsIDBdLFxuICAgICAgICBbOSwgMF0sXG4gICAgXSk7XG5cbiAgICBib2FyZC5wbGFjZVNoaXAoJ2Rlc3Ryb3llcicsIFtcbiAgICAgICAgWzQsIDVdLFxuICAgICAgICBbNCwgNl0sXG4gICAgICAgIFs0LCA3XSxcbiAgICBdKTtcblxuICAgIGJvYXJkLnBsYWNlU2hpcCgnc3VibWFyaW5lJywgW1xuICAgICAgICBbNCwgOF0sXG4gICAgICAgIFs1LCA4XSxcbiAgICAgICAgWzYsIDhdLFxuICAgIF0pO1xuXG4gICAgYm9hcmQucGxhY2VTaGlwKCdwYXRyb2wgYm9hdCcsIFtcbiAgICAgICAgWzksIDJdLFxuICAgICAgICBbOSwgM10sXG4gICAgXSk7XG59O1xuXG5jb25zdCBnYW1lU2V0dXAgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIHBsYXllciBhbmQgY29tcHV0ZXIgb2JqZWN0cyBhbmQgYm9hcmRzXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lQm9hcmQoJ3BsYXllckJvYXJkJyk7XG4gICAgY29uc3QgcGxheWVyT25lID0gUGxheWVyKCdTZWFuJywgdHJ1ZSk7XG5cbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZUJvYXJkKCdjb21wdXRlckJvYXJkJyk7XG4gICAgY29uc3QgY3B1ID0gUGxheWVyKCdjb21wdXRlcicsIGZhbHNlLCB0cnVlKTtcblxuICAgIC8vIHB1dCB0aGUgc2hpcHMgb24gdGhlIGJvYXJkIGZvciB0aGUgcGxheWVyIGFuZCBjb21wdXRlclxuICAgIHNoaXBTZXR1cChwbGF5ZXJCb2FyZCk7XG4gICAgc2hpcFNldHVwKGNvbXB1dGVyQm9hcmQpO1xuXG4gICAgLy8gcmVuZGVyIHRoZSBzcXVhcmVzIG9uIHRoZSBVSVxuICAgIHJlbmRlckNvbXB1dGVyR2FtZUJvYXJkKGNvbXB1dGVyQm9hcmQsIHBsYXllck9uZSwgY3B1LCBwbGF5ZXJCb2FyZCk7XG4gICAgcmVuZGVyUGxheWVyR2FtZUJvYXJkKHBsYXllckJvYXJkKTtcblxuICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgY29uc29sZS5sb2cocGxheWVyQm9hcmQuZ2V0Qm9hcmQoKSk7XG5cbiAgICAvLyB0dXJuIGJhc2VkIGFjdGlvbnMuLi5cbiAgICAvLyBuZWVkIHRvIGNyZWF0ZSBnYW1lIGxvb3Agc29tZWhvd1xuXG4gICAgLy8gd2hpbGUgbG9vcD8/P1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVNldHVwO1xuIiwiY29uc3QgYXJyYXlpc1ByZXNlbnQgPSAoYSwgYikgPT4ge1xuICAgIGNvbnN0IG5ld0EgPSBKU09OLnN0cmluZ2lmeShhKTtcbiAgICBjb25zdCBuZXdCID0gSlNPTi5zdHJpbmdpZnkoYik7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3QS5pbmRleE9mKG5ld0IpO1xuICAgIGlmIChyZXN1bHQgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSwgY3VycmVudFR1cm4sIGlzQ29tcHV0ZXIgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IGF0dGFja3NTZW50ID0gW107XG5cbiAgICBsZXQgdHVybiA9IGN1cnJlbnRUdXJuO1xuXG4gICAgY29uc3QgaXNUdXJuID0gKCkgPT4gdHVybjtcblxuICAgIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllclR1cm4gPSBpc1R1cm4oKTtcblxuICAgICAgICBpZiAocGxheWVyVHVybiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdHVybiA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHVybiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc2VuZEF0dGFjayA9ICh4LCB5LCBlbmVteUJvYXJkKSA9PiB7XG4gICAgICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9O1xuXG4gICAgY29uc3QgX3JhbmROdW0gPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICBjb25zdCBfaXNQcmV2aW91c0F0dGFjayA9ICh4LCB5LCBwYXN0QXR0YWNrcykgPT4ge1xuICAgICAgICBjb25zdCBhdHRhY2sgPSBbeCwgeV07XG4gICAgICAgIGNvbnN0IGNoZWNrQXR0YWNrID0gYXJyYXlpc1ByZXNlbnQocGFzdEF0dGFja3MsIGF0dGFjayk7XG4gICAgICAgIGlmIChjaGVja0F0dGFjayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRBdHRhY2tzU2VudCA9ICgpID0+IGF0dGFja3NTZW50O1xuXG4gICAgY29uc3QgcmFuZG9tQXR0YWNrID0gKGVuZW15Qm9hcmQsIHggPSBfcmFuZE51bSgpLCB5ID0gX3JhbmROdW0oKSkgPT4ge1xuICAgICAgICBjb25zdCBjaGVja0F0dGFjayA9IF9pc1ByZXZpb3VzQXR0YWNrKHgsIHksIGdldEF0dGFja3NTZW50KCkpO1xuXG4gICAgICAgIGlmIChjaGVja0F0dGFjayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgbmV3WCA9IF9yYW5kTnVtKCk7XG4gICAgICAgICAgICBjb25zdCBuZXdZID0gX3JhbmROdW0oKTtcbiAgICAgICAgICAgIHJhbmRvbUF0dGFjayhlbmVteUJvYXJkLCBuZXdYLCBuZXdZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dGFja3NTZW50LnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgIGVuZW15Qm9hcmQucmFuZEF0dGFjayh4LCB5KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXRJc0NvbXB1dGVyID0gKCkgPT4gaXNDb21wdXRlcjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGlzVHVybixcbiAgICAgICAgY2hhbmdlVHVybixcbiAgICAgICAgc2VuZEF0dGFjayxcbiAgICAgICAgZ2V0SXNDb21wdXRlcixcbiAgICAgICAgcmFuZG9tQXR0YWNrLFxuICAgICAgICBnZXRBdHRhY2tzU2VudCxcbiAgICB9O1xufTtcblxuZXhwb3J0IHsgYXJyYXlpc1ByZXNlbnQsIFBsYXllciB9O1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIG5hbWUsIGNvcmRzKSA9PiB7XG4gICAgbGV0IGhpdHMgPSAwO1xuICAgIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgICBjb25zdCBnZXRTdW5rID0gKCkgPT4gc3VuaztcblxuICAgIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcblxuICAgIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gZ2V0TGVuZ3RoKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRIaXRzID0gZ2V0SGl0cygpO1xuICAgICAgICBpZiAoY3VycmVudEhpdHMgPj0gY3VycmVudExlbmd0aCkge1xuICAgICAgICAgICAgc3VuayA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdW5rID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldFN1bmsoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGl0ID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGhpdHMgKz0gdmFsdWU7XG4gICAgICAgIGlzU3VuaygpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBnZXRMZW5ndGgsXG4gICAgICAgIGhpdCxcbiAgICAgICAgZ2V0SGl0cyxcbiAgICAgICAgaXNTdW5rLFxuICAgICAgICBjb3JkcyxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgZ2FtZVNldHVwIGZyb20gJy4vbW9kdWxlcy9nYW1lTG9naWMnO1xuXG5nYW1lU2V0dXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==