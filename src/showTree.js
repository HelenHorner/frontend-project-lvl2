const showTree = (diff) => {
  const iter = (item) => {
    switch (item.type) {
      case 'nested':
        return [`${item.key}: ${showTree(item.children)}`];
      case 'added':
        return [`+ ${item.key}: ${item.value}`];
      case 'deleted':
        return [`- ${item.key}: ${item.value}`];
      case 'changed':
        return [[`- ${item.key}: ${item.value}`], [`+ ${item.key}: ${item.newValue}`]].join('\n');
      case 'unchanged':
        return [`  ${item.key}: ${item.value}`];
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
