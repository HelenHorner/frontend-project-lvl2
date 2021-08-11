import startToParse from '../parsers/parser.js';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2, formatName = '') => {
  const file1 = startToParse(filepath1);
  const file2 = startToParse(filepath2);
  return buildTree(file1, file2, formatName);
};

export default genDiff;
