import hello, {
  add,
  multiply,
  divide,
  exportAdd,
  exportMultiply,
  exportDivide
} from "./one";

describe("hello", () => {
  it("hello should fail the automatically generated test", () => {
    const actual = hello();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("add", () => {
  it("add should fail the automatically generated test", () => {
    const actual = add();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("multiply", () => {
  it("multiply should fail the automatically generated test", () => {
    const actual = multiply();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("divide", () => {
  it("divide should fail the automatically generated test", () => {
    const actual = divide();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("exportAdd", () => {
  it("exportAdd should fail the automatically generated test", () => {
    const actual = exportAdd();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("exportMultiply", () => {
  it("exportMultiply should fail the automatically generated test", () => {
    const actual = exportMultiply();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("exportDivide", () => {
  it("exportDivide should fail the automatically generated test", () => {
    const actual = exportDivide();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
