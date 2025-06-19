console.log("************** DELIVERABLE 02 *********************");

// Concat - Concatena dos arrays usando spread operator
const concat = (a, b) => {
  return [...a, ...b];
};

// Ejemplo de uso
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

console.log("concat:", concat(array1, array2)); // [1, 2, 3, 4, 5, 6]
