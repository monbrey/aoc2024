const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const visited = new Set<string>();
let obstacles = 0;

const testPath = (map: string[][], y: number, x: number, dir: number) => {
	console.log("Testing",y,x,dir);
	const testVisited = new Set<string>(visited);
	while (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
		// Check the next position
		const dy = y + dirs[dir][0];
		const dx = x + dirs[dir][1];
		const next = map[dy]?.[dx];

		if (!next) {
			// Leaving, this doesnt loop
			return false;
		} else if (next == '#') {
			// obstructed, turn right
			testVisited.add(`${y},${x},${dir}`);
			dir = (dir + 1) % 4;
		} else {
			// Would this next tile put us back on the path?
			if(testVisited.has(`${dy},${dx},${dir}`)) return true;
			// If not, add and continue
			testVisited.add(`${y},${x},${dir}`);

			// and move forward
			y = dy;
			x = dx;
		}
	}
}

export const run = (input: string) => {
	// Split the map
	const map = input.split('\n').map((line) => line.trim().split(''));
	// Find the start point
	let y = 0, x = 0;
	for (y = 0; y < map.length; y++) {
		for (x = 0; x < map[y].length; x++) {
			if (map[y][x] == '^') break;
		}
		if (map[y][x] == '^') break;
	}

	const sy = y;
	const sx = x;

	// Define the directions, starting with up, proceeding with right turns
	let dir = 0;

	while (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
		// Check the next position
		const dy = y + dirs[dir][0];
		const dx = x + dirs[dir][1];
		const next = map[dy]?.[dx];

		if (!next) {
			// Leaving
			return obstacles;
		} else if (next == '#') {
			// obstructed, turn right
			dir = (dir + 1) % 4;
		} else {
			// We're unobstructed
			// Test what would happen if we were obstructed
			const test_map = [...map.map(row => [...row])];
			test_map[dy][dx] = '#';
			obstacles += testPath(test_map, y, x, (dir + 1) % 4) ? 1 : 0;
			
			// save the position and direction
			visited.add(`${y},${x},${dir}`);

			// and move forward
			y = dy;
			x = dx;
		}
	}

	return obstacles;
}