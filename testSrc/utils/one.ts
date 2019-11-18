export const add = (a: number, b: number) => a + b;
export const multiply = (a: number, b: number) => a * b;
export const divide = (a: number, b: number) => a / b;

export function hello() {
  return 'hello';
}

export { add as exportAdd, multiply as exportMultiply, divide as exportDivide };

export default hello;
