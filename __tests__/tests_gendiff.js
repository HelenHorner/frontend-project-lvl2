/* eslint no-underscore-dangle: 0 */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('gendiff json files', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readFile('stylish_result.txt'));
});

test('gendiff yaml files', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(readFile('stylish_result.txt'));
});

test('gendiff json files, plain', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toBe(readFile('plain_result.txt'));
});

test('gendiff yml files, plain', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toBe(readFile('plain_result.txt'));
});

test('gendiff yml files, json', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toBe(readFile('result_json.json'));
});

test('gendiff json files, json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toBe(readFile('result_json.json'));
});
