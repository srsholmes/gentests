import { parseFile } from './parseFile';
import { existsSync, promises, readFileSync } from 'fs';
import { getDirectoriesAndComponents } from './getFiles';
import { generateTest } from './generateTest';
import { join } from 'path';
import { Config, ValidFileExtensions } from './types';
import { defaultConfig } from './config';

(async () => {

  const userConfig: Partial<Config> = {
    testFramework: 'jest',
    testComponentFramework: 'react-testing-library'
  };

  const config = {
    ...defaultConfig,
    ...userConfig
  };

  const res = await getDirectoriesAndComponents(config);
  res.slice().forEach(x => {
    const { dir, name, ext } = x;
    const testDir = dir;
    const testFile = join(dir, `${name}.test${ext}`);
    const filePath = `${dir}/${name}${ext}`;
    const fileContents = readFileSync(filePath).toString();

    const exportsFromFile = parseFile({
      fileContents,
      fileName: name,
      fileExtension: ext as ValidFileExtensions
    });

    if (exportsFromFile) {
      const testTemplate = generateTest(
        exportsFromFile.fileExports,
        ext as ValidFileExtensions,
        name
      );

      if (existsSync(testDir)) {
        promises.writeFile(testFile, testTemplate, 'utf8');
      } else {
        promises
          .mkdir(testDir)
          .then(() => {
            promises.writeFile(testFile, testTemplate, 'utf8');
          })
          .catch(() => {});
      }
    }
  });
})();
