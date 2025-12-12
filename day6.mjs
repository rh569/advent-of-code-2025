import { getInput } from './lib/input.mjs'

const input = getInput('day6');
// const input = getInput('day6_test');


(function part1() {
    const maths = input.trimEnd().split('\n')
        .map(l =>
            l.replace(/\s+/g, ' ').trim().split(' ')
        )
    const [sums, operations] = [maths.slice(0, -1), maths[maths.length - 1]]
    const tSums = new Array(sums[0].length).fill(null)
        .map(
            (_, ci) => new Array(sums.length).fill(null)
                .map((__, ri) => sums[ri][ci] / 1)
        )
    const grandTotal = operations.map((op, i) => {
        const [accFn, init] = op === '+' ? [(acc, v) => acc + v, 0] : [(acc, v) => acc * v, 1]
        return tSums[i].reduce(accFn, init)
    }).reduce((acc, t) => acc + t)
    console.log('Part 1:', grandTotal)
})();

(function part2() {
    const a = input.trimEnd()

    // console.log('Part 2:', a)
})();
