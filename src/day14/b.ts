export const run = (input: string) => {
	const robots = input.split('\n')
		.map((l) => l.split(' '))
		.map(([p, v]) => ([p.split('=')[1].split(',').map(Number), v.split('=')[1].split(',').map(Number)]));

	const maxX = 101, maxY = 103;

	// Determine midpoints
	const midX = Math.floor(maxX / 2);
	const midY = Math.floor(maxY / 2);

	let i = 1;

	while (true) {
		const end = [];

		for (const [[px, py], [vx, vy]] of robots) {
			const vx2 = vx * i;
			const vy2 = vy * i;

			const px2 = (px + vx2) % maxX >= 0 ? (px + vx2) % maxX : maxX + (px + vx2) % maxX;
			const py2 = (py + vy2) % maxY >= 0 ? (py + vy2) % maxY : maxY + (py + vy2) % maxY;

			end.push([px2, py2]);
		}

		const grid: ('.' | number)[][] = Array.from({ length: maxY }, () => Array.from({ length: maxX }, () => '.'));
		for (const [x, y] of end) {
			if (grid[y][x] === '.') {
				grid[y][x] = 1;
			} else grid[y][x]++;
		}
		console.log(grid.map((l) => l.join('')).join('\n'));

		i++;
	}
}