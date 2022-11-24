const ship = (length, name, hits = 0, sunk = false) => {
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

export { ship };
