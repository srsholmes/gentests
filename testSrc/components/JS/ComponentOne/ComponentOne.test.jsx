import defFunction, { ComponentOne, ComponentTwo, lolFn } from "./ComponentOne";

describe("defFunction", () => {
  it("defFunction should fail the automatically generated test", () => {
    const actual = defFunction();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("ComponentOne", () => {
  it("ComponentOne should fail the automatically generated test", () => {
    const actual = render(<ComponentOne />);
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("ComponentTwo", () => {
  it("ComponentTwo should fail the automatically generated test", () => {
    const actual = render(<ComponentTwo />);
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("lolFn", () => {
  it("lolFn should fail the automatically generated test", () => {
    const actual = lolFn();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
