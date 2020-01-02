# Gentests
An WIP experiment to generate unit test templates from source code files, targeting TS and JS. I hope to turn this into a library when I have time to finish it and fully test it.

It uses Babel to parse the source code and prettier to format the test output.

I have plans to support various testing libraries through user config, but this is only partially supported at the moment.

### Warning
The script will overwrite files in your repo, but you use git right, so hopefully that wont matter?

## Example
Given the following source code: 

```typescript jsx
import React from 'react';

export const hello = () => 'hello';

export const helloComponent = () => <p>hello</p>;

export const helloComponent2 = () => {
  const test = 1;
  return <p>{test}</p>;
};

 class classExample extends React.Component {
  render() {
    return <p>this is a class component</p>;
  }
}

export class classExample2 extends React.Component {
  render() {
    return <p>this is a class component with a named export </p>;
  }
}

export default classExample;
```

the following unit test template will be generated:

```typescript jsx
import classExample, {
  hello,
  helloComponent,
  helloComponent2,
  classExample2
} from "./ComponentThree";

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

```
