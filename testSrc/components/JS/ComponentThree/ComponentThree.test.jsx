import classExample, {
  hello,
  helloComponent,
  helloComponent2,
  classExample2
} from "./ComponentThree";

import test from "tape";
import { render } from "@testing-library/react";

describe("classExample", () => {
  it("classExample should fail the automatically generated test", () => {
    const actual = render(<classExample />);

    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("hello", () => {
  it("hello should fail the automatically generated test", () => {
    const actual = hello();

    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("helloComponent", () => {
  it("helloComponent should fail the automatically generated test", () => {
    const actual = render(<helloComponent />);

    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("helloComponent2", () => {
  it("helloComponent2 should fail the automatically generated test", () => {
    const actual = render(<helloComponent2 />);

    const expected = null;
    expect(actual).toBe(expected);
  });
});

describe("classExample2", () => {
  it("classExample2 should fail the automatically generated test", () => {
    const actual = render(<classExample2 />);

    const expected = null;
    expect(actual).toBe(expected);
  });
});
