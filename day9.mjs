import { getInput } from './lib/input.mjs'

let isExample = false;
// isExample = true;

const input = getInput(isExample ? 'day9_test' : 'day9');

(function part1() {
    const coords = input.trimEnd().split('\n').map(
        l => l.split(',').map(n => n / 1)
    )

    const possibleRects = []

    for (let i = 0; i < coords.length - 1; i++) {
        for (let j = i + 1; j < coords.length; j++) {
            possibleRects.push(
                getRectSize(coords[i], coords[j])
            )
        }
    }

    possibleRects.sort((a, b) => b - a)

    console.log('Part 1:', possibleRects[0])
})();

(function part2() {
    const coords = input.trimEnd().split('\n').map(
        l => l.split(',').map(n => n / 1)
    )

    // console.log('Part 2:', coords)
})();

function getRectSize([x1, y1], [x2, y2]) {
    return (Math.max(x1, x2) - Math.min(x1, x2) + 1)
        * (Math.max(y1, y2) - Math.min(y1, y2) + 1)
}
