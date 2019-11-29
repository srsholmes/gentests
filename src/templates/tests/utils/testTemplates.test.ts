import { testTemplate } from "./testTemplates";

describe("testTemplate", () => {
  it("testTemplate should fail the automatically generated test", () => {
    const actual = testTemplate();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
