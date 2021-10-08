import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatTree = (diff, format) => {
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

export default formatTree;
