import _ from 'lodash';

const buildDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();
  // eslint-disable-next-line no-restricted-syntax
  const iter = (key) => {
    const result = {};
    if (!_.has(file1, key)) {
      result[key] = file2[key];
      result.type = 'added';
    } else if (!_.has(file2, key)) {
      result[key] = file1[key];
      result.type = 'deleted';
    } else if (file1[key] !== file2[key]) {
      result[key] = file1[key];
      result.newValue = file2[key];
      result.type = 'changed';
    } else {
      result[key] = file1[key];
      result.type = 'unchanged';
    }
    return result;
  };

  return keys.map((key) => iter(key));
};

export default buildDiff;
