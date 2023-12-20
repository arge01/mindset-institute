const objectsEqual = (a, b) => {
  if (Object.isExtensible(a) && Object.isExtensible(b)) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return false;
    }
  } else {
    return false;
  }
  return JSON.stringify(a) === JSON.stringify(b);
};

export default objectsEqual;
