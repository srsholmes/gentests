import { existsSync, promises } from 'fs';
import { getDirectoriesAndComponents } from './templates/tests/getFiles';
import { join } from 'path';
import { defaultConfig } from './config';

(async () => {
  const config = {
    ...defaultConfig,
    dryRun: true,
    included: [join(process.cwd(), '**/*.test.ts')]
  };

  // TODO: delete the 'tests' from default ignored....
  const res = await getDirectoriesAndComponents(config);
  res.slice().forEach(x => {
    const { dir, name, ext } = x;
    const testDir = dir;
    const testFile = join(dir, `${name}.test${ext}`);

    if (existsSync(testDir)) {
      if (config.dryRun) {
        console.log(`Will delete the file ${testFile}`);
        return;
      }
      promises.unlink(testFile);
    }
  });
})();
