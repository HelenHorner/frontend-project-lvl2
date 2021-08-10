import _ from 'lodash';
import startToParse from '../parsers/parser.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = startToParse(filepath1);
  const file2 = startToParse(filepath2);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (!_.has(file1, key)) {
      result[`+ ${key}`] = file2[key];
    } else if (!_.has(file2, key)) {
      result[`- ${key}`] = file1[key];
    } else if (file1[key] !== file2[key]) {
      result[`- ${key}`] = file1[key];
      result[`+ ${key}`] = file2[key];
    } else {
      result[`  ${key}`] = file1[key];
    }
  }

  console.log(result);
};

export default genDiff;
