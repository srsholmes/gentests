import { parse } from '@babel/parser';
import { Statement } from '@babel/types';
import traverse from '@babel/traverse';
import {
  flatten,
  getDefaultName,
  getNamedExport,
  getPlugins,
  testIfNodeIsJSX,
  ValidFileExtensions
} from './templates/tests/shared';

const JSXTYpe = 'JSXElement';

type ParseFileArgs = {
  fileContents: string;
  fileName: string;
  fileExtension: ValidFileExtensions;
};
export const parseFile = ({
  fileContents,
  fileName,
  fileExtension
}: ParseFileArgs) => {
  try {
    const parsedCode = parse(fileContents, {
      sourceType: 'module',
      plugins: getPlugins(fileContents, fileExtension)
    });
    const arr = parsedCode.program.body.map(
      (node: Statement, i: number, arr: any[]) => {
        if (node.type === 'ExportDefaultDeclaration') {
          const actualDeclaration = arr.find((x: any) => {
            if (x.id) {
              const nameOfDefaultExport = getDefaultName(node);
              return x.id.name === nameOfDefaultExport;
            }
            return null;
          });
          console.log({ actualDeclaration });
          if (actualDeclaration) {
            console.log({
              type: actualDeclaration.type,
              name: actualDeclaration.id.name,
              jsx: testIfNodeIsJSX(actualDeclaration)
            });
            return {
              type: actualDeclaration.type,
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
