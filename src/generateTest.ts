import { ValidFileExtensions } from './parseFile';
import { FileExport } from './types';
import { typescriptJSX } from './templates/tests/TS/component';
import prettier from 'prettier';

export const generateTest = (
  fileExports: FileExport[],
  ext: ValidFileExtensions,
  fileName: string
) => {
  switch (ext) {
    case '.tsx':
    case '.ts':
    case '.js':
    case '.jsx':
    default:
      return prettier.format(typescriptJSX(fileExports, fileName));
  }
};
