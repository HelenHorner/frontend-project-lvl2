import _ from 'lodash';

const makeLine = (val, depth) => {
  if (!_.isObject(val)) {
    return val;
  }
  const keys = Object.keys(val);
  const lines = keys.map((key) => `${' '.repeat(depth * 4 + 4)}${key}: ${makeLine(val[key], depth + 1)}`).join('\n');
  return `{\n${lines}\n${' '.repeat(depth * 4)}}`;
};

const stylish = (diff, depth = 1, space = 4) => {
  const iter = (item) => {
    const replacer = ' ';
    let result = '';
    switch (item.type) {
      case 'nested':
        result = [`${replacer.repeat(depth * space)}${item.key}: ${stylish(item.children, depth + 1)}`];
        break;
      case 'added':
        result = [`${replacer.repeat(depth * space - 2)}+ ${item.key}: ${makeLine(item.value, depth)}`];
        break;
      case 'deleted':
        result = [`${replacer.repeat(depth * space - 2)}- ${item.key}: ${makeLine(item.value, depth)}`];
        break;
      case 'changed':
        result = [[`${replacer.repeat(depth * space - 2)}- ${item.key}: ${makeLine(item.value, depth)}`], [`${replacer.repeat(depth * space - 2)}+ ${item.key}: ${makeLine(item.newValue, depth)}`]].join('\n');
        break;
      case 'unchanged':
        result = [`${replacer.repeat(depth * space - 2)}  ${item.key}: ${makeLine(item.value, depth)}`];
        break;
      default:
        throw new Error('Error AST');
    }
    return result;
  };
  const { children } = diff;
  const lines = children.map((line) => iter(line, depth));

  return ['{', ...lines, `${' '.repeat(depth * space - 4)}}`].join('\n');
};

export default stylish;
