console.log("************** DELIVERABLE 03 *********************");

// Clone - Crea una copia de un objeto usando spread operator
function clone(source) {
  return { ...source };
}

// Merge - Combina dos objetos, source sobreescribe a target
function merge(source, target) {
  return { ...target, ...source };
}

// Ejemplos de uso
const originalObject = { name: "John", age: 30, city: "Madrid" };
const clonedObject = clone(originalObject);

console.log("Original:", originalObject);
console.log("Clonado:", clonedObject);

const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
const b = { name: "Luisa", age: 31, married: true };

console.log("Merge:", merge(a, b)); // {name: "Maria", age: 31, married: true, surname: "Ibañez", country: "SPA"}
