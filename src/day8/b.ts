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

	for (let [name, set] of groups.entries()) {
		while (set.length) {
			const a = set.shift()!;

			for (const b of set) {
				// Distance
				const dy = a[0] - b[0];
				const dx = a[1] - b[1];

				let by = a[0];
				let bx = a[1];
				while(map[by]?.[bx]) {
					antinodes.add(`${by},${bx}`);
					by += dy;
					bx += dx;
				}

				// Nodes after
				let ay = b[0];
				let ax = b[1];
				while(map[ay]?.[ax]) {
					antinodes.add(`${ay},${ax}`);
					ay -= dy;
					ax -= dx;
				}
			}
		}
	}

	for(const node of antinodes.values()) {
		const [y, x] = node.split(',').map(Number);
		map[y][x] = '#';
	}

	console.log(map.map((line) => line.join('')).join('\n'));
	return antinodes.size;
}