const ship = (length, hits = 0, sunk = false) => {
  const hit = () => {
    hits++;
  };

  const getHits = () => hits;
  const getLength = () => length;
  const getSunk = () => sunk;

  const isSunk = () => {
    const currentLength = getLength();
    const currentHits = getHits();
    if (currentLength > currentHits) {
      sunk = false;
    } else {
      sunk = true;
    }
    return getSunk();
  };
  return { getLength, hit, getHits, isSunk };
};

export { ship };
