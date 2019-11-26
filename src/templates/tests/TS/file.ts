import { FileExport, GenerateTestArgs } from '../../../types';
import { sortExports } from '../../../utils';
import { getImportStatement } from '../utils/getImportStatement';

const testTemplate = ({ name }: { name: string }) => `
  describe('${name}', () => {
    it('${name} should fail the automatically generated test', () => {
      const actual = ${name}();
      const expected = null;
      expect(actual).toBe(expected);
    });
  });
 `;

export const typeScriptFile = (args: GenerateTestArgs) => {
  const { fileExports } = args;
  const sortedWithDefaultFirst = sortExports(fileExports);
  const importStatement = getImportStatement({
    ...args,
    fileExports: sortedWithDefaultFirst
  });
  const tests = sortedWithDefaultFirst.map((x: FileExport) => testTemplate(x));
  const res = `
    ${importStatement} 
    ${tests.join('\n')}
  `;
  return res;
};
