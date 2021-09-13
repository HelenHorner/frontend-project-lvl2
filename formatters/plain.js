import _ from 'lodash';

const complexValue = (value) => `${_.isPlainObject(value) ? '[complex value]' : `'${value}'`}`;

const makePlain = (diff, wayCounter) => {
  // console.log(diff);
  const iter = (item) => {
    wayCounter.push(item.key);
    // console.log(item);
    // console.log(wayCounter);
    let result = '';
    switch (item.type) {
      case 'nested':
        return makePlain(item.children, wayCounter);
      case 'added':
        result = [`Property '${wayCounter.join('.')}' was added with value: ${complexValue(item.value)}`];
        wayCounter.pop();
        return result;
      case 'deleted':
        result = [`Property '${wayCounter.join('.')}' was removed`];
        wayCounter.pop();
        return result;
      case 'changed':
        result = [`Property '${wayCounter.join('.')}' was updated. From ${complexValue(item.value)} to ${complexValue(item.newValue)}`];
        wayCounter.pop();
        return result;
      case 'unchanged':
        wayCounter.pop();
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
