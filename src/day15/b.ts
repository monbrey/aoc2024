export const run = (input: string) => {
	let [_warehouse, _movements] = input.split('\n\n');
	let warehouse = _warehouse.split('\n').map((row) => row.split(''));
	const movements = _movements.split('\n').join('').split('') as Array<keyof typeof dirs>;

	// Update the warehouse for part b
	warehouse = warehouse.map(row => row.map(cell => {
		switch(cell) {
			case '#': return '##';
			case 'O': return '[]';
			case '.': return '..';
			case '@': return '@.';
			default: return cell;
		}
	}));

	return warehouse.map(row => row.join('')).join('\n');

	let [x, y] = find(warehouse, '@');

	for(const m of movements) {
		[x,y] = move(warehouse, [x,y], m);
	}

	return warehouse.reduce((acc, row, y) => acc += row.reduce((acc, cell, x) => cell === 'O' ? acc += 100 * y + x: acc, 0), 0);
}

const dirs = {
	'^': [0, -1],
	'>': [1, 0],
	'<': [-1, 0],
	'v': [0, 1]
}

const find = (warehouse: string[][], target: string) => {
	for (let y = 0; y < warehouse.length; y++) {
		for (let x = 0; x < warehouse[y].length; x++) {
			if (warehouse[y][x] === target) {
				return [x, y];
			}
		}
	}

	throw new Error("Not found");
}

const move = (warehouse: string[][], [x, y]: number[], m: keyof typeof dirs) => {
	const [dx,dy] = dirs[m];

	switch(warehouse[y+dy][x+dx]) {
		case '.': 
			warehouse[y+dy][x+dx] = '@';
			warehouse[y][x] = '.';
			return [x+dx, y+dy];
		case 'O':
			// Find empty space in direction
			let [y2,x2] = [y+dy,x+dx];
			while(true) {
				if(warehouse[y2+dy][x2+dx] === '#') {
					//found a wall, no spaces
					return [x,y];
				} else if (warehouse[y2+dy][x2+dx] === 'O') {
					// found another box, keep looking for space
					[y2,x2] = [y2+dy,x2+dx];
				} else {
					// space found in front of boxes
					warehouse[y2+dy][x2+dx] = 'O';
					warehouse[y+dy][x+dx] = '@';
					warehouse[y][x] = '.';
					return [x+dx, y+dy];
				}
			}
		default:
			return [x,y];
	}
}