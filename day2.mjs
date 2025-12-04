import { getInput } from './lib/input.mjs'

const input = getInput('day2');
// const input = getInput('day2_test');

(function part1() {
    const sumOfBadIds = input
        .split('\n')[0]                     // first line only
        .split(',')                         // comma delimited ranges
        .map(s => s.split('-'))             // split start and end values
        .map(([s, e]) => [s / 1, e / 1])    // coerce to numbers
        .map(([s, e]) => {
            let badIds = [];
            for (let i = s; i <= e; i++) {
                let v = '' + i;                                                         // coerce back to string
                if (v.length % 2 !== 0) continue;                                       // only even length strings can have a section repeated exactly once
                if (v.slice(0, v.length / 2) === v.slice(v.length / 2)) badIds.push(i); // compare the front and back halves of the string
            }
            return badIds
        })
        .flat()
        .reduce((arr, id) => arr + id)

    console.log('Part 1:', sumOfBadIds)
})();

(function part2() {
    const sumOfBadIds = input
        .split('\n')[0]                     // first line only
        .split(',')                         // comma delimited ranges
        .map(s => s.split('-'))             // split start and end values
        .map(([s, e]) => [s / 1, e / 1])    // coerce to numbers
        .map(([s, e]) => {
            let badIds = [];
            for (let i = s; i <= e; i++) {
                let id = '' + i;
                for (let j = 2; j <= id.length; j++) {               // j is number of id sections
                    if (id.length % j !== 0) continue;               // check id length is divisible by j
                    const partLen = id.length / j
                    const isBad = new Array(j).fill('')
                        .map((_, idx) => id.slice(idx * partLen, (idx * partLen) + partLen))    // slice id into parts array
                        .every((part, _, arr) => part === arr[0])                               // check all match
                    if (isBad) {
                        badIds.push(i);
                        break;   // don't double count ids that can be bad serval ways, e.g. 222222
                    }
                }
            }
            return badIds
        })
        .flat()
        .reduce((arr, id) => arr + id)

    console.log('Part 2:', sumOfBadIds)
})();
