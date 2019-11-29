import { generateTest } from "./generateTest";

describe("generateTest", () => {
  it("generateTest should fail the automatically generated test", () => {
    const actual = generateTest();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
