import { getInput } from './lib/input.mjs'

const input = getInput('day5');
// const input = getInput('day5_test');


(function part1() {
    const [freshRanges, ingredients] = input.trimEnd().split('\n\n')
        .map((s, i) =>
            i === 0 ?
                s.split('\n').map(r => r.split('-').map(v => v / 1)) :
                s.split('\n').map(v => v / 1)
        );

    const freshCount = ingredients.filter(i =>
        freshRanges.some(([rs, re]) => rs <= i && re >= i)
    ).length

    console.log('Part 1:', freshCount)
})();

(function part2() {
    const freshRanges = input.trimEnd().split('\n\n')[0]
        .split('\n').map(r => r.split('-').map(v => v / 1))

    // sort by starting id, then by ending id
    freshRanges.sort(([sa, ea], [sb, eb]) => sa !== sb ? sa - sb : ea - eb);

    // hack - because the range end gets overwritten as part of compressing the ranges below
    // keep a reference to the highest seen range end, so that it can be added back in upon
    // reaching the end of a block of concurrent ranges
    let biggestEnd = 0;

    // compress overlapping ranges to avoid double-counting IDs
    const compressedRanges = freshRanges
        .filter((r, i, arr) => (i === arr.length - 1) ? true : `${r}` !== `${arr[i + 1]}`) // remove duplicates
        .map(([s, e], i, arr) => {
            // if range is a single ID and exists as the end of the prev. or start or the next range it can be removed
            if (s === e && (s === arr[i - 1]?.[1] || e === arr[i + 1]?.[0])) return null;
            return [s, e]
        })
        .filter(r => r !== null)
        .map(([s, e], i, arr) => {
            biggestEnd = Math.max(biggestEnd, e)
            if (i === arr.length - 1) return [s, biggestEnd];

            // if the end overlaps with the start of the next, reduce the end to not overlap
            return e >= arr[i + 1][0] ? [s, arr[i + 1][0] - 1] : [s, biggestEnd]
        })
        .map(([s, e]) => s <= e ? [s, e] : null) // remove any where the end was reduced to be less than the start
        .filter(r => r !== null)
    const freshCount = compressedRanges.reduce((acc, [rs, re]) => acc + (re - rs + 1), 0)
    console.log('Part 2:', freshCount)
})();
