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

export { Ship };
