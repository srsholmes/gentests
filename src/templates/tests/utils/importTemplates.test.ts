import { getFrameworkImports } from "./importTemplates";

describe("getFrameworkImports", () => {
  it("getFrameworkImports should fail the automatically generated test", () => {
    const actual = getFrameworkImports();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
