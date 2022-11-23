const ship = (length, hits = 0, sunk = false) => {
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
  return { getLength, hit, getHits, isSunk };
};

export { ship };
