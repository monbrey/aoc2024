export const run = (input: string) => {
	const garden = input.split('\n').map((line) => line.trim().split(''));
	const dirs: [number,number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

	const visited = new Set<string>();

	const findPlotArea = (y: number, x: number, map: [number, number][]): [number,number][] => {
		visited.add(`${y},${x}`);

		return [...map, [y, x], ...dirs.reduce((acc, [dy, dx]) => {
			if(visited.has(`${y + dy},${x + dx}`)) return acc;
			if (garden[y + dy]?.[x + dx] !== garden[y][x]) return acc;

			return [...acc, ...findPlotArea(y + dy, x + dx, map)];
		}, [] as [number, number][])];
	}

	const calcPlotPerimeter = (plot: [number, number][]) => {
		return plot.reduce((acc, [y, x]) => {
			return acc += dirs.reduce((acc, [dy, dx]) => {
				if (garden[y + dy]?.[x + dx] !== garden[y][x]) {
					return acc + 1;
				}
				return acc;
			}, 0);
		}, 0)
	}

	const plots = [];
	for (let y = 0; y < garden.length; y++) {
		for (let x = 0; x < garden[y].length; x++) {
			if (!visited.has(`${y},${x}`)) {
				plots.push(findPlotArea(y, x, []));
			}
		}
	}

	return plots.reduce((acc, plot) => acc += plot.length * calcPlotPerimeter(plot), 0);
}