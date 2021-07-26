#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';

const gendiff = new Command();

gendiff
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output usage information')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
