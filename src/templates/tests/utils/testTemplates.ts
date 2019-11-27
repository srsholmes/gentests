import {
  Config,
  FileExport,
  SupportedComponentTestFrameWorks,
  SupportedTestFrameWorks
} from '../../../types';

let expectation = `const expected = null;`;

const getTestAssertion = (testLib: SupportedTestFrameWorks) => {
  switch (testLib) {
    case 'tape':
    case 'ava':
      return 't.fail();';
    case 'jest':
      return 'expect(actual).toBe(expected);';
    default:
      return '';
  }
};

const getFunctionForTestLib = (testLib: SupportedComponentTestFrameWorks) => {
  switch (testLib) {
    case 'react-test-renderer':
      return 'create';
    case 'enzyme':
      return 'shallow';
    case 'react-testing-library':
    case '@test-library/react':
      return 'render';
    default:
      return '';
  }
};

function getDescribeStatement(testLib: SupportedTestFrameWorks, name: string) {
  switch (testLib) {
    case 'tape':
    case 'ava':
      return `test('${name}', async t => {`;
    default:
    case 'jest': {
      return `describe('${name}', () => {
        it('${name} should fail the automatically generated test', () => {
      `;
    }
  }
}

export const testTemplate = ({ name, jsx }: FileExport, config: Config) => {
  const describeStatement = getDescribeStatement(config.testFramework, name);
  const fnToCall = getFunctionForTestLib(config.testComponentFramework);
  const assertion = getTestAssertion(config.testFramework);
  const closingBraceIfJest = config.testFramework === 'jest' ? '})' : '';
  const test = ` 
      ${describeStatement}      
      const actual = ${jsx ? `${fnToCall}(<${name}/>)` : `${name}()`};
      ${expectation}   
      ${assertion} 
      ${closingBraceIfJest}
     });
 `;
  console.log({ test });
  return test;
};
