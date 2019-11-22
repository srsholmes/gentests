import { FileExport } from '../../types';
import { ParserPlugin } from '@babel/parser';
import { isJSX, traverse } from '@babel/types';

export const getFromPath = (fileName: string, fromPath?: string) => {
  return `from '${fromPath || `./${fileName}`}'`;
};

export const testIfNodeIsJSX = (node: any) => {
  let jsxDetected = false;
  traverse(node, {
    enter(path) {
      if (isJSX(path)) {
        jsxDetected = true;
        return false;
      }
    }
  });
  return jsxDetected;
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
          exportString: `import ${curr.name}`,
          defaultExport: [curr.name],
          namedExports: []
        };
      } else if (curr.type === 'ExportNamedDeclaration') {
        const needACommaAfterDefaultExport =
          acc.defaultExport.length > 0 && index === 1;
        const addOpenBracket = acc.namedExports.length === 0;
        const addCloseBracket = index === arr.length - 1;
        const val = `
          ${needACommaAfterDefaultExport ? ',' : ''} ${
          addOpenBracket ? '{' : ''
        } ${curr.name}, ${addCloseBracket ? '}' : ''}
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

  return `${res.exportString.trim()} ${getFromPath(fileName)}`;
};

export function flatten(arr: any[]) {
  return [].concat(...arr);
}

export const getDefaultName = (node: any, fileName?: string) => {
  if (node.declaration) {
    if (node.declaration.id) {
      return node.declaration.id.name;
    }
    return node.declaration.name || fileName;
  }
  return fileName;
};

export const getNamedExport = (
  node: any
): FileExport | FileExport[] | undefined => {
  const isJSX = testIfNodeIsJSX(node);
  if (node.declaration && node.declaration.id) {
    return {
      type: node.type,
      declarationType: node.declaration.id.type,
      name: node.declaration.id.name,
      jsx: isJSX
    };
  }
  if (node.declaration && node.declaration.declarations) {
    return node.declaration.declarations.map((declaration: any) => {
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
