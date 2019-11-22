import { FileExport, ValidFileExtensions } from './types';
import { typescriptJSX } from './templates/tests/TS/component';
import { typeScriptFile } from './templates/tests/TS/file';
import prettier from 'prettier';

export const generateTest = (
  fileExports: FileExport[],
  ext: ValidFileExtensions,
  fileName: string
) => {
  switch (ext) {
    case '.jsx':
    case '.tsx':
      return prettier.format(typescriptJSX(fileExports, fileName));
    case '.ts':
    case '.js':
      return prettier.format(typeScriptFile(fileExports, fileName));
    default:
      return prettier.format(typescriptJSX(fileExports, fileName));
  }
};
