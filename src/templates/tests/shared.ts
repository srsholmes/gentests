import { FileExport } from '../../types';

export const getFromPath = (fileName: string, fromPath?: string) => {
  return `from '${fromPath || `./${fileName}`}'`;
};

export const sortExports = (arr: FileExport[]) =>
  [...arr].sort((a: FileExport, b: FileExport) =>
    a.type === 'ExportDefaultDeclaration' ? -1 : 1
  );

interface Accum {
  exportString: string;
  defaultExport: string[];
  namedExports: string[];
}

export const importTemplate = (fileExports: FileExport[], fileName: string) => {
  const res = fileExports.reduce(
    (acc: Accum, curr: FileExport, index: number, arr: FileExport[]) => {
      if (curr.type === 'ExportDefaultDeclaration') {
        return {
          exportString: `import ${curr.name}, `,
          defaultExport: [curr.name],
          namedExports: []
        };
      } else if (curr.type === 'ExportNamedDeclaration') {
        const addOpenBracket = acc.namedExports.length === 0;
        const addCloseBracket = index === arr.length - 1;
        const val = `
          ${addOpenBracket ? '{' : ''} 
          ${curr.name}, 
          ${addCloseBracket ? '}' : ''}
        `;
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
