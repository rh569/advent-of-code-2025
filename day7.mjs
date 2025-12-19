import { getInput } from './lib/input.mjs'

const input = getInput('day7');
// const input = getInput('day7_test');


(function part1() {
    const manifold = input.trimEnd().split('\n').map(
        l => l.split('')
    )

    let totalSplits = [];
    let splits = new Set();
    let currentActives = new Set([manifold[0].indexOf('S')]);

    for (let i = 2; i < manifold.length; i += 2) {
        for (let j = 0; j < manifold[0].length; j++) {
            if (manifold[i][j] === '.') continue;

            if (currentActives.has(j)) {
                splits.add(j);
            }
        }

        totalSplits = [...totalSplits, ...splits];
        currentActives = currentActives.difference(splits);
        for (const s of splits) {
            currentActives.add(s - 1);
            currentActives.add(s + 1);
        }
        splits.clear();
    }

    console.log('Part 1:', totalSplits.length)
})();

(function part2() {
    const manifold = input.trimEnd().split('\n').map(
        l => l.split('')
    )

    const width = manifold[0].length;

    const allSplits = new Array(width).fill(0);
    const splits = new Array(width).fill(0);;
    const currentActives = new Array(width).fill(0);
    currentActives[manifold[0].indexOf('S')] = 1;

    for (let i = 2; i < manifold.length; i += 2) {
        for (let j = 0; j < manifold[0].length; j++) {
            if (manifold[i][j] === '.') continue;

            if (currentActives[j]) {
                splits[j] += currentActives[j];
            }
        }

        for (const [k, v] of splits.entries()) {
            if (v === 0) continue;

            allSplits[k] += v;
            currentActives[k + 1] += v;
            currentActives[k - 1] += v;
            currentActives[k] = 0;
            splits[k] = 0;
        }
    }

    console.log('Part 2:', allSplits.reduce((acc, v) => acc + v) + 1)
})();
