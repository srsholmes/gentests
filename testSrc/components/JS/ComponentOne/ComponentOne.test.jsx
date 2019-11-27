import defFunction, { ComponentOne, ComponentTwo, lolFn } from "./ComponentOne";

import test from "tape";
import { render } from "@testing-library/react";

test("defFunction", async t => {
  const actual = defFunction();
  const expected = null;
  t.fail();
});

test("ComponentOne", async t => {
  const actual = render(<ComponentOne />);
  const expected = null;
  t.fail();
});

test("ComponentTwo", async t => {
  const actual = render(<ComponentTwo />);
  const expected = null;
  t.fail();
});

test("lolFn", async t => {
  const actual = lolFn();
  const expected = null;
  t.fail();
});
