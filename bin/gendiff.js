#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const gendiff = new Command();

gendiff
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => {
    genDiff(firstConfig, secondConfig);
  })
  .option('-v, --version', 'output usage information')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
