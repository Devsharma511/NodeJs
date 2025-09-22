function calculate(operation, a, b) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

console.log(calculate(add, 4, 5));
console.log(calculate(subtract, 10, 3));
console.log(calculate(multiply, 4, 5));
console.log(calculate(divide, 20, 5));
console.log(calculate((x, y) => x ** y, 2, 3));
