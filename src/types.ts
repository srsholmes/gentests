export interface FileExport {
  type: string;
  name: string;
  declarationType: string;
  jsx: boolean;
}

export type SupportedFileExtensions = '.tsx' | '.ts' | '.js' | '.jsx';
export type SupportedTestFrameWorks = 'jest' | 'tape' | 'ava';

export interface ParseFileArgs {
  fileContents: string;
  fileName: string;
  fileExtension: SupportedFileExtensions;
}

export type SupportedComponentTestFrameWorks =
  | 'react-testing-library'
  | 'enzyme'
  | 'react-test-renderer'
  | '@test-library/react';

export interface Config {
  dryRun: boolean;
  ignored: string[];
  included: string[];
  testFramework: SupportedTestFrameWorks;
  testComponentFramework: SupportedComponentTestFrameWorks;
}

export interface GenerateTestArgs {
  fileExports: FileExport[];
  ext: SupportedFileExtensions;
  fileName: string;
  config: Config;
}
