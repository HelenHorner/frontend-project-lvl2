import yaml from 'js-yaml';

const startToParse = (file, fileType) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load((file));
    default:
      throw new Error('there is no this type of file to parse');
  }
};
export default startToParse;
