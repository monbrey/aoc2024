export const run = (input: string) => {
	const grid = input.split("\n").map(row => row.split(""));
	let total = 0;

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (grid[y][x] === "X") {
				// Get strings in all 8 directions
				const left = grid[y].slice(x, x + 4).join('');
				const right = grid[y].slice(x - 3, x + 1).join('');
				const up = grid.map(row => row[x]).slice(y - 3, y + 1).join('');
				const down = grid.map(row => row[x]).slice(y, y + 4).join('');
				const topLeft = y < grid.length - 3 && x < grid[y].length - 3 ? `${grid[y][x]}${grid[y + 1][x + 1]}${grid[y + 2][x + 2]}${grid[y + 3][x + 3]}` : "";
				const topRight = y < grid.length - 3 && x >= 3 ? `${grid[y][x]}${grid[y + 1][x - 1]}${grid[y + 2][x - 2]}${grid[y + 3][x - 3]}` : "";
				const bottomLeft = y >= 3 && x < grid[y].length - 3 ? `${grid[y][x]}${grid[y - 1][x + 1]}${grid[y - 2][x + 2]}${grid[y - 3][x + 3]}` : "";
				const bottomRight = y >= 3 && x >= 3 ? `${grid[y][x]}${grid[y - 1][x - 1]}${grid[y - 2][x - 2]}${grid[y - 3][x - 3]}` : "";

				const strings = [left, right, up, down, topLeft, topRight, bottomLeft, bottomRight];
				console.log(strings);
				strings.push(...strings.map(str => str.split('').reverse().join('')))

				total += strings.filter(str => str === "XMAS").length;
			}
		}
	}

	return total;
}