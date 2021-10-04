import { promisify } from 'util';
import fs from 'fs-extra';
import { exec } from './exec';

export type Path = fs.PathLike;

export const readFile: (arg1: number | fs.PathLike) => Promise<Buffer> =
    promisify(fs.readFile);

export async function listDir(dir: Path): Promise<Path[]> {
    const command = `git ls-files ${dir}`;
    return exec(command).then(({ stdout }) => {
        const paths = stdout.split('\n');
        return paths.slice(0, paths.length - 1);
    });
}

export async function mapFile<T>(
    path: Path,
    callback: (buffer: Buffer) => T
): Promise<T> {
    return readFile(path).then((value) => {
        return callback(value);
    });
}

export async function writeFile(path: Path, data: string[]): Promise<void> {
    return fs.writeFile(path, data.join('\n'));
}
