import {randomUUID} from 'node:crypto';
import {mkdir, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {env} from './env.ts';

const documentDir = path.resolve(env.STORAGE_PATH, 'documents');

export const documentStorage = {
    path(name: string): string {
        return path.join(documentDir, name);
    },

    // Speichert einen als Data-URL übertragenen JPEG-Scan und liefert den Dateinamen.
    async store(dataUrl: string): Promise<string> {
        const name = `${randomUUID()}.jpg`;
        await mkdir(documentDir, {recursive: true});
        await writeFile(this.path(name), Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64'));

        return name;
    },

    async delete(name: string): Promise<void> {
        await rm(this.path(name), {force: true});
    },

    async clear(): Promise<void> {
        await rm(documentDir, {recursive: true, force: true});
    },
};
