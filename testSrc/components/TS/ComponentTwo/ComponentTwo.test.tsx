import { ComponentTwo } from "./ComponentTwo";

describe("ComponentTwo", () => {
  it("ComponentTwo should fail the automatically generated test", () => {
    const actual = render(<ComponentTwo />);
    const expected = null;
    expect(actual).toBe(expected);
  });
});
