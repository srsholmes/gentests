import { FileExport } from '../../types';
import { ParserPlugin } from '@babel/parser';

export const getFromPath = (fileName: string, fromPath?: string) => {
  return `from '${fromPath || `./${fileName}`}'`;
};

export const testIfNodeIsJSX = (node: any) => {
  console.log('tesFile For JSX');
  console.log({ node });
  return true;
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
  console.log({ fileExports })
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

export function flatten(arr: any[]) {
  return [].concat(...arr);
}

export const getDefaultName = (node: any, fileName: string) => {
  if (node.declaration) {
    if (node.declaration.id) {
      return node.declaration.id.name;
    }
    return node.declaration.name || fileName;
  }
  return fileName;
};
export const getNamedExport = (node: any) => {
  console.log({ node });
  if (node.declaration && node.declaration.id) {
    const isJSX = testIfNodeIsJSX(node);
    return {
      type: node.type,
      declarationType: node.declaration.id.type,
      name: node.declaration.id.name,
      jsx: isJSX
    };
  }
  if (node.declaration && node.declaration.declarations) {
    return node.declaration.declarations.map((declaration: any) => {
      const isJSX = testIfNodeIsJSX(declaration);
      return {
        type: node.type,
        declarationType: declaration.id.type,
        jsx: isJSX,
        name: declaration.id.name
      };
    });
  }
  if (node.specifiers && node.specifiers.length >= 1) {
    return node.specifiers.map((specifier: any) => {
      const isJSX = testIfNodeIsJSX(specifier);
      return {
        type: node.type,
        declarationType: specifier.exported.type,
        jsx: isJSX,
        name: specifier.exported.name
      };
    });
  }
};
const flowComments = ['// @flow', '/* @flow */'];
export const getPlugins = (
  fileContents: string,
  fileExtension: ValidFileExtensions
) => {
  console.log({ fileExtension });
  if (fileExtension === '.ts' || fileExtension === '.tsx') {
    return ['typescript', 'jsx'] as ParserPlugin[];
  }

  // TODO: FLow support
  // if (
  //   fileExtension === 'js' &&
  //   flowComments.some((x: string) => fileContents.includes(x))
  // ) {
  //   return ['flow'];
  // }
  return ['jsx'] as ParserPlugin[];
};
export type ValidFileExtensions = '.tsx' | '.ts' | '.js' | '.jsx';