import object from "./object";

describe("object", () => {
  it("object should fail the automatically generated test", () => {
    const actual = object();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
