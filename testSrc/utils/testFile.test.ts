import ben from "./testFile";

import test from "tape";
import { render } from "@testing-library/react";

test("ben", async t => {
  const actual = ben();
  const expected = null;
  t.fail();
});
