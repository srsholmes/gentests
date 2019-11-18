import { FileExport } from '../../../types';

const testTemplate = ({ name }: { name: string }) => `
  describe('${name} ', () => {
    it('should fail the automatically generated test', () => {
      expect(true).toBe(false);
    });
  });
 `;

const importTemplate = (fileExports: FileExport[]) => {
  const hasDefaultExport = fileExports.find(
    (x: FileExport) => x.type === 'ExportDefaultDeclaration'
  );

  if (hasDefaultExport) {
    console.log('we have a default export')
  }
  return `
  `;
};

export const typescriptJSX = (fileExports: FileExport[]) => {
  const arr = fileExports.map((x: FileExport) => {
    return testTemplate(x);
  });

  return arr;
};
