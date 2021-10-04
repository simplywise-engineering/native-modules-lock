import { path as appRootPath } from 'app-root-path';
import md5 from 'md5';
import { computeDigest } from './util/digest';
import { readFile, writeFile } from './util/fs';

const DEFAULT_LOCKFILE_NAME = 'native-modules.lock';

export async function computeLocks() {
    const ios = await computeDigest(`${appRootPath}/ios`);
    const android = await computeDigest(`${appRootPath}/android`);
    return [...ios, ...android];
}

export async function writeLockfile(lockFileName?: string) {
    const lockFile = lockFileName || DEFAULT_LOCKFILE_NAME;
    const lockPath = `${appRootPath}/${lockFile}`;

    const contents = await computeLocks();
    return writeFile(lockPath, contents);
}

export async function checkLockfile(lockFileName?: string) {
    const lockFile = lockFileName || DEFAULT_LOCKFILE_NAME;
    const lockPath = `${appRootPath}/${lockFile}`;

    const repoDigest = await computeLocks().then((contents) =>
        md5(contents.join('\n'))
    );
    const lockFileDigest = await readFile(lockPath).then((buffer) =>
        md5(buffer)
    );

    if (repoDigest !== lockFileDigest) {
        throw new Error(
            `${lockFile} is not synchronized: repo state is ${repoDigest} while lockfile state is ${lockFileDigest}`
        );
    }
    return lockFileDigest;
}
