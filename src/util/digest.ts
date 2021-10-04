import md5 from 'md5';
import * as fs from './fs';

export async function computeDigest(dir: fs.Path): Promise<string[]> {
    return fs.listDir(dir).then((paths) => {
        const digests = paths.map((path) =>
            fs.mapFile(path, (buffer) => {
                return `${path} => ${md5(buffer)}`;
            })
        );
        return Promise.all(digests);
    });
}
