import { generateTestArgs } from './types';
import { typescriptJSX } from './templates/tests/TS/component';
import { typeScriptFile } from './templates/tests/TS/file';
import prettier from 'prettier';

export const generateTest = (args: generateTestArgs) => {
  const { ext } = args;
  switch (ext) {
    case '.jsx':
    case '.tsx':
      return prettier.format(typescriptJSX(args));
    case '.ts':
    case '.js':
      return prettier.format(typeScriptFile(args));
    default:
      return prettier.format(typescriptJSX(args));
  }
};
