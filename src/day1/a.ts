export const run = (input: string) => {
	const lists = input.split('\n').reduce<number[][]>((acc, val) => {
		const vals = val.split(/\s+/).map(Number);
		return [[...acc[0], vals[0]], [...acc[1], vals[1]]];
	}, [[], []])

	lists[0].sort();
	lists[1].sort();

	return lists[0].reduce((acc, val, i) => acc += Math.abs(lists[1][i] - val), 0);
}