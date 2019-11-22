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
