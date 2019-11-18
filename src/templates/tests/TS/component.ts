import { FileExport } from '../../../types';

const template = ({ name }: { name: string }) => `
  describe('${name} ', () => {
    it('should fail the automatically generated test', () => {
      expect(true).toBe(false);
    });
  });
 `;

export const typescriptJSX = (fileExports: FileExport[]) => {
  const arr = fileExports.map((x: FileExport) => {
    return template(x);
  });

  return arr;
};
