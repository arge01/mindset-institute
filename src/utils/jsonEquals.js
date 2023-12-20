const jsonEquals = (a, b) =>
  typeof a === 'object' &&
  typeof b === 'object' &&
  JSON.stringify(a) === JSON.stringify(b);

export default jsonEquals;
