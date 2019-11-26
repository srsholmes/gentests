import ben from "./testFile";

import test from "tape";
import { render } from "@testing-library/react";

describe("ben", () => {
  it("ben should fail the automatically generated test", () => {
    const actual = ben();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
