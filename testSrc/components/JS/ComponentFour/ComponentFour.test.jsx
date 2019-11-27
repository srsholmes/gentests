import ComponentFour from "./ComponentFour";

import test from "tape";
import { render } from "@testing-library/react";

test("ComponentFour", async t => {
  const actual = render(<ComponentFour />);
  const expected = null;
  t.fail();
});
