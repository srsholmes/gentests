import { GenerateTestArgs } from '../../../types';
import { typescriptJSX } from '../TS/component';
import { typeScriptFile } from '../TS/file';
import prettier, { BuiltInParserName } from 'prettier';

//TODO: Read prettier config, if that exists, use that config to format the tests
const options = {
  parser: 'babel' as BuiltInParserName
};

export const generateTest = (args: GenerateTestArgs) => {
  const { ext } = args;
  switch (ext) {
    case '.jsx':
    case '.tsx':
      return prettier.format(typescriptJSX(args), options);
    case '.ts':
    case '.js':
      return prettier.format(typeScriptFile(args), options);
    default:
      return prettier.format(typeScriptFile(args), options);
  }
};
