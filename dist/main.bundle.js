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
                attackedSquare.style.backgroundColor = 'pink';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtDOzs7Ozs7Ozs7Ozs7Ozs7QUN0RWxDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUNwQ3BCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnFCO0FBQ3VCOztBQUU1Qyw4REFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb21DaGFuZ2VzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVMb2dpYy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpO1xuXG5jb25zdCByZW5kZXJQbGF5ZXJHYW1lQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICBjb25zdCBib2FyZFNxdWFyZXMgPSBib2FyZC5nZXRCb2FyZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmRTcXVhcmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRTcXVhcmVzW2ldLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNxdWFyZS5kYXRhc2V0LmNvcmQgPSBbW2ldLCBbal1dO1xuICAgICAgICAgICAgc3F1YXJlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2dhbWVTcXVhcmUnKTtcbiAgICAgICAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5jb25zdCBhdHRhY2tFdmVudExpc3RlbmVyID0gKGVsZW1lbnQsIHBsYXllck9iaiwgZW5lbXlCb2FyZCwgZW5lbXlPYmosIHBCb2FyZCwgYXR0YWNrQ29yZCkgPT4ge1xuICAgIGNvbnN0IGNvcmQgPSBhdHRhY2tDb3JkLnJlcGxhY2VBbGwoJywnLCAnJyk7XG4gICAgY29uc3Qgc3RyaW5ncyA9IFsuLi5jb3JkXTtcbiAgICBjb25zdCBuZXdDb3JkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIG5ld0NvcmQucHVzaChwYXJzZUludChzdHJpbmdzW2ldLCAxMCkpO1xuICAgIH1cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdjbGljaycsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IG5ld0NvcmQ7XG4gICAgICAgICAgICAvLyB3aGF0IGhhcHBlbnMgd2hlbiBpdHMgbm90IHRoZSBwbGF5ZXJzIHR1cm4gYW5kIHN0YXJ0cyB3aXRoIHRoZSBjb21wdXRlcj8gSXRzIGdvaW5nIHRvIGJyZWFrXG4gICAgICAgICAgICBpZiAocGxheWVyT2JqLmlzVHVybigpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyT2JqLnNlbmRBdHRhY2soeCwgeSwgZW5lbXlCb2FyZCk7XG4gICAgICAgICAgICAgICAgcGxheWVyT2JqLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgICAgICAgICBlbmVteU9iai5jaGFuZ2VUdXJuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbmVteU9iai5pc1R1cm4oKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGVuZW15T2JqLnJhbmRvbUF0dGFjayhwQm9hcmQpO1xuICAgICAgICAgICAgICAgIGVuZW15T2JqLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJPYmouY2hhbmdlVHVybigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICk7XG59O1xuXG5jb25zdCByZW5kZXJDb21wdXRlckdhbWVCb2FyZCA9IChjcHVCb2FyZCwgcGxheWVyT2JqLCBjcHVPYmosIHBCb2FyZCkgPT4ge1xuICAgIGNvbnN0IGNwdVNxdWFyZXMgPSBjcHVCb2FyZC5nZXRCb2FyZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3B1U3F1YXJlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNwdVNxdWFyZXNbaV0ubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3F1YXJlLmRhdGFzZXQuY29yZCA9IFtbaV0sIFtqXV07XG4gICAgICAgICAgICBjb25zdCB7IGNvcmQgfSA9IHNxdWFyZS5kYXRhc2V0O1xuICAgICAgICAgICAgc3F1YXJlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2dhbWVTcXVhcmUnKTtcbiAgICAgICAgICAgIGF0dGFja0V2ZW50TGlzdGVuZXIoc3F1YXJlLCBwbGF5ZXJPYmosIGNwdUJvYXJkLCBjcHVPYmosIHBCb2FyZCwgY29yZCk7XG4gICAgICAgICAgICBjb21wdXRlckJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vLyBpZiBjbGlja2VkIGl0IGNoZWNrcyBpZiBpdHMgdGhlIHBsYXllcnMgdHVybjsgaWYgaXRzIHRoZSBwbGF5ZXJzIHR1cm4gdGhlbiBpdCBsYXVuY2hlcyB0aGUgYXR0YWNrIGFuZCBjaGFuZ2VzIHRoZSB0dXJucyBmb3IgYm90aCB0aGUgcGxheWVyIGFuZCB0aGUgY29tcHV0ZXJcblxuZXhwb3J0IHsgcmVuZGVyUGxheWVyR2FtZUJvYXJkLCByZW5kZXJDb21wdXRlckdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGFycmF5aXNQcmVzZW50IH0gZnJvbSAnLi9wbGF5ZXInO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IHBhc3RBdHRhY2tzID0gW107XG5cbiAgICBjb25zdCBzaGlwcyA9IHt9O1xuXG4gICAgY29uc3QgYm9hcmQgPSBbXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgICBdO1xuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBOYW1lLCBjb3JkcykgPT4ge1xuICAgICAgICBzaGlwc1tzaGlwTmFtZV0gPSBTaGlwKGNvcmRzLmxlbmd0aCwgc2hpcE5hbWUsIGNvcmRzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcmRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBbeCwgeV0gPSBjb3Jkc1tpXTtcbiAgICAgICAgICAgIGJvYXJkW3hdW3ldID0gc2hpcHNbc2hpcE5hbWVdO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gT2JqZWN0LnZhbHVlcyhzaGlwcyk7XG4gICAgICAgIGNvbnN0IHN1bmtTaGlwID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgc3Vua1NoaXAucHVzaChyZXN1bHRzW2ldLmlzU3VuaygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGVja1N1bmtTaGlwcyA9IHN1bmtTaGlwLmV2ZXJ5KChlbGVtZW50KSA9PiBlbGVtZW50ID09PSB0cnVlKTtcbiAgICAgICAgaWYgKGNoZWNrU3Vua1NoaXBzID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IF9pc0dhbWVPdmVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoYWxsU3VuaygpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgR2FtZSBpcyBvdmVyIWApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFBhc3RBdHRhY2tzID0gKCkgPT4gcGFzdEF0dGFja3M7XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgICAgY29uc3QgYXR0YWNrID0gW3gsIHldO1xuICAgICAgICBjb25zdCBvbGRBdHRhY2tzID0gZ2V0UGFzdEF0dGFja3MoKTtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTaGlwID0gYm9hcmRbYXR0YWNrWzBdXVthdHRhY2tbMV1dO1xuICAgICAgICBjb25zdCBjaGVja0F0dGFjayA9IGFycmF5aXNQcmVzZW50KG9sZEF0dGFja3MsIGF0dGFjayk7XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU3F1YXJlUGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2NvbXB1dGVyLWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU3F1YXJlID0gYXR0YWNrZWRTcXVhcmVQYXJlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29yZD0nJHt4fSwke3l9J11gKTtcblxuICAgICAgICBpZiAoY2hlY2tBdHRhY2sgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICAgICAgICAgICAgb2xkQXR0YWNrcy5wdXNoKGF0dGFjayk7XG4gICAgICAgICAgICAgICAgYXR0YWNrZWRTaGlwLmhpdCgxKTtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncGluayc7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VkU2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHthdHRhY2tlZFNoaXAubmFtZX0gaGFzIGJlZW4gc3VuayEhIWApO1xuICAgICAgICAgICAgICAgICAgICBfaXNHYW1lT3ZlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIFN1Y2Nlc3NmdWwhJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9sZEF0dGFja3MucHVzaChhdHRhY2spO1xuICAgICAgICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQXR0YWNrIE1pc3NlZCFgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCByYW5kQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgICAgY29uc3QgYXR0YWNrID0gW3gsIHldO1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSBib2FyZFthdHRhY2tbMF1dW2F0dGFja1sxXV07XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU3F1YXJlUGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3BsYXllci1ib2FyZCcpO1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNxdWFyZSA9IGF0dGFja2VkU3F1YXJlUGFyZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvcmQ9JyR7eH0sJHt5fSddYCk7XG5cbiAgICAgICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgICAgICAgcGFzdEF0dGFja3MucHVzaChhdHRhY2spO1xuICAgICAgICAgICAgYXR0YWNrZWRTaGlwLmhpdCgxKTtcbiAgICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdwaW5rJztcbiAgICAgICAgICAgIGlmIChhdHRhY2tlZFNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHthdHRhY2tlZFNoaXAubmFtZX0gaGFzIGJlZW4gc3VuayEhIWApO1xuICAgICAgICAgICAgICAgIF9pc0dhbWVPdmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIFN1Y2Nlc3NmdWwhJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSc7XG4gICAgICAgICAgICBwYXN0QXR0YWNrcy5wdXNoKGF0dGFjayk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQXR0YWNrIE1pc3NlZCFgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHNoaXBzO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICBnZXRQYXN0QXR0YWNrcyxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgYWxsU3VuayxcbiAgICAgICAgYm9hcmQsXG4gICAgICAgIGdldEJvYXJkLFxuICAgICAgICBnZXRTaGlwcyxcbiAgICAgICAgcmFuZEF0dGFjayxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkO1xuIiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyByZW5kZXJDb21wdXRlckdhbWVCb2FyZCwgcmVuZGVyUGxheWVyR2FtZUJvYXJkIH0gZnJvbSAnLi9kb21DaGFuZ2VzJztcblxuY29uc3Qgc2hpcFNldHVwID0gKGJvYXJkKSA9PiB7XG4gICAgYm9hcmQucGxhY2VTaGlwKCdjYXJyaWVyJywgW1xuICAgICAgICBbMCwgMF0sXG4gICAgICAgIFswLCAxXSxcbiAgICAgICAgWzAsIDJdLFxuICAgICAgICBbMCwgM10sXG4gICAgICAgIFswLCA0XSxcbiAgICBdKTtcblxuICAgIGJvYXJkLnBsYWNlU2hpcCgnYmF0dGxlc2hpcCcsIFtcbiAgICAgICAgWzYsIDBdLFxuICAgICAgICBbNywgMF0sXG4gICAgICAgIFs4LCAwXSxcbiAgICAgICAgWzksIDBdLFxuICAgIF0pO1xuXG4gICAgYm9hcmQucGxhY2VTaGlwKCdkZXN0cm95ZXInLCBbXG4gICAgICAgIFs0LCA1XSxcbiAgICAgICAgWzQsIDZdLFxuICAgICAgICBbNCwgN10sXG4gICAgXSk7XG5cbiAgICBib2FyZC5wbGFjZVNoaXAoJ3N1Ym1hcmluZScsIFtcbiAgICAgICAgWzQsIDhdLFxuICAgICAgICBbNSwgOF0sXG4gICAgICAgIFs2LCA4XSxcbiAgICBdKTtcblxuICAgIGJvYXJkLnBsYWNlU2hpcCgncGF0cm9sIGJvYXQnLCBbXG4gICAgICAgIFs5LCAyXSxcbiAgICAgICAgWzksIDNdLFxuICAgIF0pO1xufTtcblxuY29uc3QgZ2FtZVNldHVwID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBwbGF5ZXIgYW5kIGNvbXB1dGVyIG9iamVjdHMgYW5kIGJvYXJkc1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZUJvYXJkKCdwbGF5ZXJCb2FyZCcpO1xuICAgIGNvbnN0IHBsYXllck9uZSA9IFBsYXllcignU2VhbicsIHRydWUpO1xuXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVCb2FyZCgnY29tcHV0ZXJCb2FyZCcpO1xuICAgIGNvbnN0IGNwdSA9IFBsYXllcignY29tcHV0ZXInLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgICAvLyBwdXQgdGhlIHNoaXBzIG9uIHRoZSBib2FyZCBmb3IgdGhlIHBsYXllciBhbmQgY29tcHV0ZXJcbiAgICBzaGlwU2V0dXAocGxheWVyQm9hcmQpO1xuICAgIHNoaXBTZXR1cChjb21wdXRlckJvYXJkKTtcblxuICAgIC8vIHJlbmRlciB0aGUgc3F1YXJlcyBvbiB0aGUgVUlcbiAgICByZW5kZXJDb21wdXRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLCBwbGF5ZXJPbmUsIGNwdSwgcGxheWVyQm9hcmQpO1xuICAgIHJlbmRlclBsYXllckdhbWVCb2FyZChwbGF5ZXJCb2FyZCk7XG5cbiAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkLmdldEJvYXJkKCkpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllckJvYXJkLmdldEJvYXJkKCkpO1xuXG4gICAgLy8gdHVybiBiYXNlZCBhY3Rpb25zLi4uXG4gICAgLy8gbmVlZCB0byBjcmVhdGUgZ2FtZSBsb29wIHNvbWVob3dcblxuICAgIC8vIHdoaWxlIGxvb3A/Pz9cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVTZXR1cDtcbiIsImNvbnN0IGFycmF5aXNQcmVzZW50ID0gKGEsIGIpID0+IHtcbiAgICBjb25zdCBuZXdBID0gSlNPTi5zdHJpbmdpZnkoYSk7XG4gICAgY29uc3QgbmV3QiA9IEpTT04uc3RyaW5naWZ5KGIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ld0EuaW5kZXhPZihuZXdCKTtcbiAgICBpZiAocmVzdWx0ICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgUGxheWVyID0gKG5hbWUsIGN1cnJlbnRUdXJuLCBpc0NvbXB1dGVyID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCBhdHRhY2tzU2VudCA9IFtdO1xuXG4gICAgbGV0IHR1cm4gPSBjdXJyZW50VHVybjtcblxuICAgIGNvbnN0IGlzVHVybiA9ICgpID0+IHR1cm47XG5cbiAgICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJUdXJuID0gaXNUdXJuKCk7XG5cbiAgICAgICAgaWYgKHBsYXllclR1cm4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHR1cm4gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHR1cm4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNlbmRBdHRhY2sgPSAoeCwgeSwgZW5lbXlCb2FyZCkgPT4ge1xuICAgICAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfTtcblxuICAgIGNvbnN0IF9yYW5kTnVtID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgY29uc3QgX2lzUHJldmlvdXNBdHRhY2sgPSAoeCwgeSwgcGFzdEF0dGFja3MpID0+IHtcbiAgICAgICAgY29uc3QgYXR0YWNrID0gW3gsIHldO1xuICAgICAgICBjb25zdCBjaGVja0F0dGFjayA9IGFycmF5aXNQcmVzZW50KHBhc3RBdHRhY2tzLCBhdHRhY2spO1xuICAgICAgICBpZiAoY2hlY2tBdHRhY2sgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0QXR0YWNrc1NlbnQgPSAoKSA9PiBhdHRhY2tzU2VudDtcblxuICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9IChlbmVteUJvYXJkLCB4ID0gX3JhbmROdW0oKSwgeSA9IF9yYW5kTnVtKCkpID0+IHtcbiAgICAgICAgY29uc3QgY2hlY2tBdHRhY2sgPSBfaXNQcmV2aW91c0F0dGFjayh4LCB5LCBnZXRBdHRhY2tzU2VudCgpKTtcblxuICAgICAgICBpZiAoY2hlY2tBdHRhY2sgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBfcmFuZE51bSgpO1xuICAgICAgICAgICAgY29uc3QgbmV3WSA9IF9yYW5kTnVtKCk7XG4gICAgICAgICAgICByYW5kb21BdHRhY2soZW5lbXlCb2FyZCwgbmV3WCwgbmV3WSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdHRhY2tzU2VudC5wdXNoKFt4LCB5XSk7XG4gICAgICAgICAgICBlbmVteUJvYXJkLnJhbmRBdHRhY2soeCwgeSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0SXNDb21wdXRlciA9ICgpID0+IGlzQ29tcHV0ZXI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBpc1R1cm4sXG4gICAgICAgIGNoYW5nZVR1cm4sXG4gICAgICAgIHNlbmRBdHRhY2ssXG4gICAgICAgIGdldElzQ29tcHV0ZXIsXG4gICAgICAgIHJhbmRvbUF0dGFjayxcbiAgICAgICAgZ2V0QXR0YWNrc1NlbnQsXG4gICAgfTtcbn07XG5cbmV4cG9ydCB7IGFycmF5aXNQcmVzZW50LCBQbGF5ZXIgfTtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBuYW1lLCBjb3JkcykgPT4ge1xuICAgIGxldCBoaXRzID0gMDtcbiAgICBsZXQgc3VuayA9IGZhbHNlO1xuXG4gICAgY29uc3QgZ2V0U3VuayA9ICgpID0+IHN1bms7XG5cbiAgICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG5cbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IGdldExlbmd0aCgpO1xuICAgICAgICBjb25zdCBjdXJyZW50SGl0cyA9IGdldEhpdHMoKTtcbiAgICAgICAgaWYgKGN1cnJlbnRIaXRzID49IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgICAgICAgIHN1bmsgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VuayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXRTdW5rKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhpdCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBoaXRzICs9IHZhbHVlO1xuICAgICAgICBpc1N1bmsoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZ2V0TGVuZ3RoLFxuICAgICAgICBoaXQsXG4gICAgICAgIGdldEhpdHMsXG4gICAgICAgIGlzU3VuayxcbiAgICAgICAgY29yZHMsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGdhbWVTZXR1cCBmcm9tICcuL21vZHVsZXMvZ2FtZUxvZ2ljJztcblxuZ2FtZVNldHVwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=