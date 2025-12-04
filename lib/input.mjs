import { readFileSync } from 'node:fs';

export function getInput(filename) {
    const fileURL = new URL(`../input/${filename}`, import.meta.url)
    return readFileSync(fileURL, 'utf-8')
}
