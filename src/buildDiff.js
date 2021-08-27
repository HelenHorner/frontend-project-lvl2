import _ from 'lodash';

const buildDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();
  // eslint-disable-next-line no-restricted-syntax
  const iter = (key) => {
    const result = {};
    // console.log(file1[key]);
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      result[key] = { children: buildDiff(file1[key], file2[key]) };
      result.type = 'nested';
      // console.log(result);
    } else if (_.isObject(file1[key]) && !_.isObject(file2[key])) {
      result[key] = file1[key];
      result.type = 'deleted';
    } else if (!_.isObject(file1[key]) && _.isObject(file2[key])) {
      result[key] = file2[key];
      result.type = 'added';
    } else
    if (!_.has(file1, key)) {
      if (_.isObject(file2[key])) {
        result[key] = buildDiff(file2[key]);
        result.type = 'added';
      } else {
        result[key] = file2[key];
        result.type = 'added';
      }
    } else if (!_.has(file2, key)) {
      if (_.isObject(file1[key])) {
        result[key] = buildDiff(file1[key]);
        result.type = 'deleted';
      } else {
        result[key] = file1[key];
        result.type = 'deleted';
      }
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

  const diff = keys.map((key) => iter(key));
  console.log(diff);
  // return { type: 'root', children: diff };
  // console.log({ type: 'root', children: diff });
};

export default buildDiff;
