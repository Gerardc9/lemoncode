console.log("************** DELIVERABLE 01 *********************");

// Head - Extrae el primer elemento usando destructuring
const head = (array) => {
  const [firstElement] = array;
  return firstElement;
};

// Tail - Devuelve todos los elementos menos el primero usando rest operator
const tail = (array) => {
  const [, ...restElements] = array;
  return restElements;
};

// Init - Devuelve todos los elementos menos el último usando Array.prototype.slice
const init = (array) => {
  return array.slice(0, -1);
};

// Last - Devuelve el último elemento
const last = (array) => {
  return array[array.length - 1];
};

// Ejemplos de uso
const numbers = [1, 2, 3, 4, 5];

console.log("head:", head(numbers)); // 1
console.log("tail:", tail(numbers)); // [2, 3, 4, 5]
console.log("init:", init(numbers)); // [1, 2, 3, 4]
console.log("last:", last(numbers)); // 5
