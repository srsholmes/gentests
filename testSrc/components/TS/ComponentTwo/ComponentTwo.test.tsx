import { ComponentTwo } from "./ComponentTwo";

describe("ComponentTwo", () => {
  it("ComponentFour should fail the automatically generated test", () => {
    const actual = ComponentTwo();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
