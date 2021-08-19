const showTree = (diff) => {
  const iter = (item) => {
    const value = Object.keys(item)[0];
    switch (item.type) {
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

  const strARR = diff.map((item) => iter(item));
  return [
    '{',
    ...strARR,
    '}',
  ].join('\n');
};

export default showTree;
