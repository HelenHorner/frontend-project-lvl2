import { test, expect } from '@jest/globals';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const yaml = require('js-yaml');

const expectValue = yaml.load(fs.readFileSync('../__fixtures__/expect_value_yaml_flat.yaml', 'utf8'));

test('gendiff flat files', async () => {
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  expect(genDiff(readFile('flat_file1.yaml'), readFile('flat_file2.yaml'))).toEqual(expectValue);
});
