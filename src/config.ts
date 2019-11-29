import { Config } from './types';
import { ParserPlugin } from '@babel/parser';

export const defaultConfig: Config = {
  dryRun: false,
  ignored: [],
  included: [],
  testComponentFramework: 'react-testing-library',
  testFramework: 'jest',
  babelPlugins: []
};
