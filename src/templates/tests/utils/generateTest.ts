import { GenerateTestArgs } from '../../../types';
import { typescriptJSX } from '../TS/component';
import { typeScriptFile } from '../TS/file';
import prettier from 'prettier';

//TODO: Read prettier config, if that exists, use that config to format the tests
export const generateTest = (args: GenerateTestArgs) => {
  const { ext } = args;
  switch (ext) {
    case '.jsx':
    case '.tsx':
      return prettier.format(typescriptJSX(args));
    case '.ts':
    case '.js':
      return prettier.format(typeScriptFile(args));
    default:
      return prettier.format(typeScriptFile(args));
  }
};
