import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

// const expectValue = '{
//   - follow: false
//     host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 50
//   + timeout: 20
//   + verbose: true
// }';

// const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

test('gendiff flat files', () => {
  expect(genDiff('../__fixtures__/flat_file1.json'), ('../__fixtures__/flat_file2.json')).toEqual('expectValue');
});
