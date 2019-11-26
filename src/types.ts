export interface FileExport {
  type: string;
  name: string;
  declarationType: string;
  jsx: boolean;
}

export type ValidFileExtensions = '.tsx' | '.ts' | '.js' | '.jsx';
export type SupportedTestFrameWorks = 'jest' | 'tape' | 'ava';

export interface ParseFileArgs {
  fileContents: string;
  fileName: string;
  fileExtension: ValidFileExtensions;
}

export type SupportedComponentTestFrameWorks =
  | 'react-testing-library'
  | 'enzyme'
  | 'react-test-renderer';

export interface Config {
  dryRun: boolean;
  ignored: string[];
  included: string[];
  testFramework: SupportedTestFrameWorks;
  testComponentFramework: SupportedComponentTestFrameWorks;
}

export interface GenerateTestArgs {
  fileExports: FileExport[];
  ext: ValidFileExtensions;
  fileName: string;
  config: Config;
}
