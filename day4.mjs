import { getInput } from './lib/input.mjs'

const input = getInput('day4');
// const input = getInput('day4_test');

const offSets = [
    { r: -1, c: -1 },
    { r: -1, c: 0 },
    { r: -1, c: 1 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
    { r: 1, c: -1 },
    { r: 1, c: 0 },
    { r: 1, c: 1 }
];

(function part1() {
    const diagram = input.trimEnd().split('\n').map(r => r.split(''))
    let neighbourCounts = diagram.map((row, ri, d) =>
        row.map((val, ci) =>
            val === '.' ? -1 :
                offSets
                    .map(({ r, c }) => ({ r: ri + r, c: ci + c }))
                    .filter(({ r, c }) => r >= 0 && c >= 0 && r < d.length && c < row.length)
                    .map(({ r, c }) => d[r][c] === '@' ? 1 : 0)
                    .reduce((acc, v) => acc + v)
        )
    )
    let accessibleRolls = neighbourCounts.flat()
        .filter(c => c > -1 && c < 4);
    console.log('Part 1:', accessibleRolls.length)
})();

(function part2() {
    let diagram = input.trimEnd().split('\n').map(r => r.split(''))
    let removals = []

    while (removals.length === 0 || removals[removals.length - 1] !== 0) {
        let removedCount = 0;
        diagram = diagram.map((row, ri, d) =>
            row.map((val, ci) =>
                val === '.' ? -1 :
                    offSets
                        .map(({ r, c }) => ({ r: ri + r, c: ci + c }))
                        .filter(({ r, c }) => r >= 0 && c >= 0 && r < d.length && c < row.length)
                        .map(({ r, c }) => d[r][c] === '@' ? 1 : 0)
                        .reduce((acc, v) => acc + v)
            )
        ).map((row) =>
            row.map((val) => {
                if (val < 0) return '.';
                if (val < 4) { removedCount++; return '.' };
                return '@';
            })
        )
        removals.push(removedCount)
    }

    console.log('Part 2:', removals.reduce((a, v) => a + v))
})();
