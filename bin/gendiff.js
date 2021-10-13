#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .arguments('<firstConfig> <secondConfig> [format]')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2, program.opts().format));
  })
  .parse(process.argv);
