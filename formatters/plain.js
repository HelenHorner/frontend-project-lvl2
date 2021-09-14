import _ from 'lodash';

const complexValue = (value) => `${_.isPlainObject(value) ? '[complex value]' : `'${value}'`}`;

const makePlain = (diff, wayCounter) => {
  const iter = (item) => {
    switch (item.type) {
      case 'nested':
        return makePlain(item.children, [...wayCounter, item.key]);
      case 'added':
        return [`Property '${[...wayCounter, item.key].join('.')}' was added with value: ${complexValue(item.value)}`];
      case 'deleted':
        return [`Property '${[...wayCounter, item.key].join('.')}' was removed`];
      case 'changed':
        return [`Property '${[...wayCounter, item.key].join('.')}' was updated. From ${complexValue(item.value)} to ${complexValue(item.newValue)}`];
      case 'unchanged':
        return '';
      default:
        throw new Error('Error AST');
    }
  };
  const { children } = diff;
  const strARR = children.map((item) => iter(item));
  const lines = strARR.filter((line) => line !== '');
  return [
    ...lines,
  ].join('\n');
};

const plain = (diff) => {
  const wayCounter = [];
  return makePlain(diff, wayCounter);
};

export default plain;
