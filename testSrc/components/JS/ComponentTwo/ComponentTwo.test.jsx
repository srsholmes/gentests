import { ComponentTwo } from "./ComponentTwo";

describe("ComponentTwo", () => {
  it("ComponentFour should fail the automatically generated test", () => {
    const actual = (<Hello />)();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
