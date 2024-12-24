export const run = (input: string) => {


	const transformStone = (stone: string) => {
		if (stone === '0') {
			return '1';
		}

		if (stone.length % 2 == 0) {
			// two stones
			return [`${Number(stone.slice(0, stone.length / 2))}`, `${Number(stone.slice(stone.length / 2))}`];
		}

		return `${+stone * 2024}`;
	}

	let stones = input.split(' ');
	for(let i = 0; i < 25; i++) {
		stones = stones.map(transformStone).flat();
	}

	return stones.length;
}