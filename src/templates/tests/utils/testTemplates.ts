import {
  Config,
  FileExport,
  SupportedComponentTestFrameWorks
} from '../../../types';

let expectation = `
      const expected = null;
      expect(actual).toBe(expected);
     });
`;

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

function getDescribeStatement(name: string) {
  return `describe('${name}', () => {
    it('${name} should fail the automatically generated test', () => {
`;
}

export const testTemplate = ({ name, jsx }: FileExport, config: Config) => {
  const fnToCall = getFunctionForTestLib(config.testComponentFramework);
  return ` 
      ${getDescribeStatement(name)}      
      const actual = ${jsx ? `${fnToCall}(<${name}/>)` : `${name}()`};
      ${expectation}    
  });
 `;
};
