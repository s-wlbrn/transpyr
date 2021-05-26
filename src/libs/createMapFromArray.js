const createMapFromArray = (arr) => {
  return arr.reduce((acc, cur) => ({ ...acc, [cur]: true }), {});
};

export default createMapFromArray;
