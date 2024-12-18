const findAntennaGroups = (map: string[][]) => {
	const antenna: Map<string, [number, number][]> = new Map();

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] !== '.') {
				const c = map[y][x];
				console.log(c);
				antenna.set(c, [...(antenna.get(c) ?? []), [y, x]]);
			}
		}
	}

	return antenna;
}

export const run = (input: string) => {
	const map = input.split('\n').map((line) => line.trim().split(''));
	const antinodes = new Set<string>();

	const groups = findAntennaGroups(map);

	for (const set of groups.values()) {
		while (set.length) {
			const a = set.shift()!;

			for (const b of set) {
				// Distance
				const dy = a[0] - b[0];
				const dx = a[1] - b[1];

				// Nodes before
				const by = a[0] + dy;
				const bx = a[1] + dx;

				// Nodes after
				const ay = b[0] - dy;
				const ax = b[1] - dx;

				if (map[by]?.[bx]) antinodes.add(`${by},${bx}`)
				if (map[ay]?.[ax]) antinodes.add(`${ay},${ax}`)
			}
		}
	}

	return antinodes.size;
}