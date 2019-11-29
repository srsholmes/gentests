import { getDirectoriesAndComponents } from "./getFiles";

describe("getDirectoriesAndComponents", () => {
  it("getDirectoriesAndComponents should fail the automatically generated test", () => {
    const actual = getDirectoriesAndComponents();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
