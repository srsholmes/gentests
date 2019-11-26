import { ValidFileExtensions } from '../../../types';
import { ParserPlugin } from '@babel/parser';

export const getPlugins = (
  fileContents: string,
  fileExtension: ValidFileExtensions
) => {
  console.log({ fileExtension });
  if (fileExtension === '.ts' || fileExtension === '.tsx') {
    return ['typescript', 'jsx'] as ParserPlugin[];
  }

  // TODO: FLow support
  // if (
  //   fileExtension === 'js' &&
  //   flowComments.some((x: string) => fileContents.includes(x))
  // ) {
  //   return ['flow'];
  // }
  return ['jsx'] as ParserPlugin[];
};
