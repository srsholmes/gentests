import { parse } from '@babel/parser';
import { Statement } from '@babel/types';
import { ParseFileArgs } from '../../types';
import { flatten, testIfNodeIsJSX } from '../../utils';
import { getDefaultName, getNamedExport } from './getExportNames';

export const parseFile = ({
  fileContents,
  fileName,
  config
}: ParseFileArgs) => {
  try {
    const parsedCode = parse(fileContents, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx', 'optionalChaining', ...config.babelPlugins]
    });
    const arr = parsedCode.program.body.map(
      (node: Statement, i: number, arr: any[]) => {
        if (node.type === 'ExportDefaultDeclaration') {
          const actualDeclaration = arr.find(
            (x: any) => x.id && x.id.name === getDefaultName(node)
          );
          if (actualDeclaration) {
            return {
              type: 'ExportDefaultDeclaration',
              name: actualDeclaration.id.name,
              jsx: testIfNodeIsJSX(actualDeclaration)
            };
          }
          return {
            type: node.type,
            name: getDefaultName(node, fileName),
            jsx: testIfNodeIsJSX(node)
          };
        }
        if (node.type === 'ExportNamedDeclaration') {
          return getNamedExport(node);
        }
        return null;
      }
    );

    return {
      fileExports: flatten(arr).filter(Boolean)
    };
  } catch (err) {
    console.log({ err });
    console.error('Something went wrong parsing the file');
  }
};
