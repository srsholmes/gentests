import { ComponentTwo } from "./ComponentTwo";

import test from "tape";
import { render } from "@testing-library/react";

test("ComponentTwo", async t => {
  const actual = render(<ComponentTwo />);
  const expected = null;
  t.fail();
});
