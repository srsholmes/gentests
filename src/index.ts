import { parseFile, ValidFileExtensions } from './parseFile';
import { existsSync, promises, readFileSync } from 'fs';
import { getDirectoriesAndComponents } from './getFiles';
import { generateTest } from './generateTest';
import { join } from 'path';

(async () => {
  const res = await getDirectoriesAndComponents();
  res.slice(0,1).forEach(x => {
    console.log({ x })
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
