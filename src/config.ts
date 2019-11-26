import { Config } from './types';

export const defaultConfig: Config = {
  dryRun: false,
  ignored: [],
  included: [],
  testComponentFramework: 'react-testing-library',
  testFramework: 'jest'
};
