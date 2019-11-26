import { ComponentTwo } from "./ComponentTwo";

import test from "tape";
import { render } from "@testing-library/react";

describe("ComponentTwo", () => {
  it("ComponentTwo should fail the automatically generated test", () => {
    const actual = render(<ComponentTwo />);

    const expected = null;
    expect(actual).toBe(expected);
  });
});
