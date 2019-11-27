import hello, {
  add,
  multiply,
  divide,
  exportAdd,
  exportMultiply,
  exportDivide
} from "./one";

import test from "tape";
import { render } from "@testing-library/react";

test("hello", async t => {
  const actual = hello();
  const expected = null;
  t.fail();
});

test("add", async t => {
  const actual = add();
  const expected = null;
  t.fail();
});

test("multiply", async t => {
  const actual = multiply();
  const expected = null;
  t.fail();
});

test("divide", async t => {
  const actual = divide();
  const expected = null;
  t.fail();
});

test("exportAdd", async t => {
  const actual = exportAdd();
  const expected = null;
  t.fail();
});

test("exportMultiply", async t => {
  const actual = exportMultiply();
  const expected = null;
  t.fail();
});

test("exportDivide", async t => {
  const actual = exportDivide();
  const expected = null;
  t.fail();
});
