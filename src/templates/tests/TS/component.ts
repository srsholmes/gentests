import { FileExport } from '../../../types';
import { importTemplate, sortExports } from '../shared';

//TODO: Make this a component test
const testTemplate = ({ name }: { name: string }) => `
  describe('${name}', () => {
    it('${name} should fail the automatically generated test', () => {
      const actual = ${name}();
      const expected = null;
      expect(actual).toBe(expected);
    });
  });
 `;

export const typescriptJSX = (fileExports: FileExport[], fileName: string) => {
  const sortedWithDefaultFirst = sortExports(fileExports);
  const importStatement = importTemplate(sortedWithDefaultFirst, fileName);
  const tests = sortedWithDefaultFirst.map((x: FileExport) => testTemplate(x));
  const res = `
    ${importStatement} 
    ${tests.join('\n')}
  `;
  return res;
};
