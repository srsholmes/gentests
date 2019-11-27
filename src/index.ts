import { parseFile } from './templates/tests/utils/parseFile';
import { existsSync, promises, readFileSync } from 'fs';
import { getDirectoriesAndComponents } from './templates/tests/utils/getFiles';
import { generateTest } from './templates/tests/utils/generateTest';
import { join } from 'path';
import { Config, SupportedFileExtensions } from './types';
import { defaultConfig } from './config';
import { dryRunLog, fileExistsLog } from './utils';

const userConfig: Partial<Config> = {
  testComponentFramework: '@test-library/react',
  dryRun: true
};

(async () => {
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
      fileExtension: ext as SupportedFileExtensions
    });

    if (exportsFromFile) {
      const testTemplate = generateTest({
        fileExports: exportsFromFile.fileExports,
        ext: ext as SupportedFileExtensions,
        fileName: name,
        config
      });

      if (existsSync(testDir)) {
        if (config.dryRun) {
          return dryRunLog({ testFile, testTemplate });
        }
        // TODO: Check if file exists here and if so log that the test already exists
        if (existsSync(testFile)) {
          return fileExistsLog({ testFile });
        }
        promises.writeFile(testFile, testTemplate, 'utf8');
      } else {
        if (config.dryRun) {
          return dryRunLog({ testFile, testTemplate });
        }
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
