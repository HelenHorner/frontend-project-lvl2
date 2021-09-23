#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();

program
  .arguments('<firstConfig> <secondConfig> [format]')
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output usage information')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .action((firstConfig, secondConfig) => {
    genDiff(firstConfig, secondConfig, program.opts().format);
  })
  .parse(process.argv);
