export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;

function hello() {
  return 'hello';
}

export { add as exportAdd, multiply as exportMultiply, divide as exportDivide };

export default hello;
