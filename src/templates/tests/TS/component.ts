import { importTemplate, sortExports } from '../shared';
import { FileExport } from '../../../types';

//TODO: Make this a component test
const testTemplate = ({ name, jsx }: FileExport) => `
  describe('${name}', () => {
    it('${name} should fail the automatically generated test', () => {
      const actual = ${jsx ? `<${name}/>` : `${name}()`};
      const expected = null;
      expect(actual).toBe(expected);
    });
  });
 `;

export const typescriptJSX = (fileExports: FileExport[], fileName: string) => {
  const sortedWithDefaultFirst = sortExports(fileExports);
  const importStatement = importTemplate(sortedWithDefaultFirst, fileName);
  console.log({ sortedWithDefaultFirst });
  const tests = sortedWithDefaultFirst.map((x: FileExport) => testTemplate(x));
  const res = `
    ${importStatement} 
    ${tests.join('\n')}
  `;
  return res;
};
