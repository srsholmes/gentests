import object from "./object";

import test from "tape";
import { render } from "@testing-library/react";

describe("object", () => {
  it("object should fail the automatically generated test", () => {
    const actual = object();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
