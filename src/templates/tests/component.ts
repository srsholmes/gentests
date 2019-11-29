import { FileExport, GenerateTestArgs } from '../../types';
import { sortExports } from '../../utils';
import { getImportStatement } from './getImportStatement';
import { testTemplate } from './testTemplates';

export const typescriptJSX = (args: GenerateTestArgs) => {
  const { fileExports, config } = args;
  const sortedWithDefaultFirst = sortExports(fileExports);
  const importStatement = getImportStatement({
    ...args,
    fileExports: sortedWithDefaultFirst
  });
  const tests = sortedWithDefaultFirst.map((x: FileExport) =>
    testTemplate(x, config)
  );

  const res = `
    ${importStatement} 
    ${tests.join('\n')}
  `;

  return res;
};
