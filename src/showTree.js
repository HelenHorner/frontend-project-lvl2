import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';

const showTree = (format, diff) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error('there is no this type of format');
  }
};

export default showTree;
