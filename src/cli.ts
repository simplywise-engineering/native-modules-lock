#!/usr/bin/env node

import program from 'commander';
import { checkLockfile, writeLockfile } from './index';

const { name, version } = require('../package.json');

program.name(name).version(version);

program
    .command('check')
    .description('check the current state of the lockfile')
    .option(
        '-f, --lockfile <file>',
        'path to the lockfile',
        'native-modules.lock'
    )
    .action((options) => {
        checkLockfile(options.lockfile)
            .then((value) => {
                console.log(
                    `Verified ${options.lockfile} lock state: ${value}`
                );
                process.exit(0);
            })
            .catch((reason) => {
                console.error(
                    `Failed to verify ${options.lockfile} lock state: ${reason}`
                );
                process.exit(1);
            });
    });

program
    .command('write-locks')
    .description('regenerate the lockfile')
    .option(
        '-f, --lockfile <file>',
        'path to the lockfile',
        'native-modules.lock'
    )
    .action((options) => {
        writeLockfile(options.lockfile)
            .then(() => {
                console.log(
                    `Successfully wrote lockfile to ${options.lockfile}`
                );
                process.exit(0);
            })
            .catch((reason) => {
                console.error(
                    `Failed to write lockfile to ${options.lockfile}: ${reason}`
                );
                process.exit(1);
            });
    });

program.parse(process.argv);
