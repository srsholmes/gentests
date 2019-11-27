import classExample, {
  hello,
  helloComponent,
  helloComponent2,
  classExample2
} from "./ComponentThree";

import test from "tape";
import { render } from "@testing-library/react";

test("classExample", async t => {
  const actual = render(<classExample />);
  const expected = null;
  t.fail();
});

test("hello", async t => {
  const actual = hello();
  const expected = null;
  t.fail();
});

test("helloComponent", async t => {
  const actual = render(<helloComponent />);
  const expected = null;
  t.fail();
});

test("helloComponent2", async t => {
  const actual = render(<helloComponent2 />);
  const expected = null;
  t.fail();
});

test("classExample2", async t => {
  const actual = render(<classExample2 />);
  const expected = null;
  t.fail();
});
