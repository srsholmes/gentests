import { SupportedFileExtensions } from '../../../types';
import { ParserPlugin } from '@babel/parser';

export const getPlugins = (
  fileContents: string,
  fileExtension: SupportedFileExtensions
) => {
  return ['typescript', 'jsx'] as ParserPlugin[];
};
