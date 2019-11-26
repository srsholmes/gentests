import { join, parse } from 'path';
import fg from 'fast-glob';
import { Config } from '../../../types';

const DEFAULT_IGNORED = [
  '**/components/**/*.stories.tsx',
  '**/components/**/*.test.tsx',
  '**/components/**/*.test.ts',
  '**/utils/**/*.test.ts',
  '**/components/**/*.test.js',
  '**/components/**/*.test.jsx',
  '**/components/**/__mocks__/*.tsx',
  '**/components/**/__mocks__/*.js',
  '**/components/**/__mocks__/*.jsx',
  '**/components/**/__mocks__/*.ts',
  '**/node_modules/**/*',
  // TODO: Remove these from published module
  '**/src/**/*',
  '**/lib/**/*'
];

const IGNORED_COMPONENTS: string[] = [
  // '**/components/MyComponent/MyComponentButtons.tsx',
  // '**/components/Component/Component.tsx'
];

export const getDirectoriesAndComponents = async (config: Config) => {
  const { ignored } = config;
  console.log(process.cwd());
  return fg(
    [
      // join(process.cwd(), '**/components/JS/ComponentFour/*.{ts,tsx,js,jsx}'),
      join(process.cwd(), '**/components/**/*.{ts,tsx,js,jsx}'),
      join(process.cwd(), '**/utils/**/*.{ts,tsx,js,jsx}')
    ],
    {
      ignore: [...DEFAULT_IGNORED, ...ignored]
    }
  ).then((files: any[]) => {
    console.log({ files });
    return files.map(file => {
      const { dir, name, ext } = parse(file);
      return { dir, name, ext };
    });
  });
};
