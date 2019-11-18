import { parseFile, ValidFileExtensions } from './parseFile';
import { readFileSync } from 'fs';
import { getDirectoriesAndComponents } from './getFiles';
import { generateTest } from './generateTest';

(async () => {
  const res = await getDirectoriesAndComponents();
  const [first] = res;
  const { dir, name, ext } = first;

  console.log({ res });

  const fileContents = readFileSync(`${dir}/${name}${ext}`).toString();
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
      ext as ValidFileExtensions
    );
    console.log({ testTemplate });
  }
})();
