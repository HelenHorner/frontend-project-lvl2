import _ from 'lodash';

const buildDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();
  const iter = (key) => {
    if (!_.has(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (!_.has(file2, key)) {
      return { key, value: file1[key], type: 'deleted' };
    }
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { key, value: buildDiff(file1[key], file2[key]), type: 'nested' };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        key, value: file1[key], newValue: file2[key], type: 'changed',
      };
    } else {
      return { key, value: file1[key], type: 'unchanged' };
    }
  };

  const diff = keys.map((key) => iter(key));
  console.log(diff);
  return { type: 'root', children: diff };
};

export default buildDiff;
