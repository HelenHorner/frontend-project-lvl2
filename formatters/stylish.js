const makeLine = (val, depth) => {
  if (val === null) {
    return null;
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val);
    const arr = entries.flat();
    const [key, value] = arr;
    return ['{', `${' '.repeat(depth + 6)}${key}: ${makeLine(value, depth + 3)}`, `${' '.repeat(depth + 2)}}`].join('\n');
  }
  return val.toString();
};

const stylish = (diff, depth = 3) => {
  const iter = (item) => {
    const replacer = ' ';
    const currentIndent = replacer.repeat(depth);
    let result = '';
    switch (item.type) {
      case 'nested':
        result = [`${currentIndent} ${item.key}: ${stylish(item.children, depth + 3)}`];
        break;
      case 'added':
        result = [`${currentIndent}+ ${item.key}: ${makeLine(item.value, depth)}`];
        break;
      case 'deleted':
        result = [`${currentIndent}- ${item.key}: ${makeLine(item.value, depth)}`];
        break;
      case 'changed':
        result = [[`${currentIndent}- ${item.key}: ${makeLine(item.value, depth)}`], [`${currentIndent}+ ${item.key}: ${makeLine(item.newValue, depth)}`]].join('\n');
        break;
      case 'unchanged':
        result = [`${currentIndent}  ${item.key}: ${makeLine(item.value, depth)}`];
        break;
      default:
        throw new Error('Error AST');
    }
    return result;
  };
  const { children } = diff;
  const lines = children.map((line) => iter(line, depth));

  return ['{',
    ...lines,
    `${' '.repeat(depth)}}`,
  ].join('\n');
};

export default stylish;
