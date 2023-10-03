import { expect, test } from '@jest/globals';
import { execaCommand } from 'execa';

test('Passes in the react-passing test project', async () => {
  const { stdout, stderr } = await execaCommand(
    `../../../../bin/preflight.js`,
    {
      cwd: '__tests__/fixtures/__temp/react-passing',
    },
  );

  const stdoutSortedWithoutVersionNumber = stdout
    .replace(/(UpLeveled Preflight) v\d+\.\d+\.\d+(-\d+)?/, '$1')
    .split('\n')
    .sort((a: string, b: string) => {
      if (b.includes('UpLeveled Preflight')) return 1;
      return a < b ? -1 : 1;
    })
    .join('\n')
    .trim();

  expect(stdoutSortedWithoutVersionNumber).toMatchSnapshot();
  expect(stderr.replace(/^\(node:\d+\) /, '')).toMatchSnapshot();
}, 30000);
