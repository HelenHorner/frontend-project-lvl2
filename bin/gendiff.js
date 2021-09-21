#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const gendiff = new Command();

gendiff
  .arguments('<format> <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((format, firstConfig, secondConfig) => {
    genDiff(format, firstConfig, secondConfig);
  })
  .option('-v, --version', 'output usage information')
  .option('-f, --format [type]', 'Output format', 'stylish', 'stylish')
  .parse(process.argv);
