export const run = (input: string) => {
	const grid = input.split("\n").map(row => row.trim().split(""));
	let total = 0;

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (grid[y][x] === "A") {
				if (x !== 0 && y !== 0 && y !== grid.length - 1 && x !== grid[y].length - 1) {
					if(
						((grid[y-1][x-1] === "M" && grid[y+1][x+1] == "S") && (grid[y-1][x+1] === "M" && grid[y+1][x-1] == "S")) ||
						((grid[y-1][x-1] === "M" && grid[y+1][x+1] == "S") && (grid[y-1][x+1] === "S" && grid[y+1][x-1] == "M")) ||
						((grid[y-1][x-1] === "S" && grid[y+1][x+1] == "M") && (grid[y-1][x+1] === "M" && grid[y+1][x-1] == "S")) ||
						((grid[y-1][x-1] === "S" && grid[y+1][x+1] == "M") && (grid[y-1][x+1] === "S" && grid[y+1][x-1] == "M"))
					)
					total += 1;
				}
			}
		}
	}
	return total;
}