import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const makeTheWay = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(makeTheWay(filename), 'utf8');
const startToParse = (filename) => {
  const fileType = path.extname(filename);
  switch (fileType) {
    case '.json':
      return JSON.parse(readFile(filename));
    case '.yml':
      return yaml.load(readFile(filename));
    default:
      throw new Error('there is no this type of file to parse');
  }
};
export default startToParse;
