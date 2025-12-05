import { getInput } from './lib/input.mjs'

const input = getInput('day3');
// const input = getInput('day3_test');

(function part1() {
    const joltage = input.trimEnd()
        .split('\n').map(v => v.split('')
            .map(v => v / 1)
        ).map(b => ({ b, m1: Math.max(...b.slice(0, -1)) }))                    // { bank, non-last max }
        .map(({ b, m1 }) => ({ b, m1, m1i: b.indexOf(m1) }))                    // { bank, non-last max, non-last max idx }
        .map(({ b, m1, m1i }) => { b.splice(0, m1i + 1); return { b, m1 } })    // { reduced bank, non-last max, non-last max idx }
        .map(({ b, m1 }) => `${m1}${Math.max(...b)}` / 1)
        .reduce((a, j) => a + j)

    console.log('Part 1:', joltage)
})();

(function part2() {
    const bankSize = 12
    const joltage = input.trimEnd()
        .split('\n').map(v => v.split('')
            .map(v => v / 1)
        ).map(b => {
            let leftIndex = 0
            return new Array(bankSize).fill(null).map((_, i) => {
                const rightIndex = (bankSize - i - 1)
                const maxB = Math.max(...(rightIndex > 0 ? b.slice(leftIndex, -rightIndex) : b.slice(leftIndex)))
                leftIndex = b.indexOf(maxB, leftIndex) + 1
                return maxB
            }).join('') / 1
        })
        .reduce((a, j) => a + j)

    console.log('Part 1:', joltage)
})();
