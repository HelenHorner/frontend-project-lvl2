import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import startToParse from '../parsers/parser.js';
import buildDiff from './buildDiff.js';
import buildTree from './buildTree.js';

const makeTheWay = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(makeTheWay(filename), 'utf8');

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(makeTheWay(filepath1));
  const file2 = readFile(makeTheWay(filepath2));
  const parsedFile1 = startToParse(file1, path.extname(filepath1));
  const parsedFile2 = startToParse(file2, path.extname(filepath2));
  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const keys = _.union(keys1, keys2).sort();
  const diff = keys.map((key) => buildDiff(key, parsedFile1, parsedFile2));
  console.log(buildTree(diff));
};

export default genDiff;
