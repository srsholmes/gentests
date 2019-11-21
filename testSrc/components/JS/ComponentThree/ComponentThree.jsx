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
