import _ from 'lodash';

const buildDiff = (key, file1, file2) => {
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
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

export default buildDiff;
