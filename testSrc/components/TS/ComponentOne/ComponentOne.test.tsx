import { ComponentOne } from "./ComponentOne";

import test from "tape";
import { render } from "@testing-library/react";

test("ComponentOne", async t => {
  const actual = render(<ComponentOne />);
  const expected = null;
  t.fail();
});
