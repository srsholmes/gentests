import { ValidFileExtensions } from './parseFile';
import { FileExport } from './types';
import { typescriptJSX } from './templates/tests/TS/component';
import prettier from 'prettier';

export const generateTest = (
  fileExports: FileExport[],
  ext: ValidFileExtensions
) => {
  switch (ext) {
    case '.tsx':
      return prettier.format(typescriptJSX(fileExports));
    case '.ts':
    case '.js':
    case '.jsx':
    default:
      return `default template`;
  }
  console.log('Generate Test Template');
};
