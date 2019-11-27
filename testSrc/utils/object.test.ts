import object from "./object";

import test from "tape";
import { render } from "@testing-library/react";

test("object", async t => {
  const actual = object();
  const expected = null;
  t.fail();
});
