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
    const lines = input.split('\n').map(l => l.split(''))
    lines.pop() // not using trimEnd because the whitespace is significant. This gets rid of the empty element.

    let sums = []
    let sum = []

    // step through each character from RTL
    for (let j = lines[0].length - 1; j >= 0; j--) {
        let num = ''
        for (let i = 0; i < lines.length; i++) {
            const c = lines[i][j];

            if (i < lines.length - 1) {
                num += c
                continue
            }

            // end of number
            sum.push(num / 1)
            num = ''

            // end of sum
            if (c === '+' || c === '*') {
                sum.push(c)
                sums.push(sum)
                sum = []
                if (j > 1) j--;
            }
        }
    }

    const grandTotal = sums
        .map((sum) => {
            const [nums, op] = [sum.slice(0, -1), sum[sum.length - 1]]
            const [accFn, init] = op === '+' ? [(acc, v) => acc + v, 0] : [(acc, v) => acc * v, 1]
            return nums.reduce(accFn, init)
        })
        .reduce((a, v) => a + v)

    console.log('Part 2:', grandTotal)
})();
