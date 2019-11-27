import { FileExport } from './types';
import chalk from 'chalk';
import { isJSX, traverse } from '@babel/types';
import { highlight } from 'cli-highlight';

export const testIfNodeIsJSX = (node: any) => {
  let jsxDetected = false;
  traverse(node, {
    enter(path) {
      if (isJSX(path)) {
        jsxDetected = true;
        return false;
      }
    }
  });
  return jsxDetected;
};

export const sortExports = (arr: FileExport[]) =>
  [...arr].sort((a: FileExport, b: FileExport) =>
    a.type === 'ExportDefaultDeclaration' ? -1 : 1
  );

export function flatten(arr: any[]) {
  return [].concat(...arr);
}

const flowComments = ['// @flow', '/* @flow */'];

interface DryRunArgs {
  testFile: string;
  testTemplate?: string;
}

const SPACER_REPEAT = 10;
export const fileExistsLog = (args: DryRunArgs) => {
  const { testFile } = args;
  console.log(
    '-'.repeat(SPACER_REPEAT),
    chalk.yellow(
      `\n File exists: \n ${testFile} \n Skipping creation of test template. \n`
    ),
    '-'.repeat(SPACER_REPEAT)
  );
  return;
};

export const dryRunLog = (args: DryRunArgs) => {
  const { testFile, testTemplate } = args;
  if (testTemplate) {
    const highlighted = highlight(testTemplate, {
      language: 'ts',
      ignoreIllegals: true,
      theme: 'Tomorrow Night'
    });

    console.log(
      '-'.repeat(SPACER_REPEAT),
      `\n Dry run: ${testFile} would have been written with template: \n \n ${highlighted} \n`,
      '-'.repeat(SPACER_REPEAT)
    );
  }
  return;
};
