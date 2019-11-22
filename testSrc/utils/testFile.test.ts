import ben from "./testFile";

describe("ben", () => {
  it("ben should fail the automatically generated test", () => {
    const actual = ben();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
