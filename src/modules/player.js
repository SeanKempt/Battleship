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

export { arrayisPresent, Player };
