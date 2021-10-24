import process from 'process';
import test, { ExecutionContext } from 'ava';
import { path as appRootPath } from 'app-root-path';
import { exec } from './util/exec';
const TEST_ROOT = `${appRootPath}/integration-tests`;

const assertCheck = async (t: ExecutionContext<unknown>) => {
    try {
        const { stdout, stderr } = await exec('npx native-modules-lock check');
        if (stderr != '') {
            t.fail(stderr);
        } else {
            t.pass(stdout);
        }
    } catch {
        t.pass();
    }
};

test.before(async () => {
    process.chdir(appRootPath);
});

test.after(async () => {
    process.chdir(appRootPath);
    exec('./integration-tests/cleanup_all.sh');
});

test.serial('can detect android file change', async (t) => {
    const testDir = `${TEST_ROOT}/android-bump`;
    console.log(`Setting workdir to ${testDir}`);
    process.chdir(testDir);

    await exec('./runTest.sh');
    await assertCheck(t);
});

test.serial('can detect ios file change', async (t) => {
    const testDir = `${TEST_ROOT}/ios-bump`;
    console.log(`Setting workdir to ${testDir}`);
    process.chdir(testDir);

    await exec('./runTest.sh');
    await assertCheck(t);
});

test.serial('can detect unchanged state', async (t) => {
    const testDir = `${TEST_ROOT}/unchanged-lock`;
    console.log(`Setting workdir to ${testDir}`);
    process.chdir(testDir);

    await exec('./runTest.sh');
    await assertCheck(t);
});
