import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const expectValue = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff flat files', () => {
  expect(genDiff('flat_file1.json'), ('flat_file2.json')).toEqual(expectValue);
});
