import { FileExport } from './types';
import { isJSX, traverse } from '@babel/types';

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

export function flatten(arr: any[]) {
  return [].concat(...arr);
}

const flowComments = ['// @flow', '/* @flow */'];
