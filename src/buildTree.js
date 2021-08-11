import _ from 'lodash';

const buildTree = (file1, file2, formatName = '') => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();
  const result = {};
  if (formatName === '') {
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
  }
  if (formatName === 'plain') {
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
  }
  if (formatName === 'json') {
    // реализация
  }
  const resultStr = JSON.stringify(result, null, '\t').replace(/"/g, '').replace(/,/g, '');
  console.log(resultStr);
};

export default buildTree;
