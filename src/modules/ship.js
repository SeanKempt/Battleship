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

export default Ship;
