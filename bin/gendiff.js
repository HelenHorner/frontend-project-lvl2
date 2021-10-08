#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();

program
  .arguments('<firstConfig> <secondConfig> [format]')
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output usage information')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2, program.opts().format));
  })
  .parse(process.argv);
