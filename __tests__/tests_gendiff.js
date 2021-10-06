/* eslint no-underscore-dangle: 0 */
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const expectValue = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expectValuePlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('gendiff json files', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectValue);
});

test('gendiff yaml files', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expectValue);
});

test('gendiff json files, plain', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toBe(expectValuePlain);
});

test('gendiff yml files, plain', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toBe(expectValuePlain);
});

const expectValueJson = '{"type":"root","children":[{"key":"common","value":null,"children":{"type":"root","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"deleted"},{"key":"setting3","value":true,"newValue":null,"type":"changed"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","value":null,"children":{"type":"root","children":[{"key":"doge","value":null,"children":{"type":"root","children":[{"key":"wow","value":"","newValue":"so much","type":"changed"}]},"type":"nested"},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}]},"type":"nested"}]},"type":"nested"},{"key":"group1","value":null,"children":{"type":"root","children":[{"key":"baz","value":"bas","newValue":"bars","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","value":{"key":"value"},"newValue":"str","type":"changed"}]},"type":"nested"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]}';

test('gendiff yml files, json', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toBe(expectValueJson);
});

test('gendiff json files, json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toBe(expectValueJson);
});
