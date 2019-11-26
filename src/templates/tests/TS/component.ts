import { Config, FileExport, generateTestArgs } from '../../../types';
import { sortExports } from '../../../utils';
import { importTemplate } from '../utils/importTemplate';

const testTemplate = ({ name, jsx }: FileExport) => `
  describe('${name}', () => {
    it('${name} should fail the automatically generated test', () => {
      const actual = ${jsx ? `<${name}/>` : `${name}()`};
      const expected = null;
      expect(actual).toBe(expected);
    });
  });
 `;

const reactTestingLibraryTemplate = ({ name, jsx }: FileExport) => {
  return `
  describe('${name}', () => {
    it('${name} should fail the automatically generated test', () => {
      const actual = ${jsx ? `render(<${name}/>)` : `${name}()`};
      const expected = null;
      expect(actual).toBe(expected);
    });
  });
 `;
};

const getTestTemplate = (fileExport: FileExport, config: Config) => {
  switch (config.testComponentFramework) {
    case 'react-testing-library': {
      return reactTestingLibraryTemplate(fileExport);
    }
    case 'enzyme':
    case 'react-test-renderer':
    default: {
      return testTemplate(fileExport);
    }
  }
};

export const typescriptJSX = (args: generateTestArgs) => {
  const { fileExports, fileName, config } = args;
  const sortedWithDefaultFirst = sortExports(fileExports);
  const importStatement = importTemplate(sortedWithDefaultFirst, fileName);
  const tests = sortedWithDefaultFirst.map((x: FileExport) =>
    getTestTemplate(x, config)
  );

  const res = `
    ${importStatement} 
    ${tests.join('\n')}
  `;

  console.log({ res });
  return res;
};
