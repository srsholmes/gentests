import { ComponentOne } from "./ComponentOne";

import test from "tape";
import { render } from "@testing-library/react";

describe("ComponentOne", () => {
  it("ComponentOne should fail the automatically generated test", () => {
    const actual = render(<ComponentOne />);

    const expected = null;
    expect(actual).toBe(expected);
  });
});
