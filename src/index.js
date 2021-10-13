import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import buildDiff from './buildDiff.js';
import formatTree from './formatters/formatTree.js';

const getFullPath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => fs.readFileSync(getFullPath(filename), 'utf8');
const extractFormat = (filepath) => path.extname(filepath).replace('.', '');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const parsedFile1 = parse(file1, extractFormat(filepath1));
  const parsedFile2 = parse(file2, extractFormat(filepath2));
  const diff = buildDiff(parsedFile1, parsedFile2);
  return formatTree(diff, format);
};

export default genDiff;
