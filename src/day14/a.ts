export const run = (input: string) => {
	const robots = input.split('\n')
		.map((l) => l.split(' '))
		.map(([p, v]) => ([p.split('=')[1].split(',').map(Number), v.split('=')[1].split(',').map(Number)]));

	const maxX = 101, maxY = 103;
	const iterations = 100;

	const end = [];

	// Project positions after 100 turns
	for (const [[px, py], [vx, vy]] of robots) {
		const vx2 = vx * iterations;
		const vy2 = vy * iterations;

		const px2 = (px + vx2) % maxX >= 0 ? (px + vx2) % maxX : maxX + (px + vx2) % maxX;
		const py2 = (py + vy2) % maxY >= 0 ? (py + vy2) % maxY : maxY + (py + vy2) % maxY;

		end.push([px2, py2]);
	}

	// Determine midpoints
	const midX = Math.floor(maxX / 2);
	const midY = Math.floor(maxY / 2);

	const quadrants: number[] = [0, 0, 0, 0];

	for (const [x, y] of end) {
		if (x < midX && y < midY) quadrants[0]++
		else if (x > midX && y < midY) quadrants[1]++;
		else if (x < midX && y > midY) quadrants[2]++;
		else if (x > midX && y > midY) quadrants[3]++;
	}

	// Just for debugging
	// const grid: ('.'|number)[][] = Array.from({length: maxY}, () => Array.from({length: maxX}, () => '.'));
	// for(const [x,y] of end) {
	// 	if(grid[y][x] === '.') {
	// 		grid[y][x] = 1;
	// 	} else grid[y][x]++;
	// }
	// console.log(grid.map((l) => l.join('')).join('\n'));

	return quadrants.reduce((acc, v) => acc * v, 1);


	// Just for debugging
	// const grid: ('.'|number)[][] = Array.from({length: maxY}, () => Array.from({length: maxX}, () => '.'));
	// for(const [x,y] of end) {
	// 	if(grid[y][x] === '.') {
	// 		grid[y][x] = 1;
	// 	} else grid[y][x]++;
	// }

	return end;
}	