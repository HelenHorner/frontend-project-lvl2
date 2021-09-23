import path from 'path';
import fs from 'fs';
import startToParse from '../parsers/parser.js';
import buildDiff from './buildDiff.js';
import showTree from './showTree.js';

const makeTheWay = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => fs.readFileSync(makeTheWay(filename), 'utf8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(makeTheWay(filepath1));
  const file2 = readFile(makeTheWay(filepath2));
  const parsedFile1 = startToParse(file1, path.extname(filepath1).replace('.', ''));
  const parsedFile2 = startToParse(file2, path.extname(filepath2).replace('.', ''));
  const diff = buildDiff(parsedFile1, parsedFile2);
  console.log(showTree(format, diff));
};

export default genDiff;
