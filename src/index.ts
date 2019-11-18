import { parseFile, ValidFileExtensions } from './parseFile';
import { readFileSync } from 'fs';
import { getDirectoriesAndComponents } from './getFiles';
import { generateTest } from './generateTest';

(async () => {
  const res = await getDirectoriesAndComponents();
  res.slice(0, 1).forEach(x => {
    const { dir, name, ext } = x;
    const filePath = `${dir}/${name}${ext}`;
    const fileContents = readFileSync(filePath).toString();
    const exportsFromFile = parseFile({
      fileContents,
      fileName: name,
      fileExtension: ext as ValidFileExtensions
    });

    console.log({ exportsFromFile });
    console.log(exportsFromFile!.fileExports);

    if (exportsFromFile) {
      const testTemplate = generateTest(
        exportsFromFile.fileExports,
        ext as ValidFileExtensions,
        fileName
      );
      console.log({ testTemplate });
    }
  });
})();
