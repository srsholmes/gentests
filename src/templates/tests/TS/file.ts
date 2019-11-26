import { FileExport } from '../../../types';
import { sortExports } from '../../../utils';
import { importTemplate } from '../utils/shared';

const testTemplate = ({ name }: { name: string }) => `
  describe('${name}', () => {
    it('${name} should fail the automatically generated test', () => {
      const actual = ${name}();
      const expected = null;
      expect(actual).toBe(expected);
    });
  });
 `;

export const typeScriptFile = (fileExports: FileExport[], fileName: string) => {
  const sortedWithDefaultFirst = sortExports(fileExports);
  const importStatement = importTemplate(sortedWithDefaultFirst, fileName);
  const tests = sortedWithDefaultFirst.map((x: FileExport) => testTemplate(x));
  const res = `
    ${importStatement} 
    ${tests.join('\n')}
  `;
  return res;
};
