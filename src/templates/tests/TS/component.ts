import { Config, FileExport, GenerateTestArgs } from '../../../types';
import { sortExports } from '../../../utils';
import { getImportStatement } from '../utils/getImportStatement';
import {
  enzymeTemplate,
  reacteTestRendererTemplate,
  reactTestingLibraryTemplate,
  testTemplate
} from '../utils/testTemplates';

const getTestTemplate = (fileExport: FileExport, config: Config) => {
  switch (config.testComponentFramework) {
    case 'react-testing-library': {
      return reactTestingLibraryTemplate(fileExport);
    }
    case 'enzyme': {
      return enzymeTemplate(fileExport);
    }
    case 'react-test-renderer': {
      return reacteTestRendererTemplate(fileExport);
    }
    default: {
      return testTemplate(fileExport);
    }
  }
};

export const typescriptJSX = (args: GenerateTestArgs) => {
  const { fileExports, config } = args;
  const sortedWithDefaultFirst = sortExports(fileExports);
  const importStatement = getImportStatement({
    ...args,
    fileExports: sortedWithDefaultFirst
  });
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
