import { myExportedConst } from "./exportConstsNoFunctions";

describe("myExportedConst", () => {
  it("myExportedConst should fail the automatically generated test", () => {
    const actual = myExportedConst();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
