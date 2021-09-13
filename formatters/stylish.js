const showTree = (diff) => {
  const iter = (item, depth) => {
    const spacesCount = 1;
    const replacer = ' ';
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    switch (item.type) {
      case 'nested':
        return [`${item.key}: ${showTree(item.children)}`];
      case 'added':
        return [`${currentIndent}+ ${item.key}: ${item.value}`];
      case 'deleted':
        return [`${currentIndent}- ${item.key}: ${item.value}`];
      case 'changed':
        return [[`${currentIndent}- ${item.key}: ${item.value}`], [`${currentIndent}+ ${item.key}: ${item.newValue}`]].join('\n');
      case 'unchanged':
        return [`${currentIndent}  ${item.key}: ${item.value}`];
      default:
        throw new Error('Error AST');
    }
  };
};

const stylish = (currentValue, depth) => {
  if (typeof currentValue !== 'object') {
    return currentValue;
  }
  const spacesCount = 1;
  const replacer = ' ';
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const lines = currentValue.map((line) => `${currentIndent} ${stylish(line, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stylish;
