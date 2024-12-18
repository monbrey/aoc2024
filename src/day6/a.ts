export const run = (input: string) => {
	// Split the map
	const map = input.split('\n').map((line) => line.split(''));
	// Find the start point
	let y = 0, x = 0;
	for (y = 0; y < map.length; y++) {
		for (x = 0; x < map[y].length; x++) {
			if (map[y][x] == '^') break;
		}
		if (map[y][x] == '^') break;
	}

	// Define the directions, starting with up, proceeding with right turns
	const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	let dir = 0;

	while (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
		// Check the next position
		const dy = y + dirs[dir][0];
		const dx = x + dirs[dir][1];
		const next = map[dy]?.[dx];

		if (!next) {
			// Leaving, mark the current position
			map[y][x] = 'X';
			// and leave the map
			break;
		}

		if (next == '.' || next == 'X') {
			// We're unobstructed, mark the current position
			map[y][x] = 'X';

			// and move forward
			y = dy;
			x = dx;
		}
		else if (next == '#') {
			// obstructed, turn right
			dir = (dir + 1) % 4;
		}
	}

	return map.reduce((acc, row) => acc += row.filter(t => t == 'X').length, 0);
}