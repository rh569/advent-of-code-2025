import { getInput } from './lib/input.mjs'

let isExample = false;
// isExample = true;

const input = getInput(isExample ? 'day8_test' : 'day8');

(function part1() {
    const nConnections = isExample ? 10 : 1000;
    const boxes = input.trimEnd().split('\n').map(
        l => l.split(',').map(n => n / 1)
    )

    const possibleEdges = []

    for (let i = 0; i < boxes.length - 1; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            possibleEdges.push({
                d: getLinearDistance(boxes[i], boxes[j]),
                b: [
                    { idx: i, pos: boxes[i] },
                    { idx: j, pos: boxes[j] }
                ]
            })
        }
    }

    possibleEdges.sort((a, b) => a.d - b.d)

    const circuits = []

    for (let k = 0; k < nConnections; k++) {
        const nextEdge = possibleEdges[k];
        let aCirc = null;
        let bCirc = null;

        for (const c of circuits) {
            if (c.has(nextEdge.b[0].idx)) {
                aCirc = c;
            }
            if (c.has(nextEdge.b[1].idx)) {
                bCirc = c;
            }
        }

        // neither box in any circuit, so new circuit
        if (aCirc === null && bCirc === null) {
            circuits.push(new Set(nextEdge.b.map(b => b.idx)))
        } else if (aCirc === null) {
            bCirc.add(nextEdge.b[0].idx)
        } else if (bCirc === null) {
            aCirc.add(nextEdge.b[1].idx)
        } else if (aCirc === bCirc) {
            continue;
        } else {
            for (const box of bCirc) {
                aCirc.add(box)
                bCirc.delete(box)
            }
        }
    }

    circuits.sort((a, b) => b.size - a.size)

    console.log('Part 1:', [0, 1, 2].map(i => circuits[i].size).reduce((acc, v) => acc * v, 1))
})();

(function part2() {
    const boxes = input.trimEnd().split('\n').map(
        l => l.split(',').map(n => n / 1)
    )

    const possibleEdges = []

    for (let i = 0; i < boxes.length - 1; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            possibleEdges.push({
                d: getLinearDistance(boxes[i], boxes[j]),
                b: [
                    { idx: i, pos: boxes[i] },
                    { idx: j, pos: boxes[j] }
                ]
            })
        }
    }

    possibleEdges.sort((a, b) => a.d - b.d)

    const circuits = []

    for (let k = 0; k < possibleEdges.length; k++) {
        const nextEdge = possibleEdges[k];
        let aCirc = null;
        let bCirc = null;

        for (const c of circuits) {
            if (c.has(nextEdge.b[0].idx)) {
                aCirc = c;
            }
            if (c.has(nextEdge.b[1].idx)) {
                bCirc = c;
            }
        }

        // neither box in any circuit, so new circuit
        if (aCirc === null && bCirc === null) {
            circuits.push(new Set(nextEdge.b.map(b => b.idx)))
        } else if (aCirc === null) {
            bCirc.add(nextEdge.b[0].idx)
        } else if (bCirc === null) {
            aCirc.add(nextEdge.b[1].idx)
        } else if (aCirc === bCirc) {
            continue;
        } else {
            for (const box of bCirc) {
                aCirc.add(box)
                bCirc.delete(box)
            }
        }

        for (const c of circuits) {
            if (c.size === boxes.length) {
                console.log('Part 2:', nextEdge.b[0].pos[0] * nextEdge.b[1].pos[0])
                return
            }
        }
    }
})();

function getLinearDistance(a, b) {
    return Math.sqrt(
        Math.pow(a[0] - b[0], 2) +
        Math.pow(a[1] - b[1], 2) +
        Math.pow(a[2] - b[2], 2),
    )
}
