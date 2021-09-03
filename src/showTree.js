const showTree = (diff) => {
  const iter = (item) => {
    const value = Object.keys(item)[0];
    switch (item.type) {
      case 'nested':
        return [`${value}: ${iter(item[value])}`];
      case 'added':
        return [`+ ${value}: ${item[value]}`];
      case 'deleted':
        return [`- ${value}: ${item[value]}`];
      case 'changed':
        return [[`- ${value}: ${item[value]}`], [`+ ${value}: ${item.newValue}`]].join('\n');
      case 'unchanged':
        return [`  ${value}: ${item[value]}`];
      default:
        throw new Error('Error AST');
    }
  };
  const { children } = diff;
  const strARR = children.map((item) => iter(item));
  return [
    '{',
    ...strARR,
    '}',
  ].join('\n');
};

export default showTree;
