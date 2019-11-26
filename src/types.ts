export type FileExport = {
  type: string;
  name: string;
  declarationType: string;
  jsx: boolean;
};

export type ValidFileExtensions = '.tsx' | '.ts' | '.js' | '.jsx';

export type ParseFileArgs = {
  fileContents: string;
  fileName: string;
  fileExtension: ValidFileExtensions;
};

type SupportedComponentTestFrameWorks =
  | 'react-testing-library'
  | 'enzyme'
  | 'react-test-renderer';

type SupportedTestFrameWorks = 'jest' | 'tape' | 'ava';

export type Config = {
  dryRun: boolean,
  ignored: string[];
  included: string[];
  testFramework: SupportedTestFrameWorks;
  testComponentFramework: SupportedComponentTestFrameWorks;
};
