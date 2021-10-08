import _ from 'lodash';

const buildDiff = (filePath1, filePath2) => {
  const keys1 = Object.keys(filePath1);
  const keys2 = Object.keys(filePath2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);
  const iter = (key) => {
    if (!_.has(filePath1, key)) {
      return { key, value: filePath2[key], type: 'added' };
    }
    if (!_.has(filePath2, key)) {
      return { key, value: filePath1[key], type: 'deleted' };
    }
    if (_.isPlainObject(filePath1[key]) && _.isPlainObject(filePath2[key])) {
      return {
        key, value: null, children: buildDiff(filePath1[key], filePath2[key]), type: 'nested',
      };
    }
    if (!_.isEqual(filePath1[key], filePath2[key])) {
      return {
        key, oldValue: filePath1[key], newValue: filePath2[key], type: 'changed',
      };
    } return { key, value: filePath1[key], type: 'unchanged' };
  };

  const diff = sortedKeys.map((key) => iter(key));
  return { type: 'root', children: diff };
};

export default buildDiff;
