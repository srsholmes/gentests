import { parseFile } from "./parseFile";

describe("parseFile", () => {
  it("parseFile should fail the automatically generated test", () => {
    const actual = parseFile();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
