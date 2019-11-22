import { ComponentTwo } from "./ComponentTwo";

describe("ComponentTwo", () => {
  it("ComponentTwo should fail the automatically generated test", () => {
    const actual = <ComponentTwo />;
    const expected = null;
    expect(actual).toBe(expected);
  });
});
