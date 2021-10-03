#!/usr/bin/env node

import program from 'commander'

import { runTask } from './index'

const version = require('../package.json').version;
 
program
  .version(version)
  .option('-m', '--message', 'Message')
  .parse(process.argv);

runTask(program.message).then(() => console.debug('Task completed'));