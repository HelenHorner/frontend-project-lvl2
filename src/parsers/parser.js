import yaml from 'js-yaml';

const parse = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load((data));
    default:
      throw new Error('there is no this type of data to parse');
  }
};
export default parse;
