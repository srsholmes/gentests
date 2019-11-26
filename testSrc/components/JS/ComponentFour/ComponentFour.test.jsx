import ComponentFour from "./ComponentFour";

import test from "tape";
import { render } from "@testing-library/react";

describe("ComponentFour", () => {
  it("ComponentFour should fail the automatically generated test", () => {
    const actual = render(<ComponentFour />);

    const expected = null;
    expect(actual).toBe(expected);
  });
});
