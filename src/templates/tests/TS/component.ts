import { FileExport } from '../../../types';

const testTemplate = ({ name }: { name: string }) => `
  describe('${name} ', () => {
    it('should fail the automatically generated test', () => {
      expect(true).toBe(false);
    });
  });
 `;

const getFromPath = (fileName: string, fromPath?: string) => {
  return `from '${fromPath || `./${fileName}`}'`;
};

interface Accum {
  exportString: string;
  defaultExport: string[];
  namedExports: string[];
}

const importTemplate = (fileExports: FileExport[], fileName: string) => {
  const res = fileExports.reduce(
    (acc: Accum, curr: FileExport, index: number, arr: FileExport[]) => {
      if (curr.type === 'ExportDefaultDeclaration') {
        return {
          exportString: `import ${curr.name}, `,
          defaultExport: [curr.name],
          namedExports: []
        };
      } else if (curr.type === 'ExportNamedDeclaration') {
        // TODO: Check here to see if there is a default export, if there wasnt, there will be no 'import' on the begining of exportString
        const addOpenBracket = acc.namedExports.length === 0;
        const addCloseBracket = index === arr.length - 1;
        const val = `${addOpenBracket ? '{' : ''} ${curr.name}, ${
          addCloseBracket ? '}' : ''
        }`;
        return {
          exportString: `${acc.exportString} ${val}`,
          defaultExport: acc.defaultExport,
          namedExports: [...acc.namedExports, curr.name]
        };
      }

      return acc;
    },
    {
      exportString: 'import ',
      defaultExport: [],
      namedExports: []
    }
  );

  return `${res.exportString} ${getFromPath(fileName)}`;
};

export const typescriptJSX = (fileExports: FileExport[], fileName: string) => {
  const sortedWithDefaultFirst = [
    ...fileExports
  ].sort((a: FileExport, b: FileExport) =>
    a.type === 'ExportDefaultDeclaration' ? -1 : 1
  );
  const importStatement = importTemplate(sortedWithDefaultFirst, fileName);
  const tests = sortedWithDefaultFirst.map((x: FileExport) => testTemplate(x));
  const res = `
    ${importStatement} 
    ${tests.join('\n')}
  `;
  console.log({ res });
  return res;
};
