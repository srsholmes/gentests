import { getDefaultName, getNamedExport } from "./getExportNames";

describe("getDefaultName", () => {
  it("getDefaultName should fail the automatically generated test", () => {
    const actual = getDefaultName();
    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("getNamedExport", () => {
  it("getNamedExport should fail the automatically generated test", () => {
    const actual = getNamedExport();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
