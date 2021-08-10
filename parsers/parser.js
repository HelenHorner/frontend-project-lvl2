import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const readFile = (filename) => fs.readFileSync(filename, 'utf8');
const startToParse = (filename) => {
  const fileType = path.extname(filename);
  switch (fileType) {
    case '.json':
      return JSON.parse(readFile(filename));
    case '.yaml':
      return yaml.load(filename);
    default:
      throw new Error('there is no this type of file to parse');
  }
};
export default startToParse;
