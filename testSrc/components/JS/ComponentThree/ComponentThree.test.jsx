import classExample, { hello } from "./ComponentThree";

describe("classExample", () => {
  it("classExample should fail the automatically generated test", () => {
    const actual = classExample();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("hello", () => {
  it("hello should fail the automatically generated test", () => {
    const actual = hello();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
