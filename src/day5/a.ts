export const run = (input: string) => {
	const [_ordering, _updates] = input.split('\n\n');

	const ordering = _ordering.split('\n').map((line) => line.split('|').map(Number));
	const updates = _updates.split('\n').map((line) => line.split(',').map(Number));

	const correct = updates.filter((update) => {
		return update.every((u, i) => {
			const rules = ordering.filter(order => order[0] === u);
			if (update.slice(i + 1).every(x => rules.some(rule => rule[1] === x))) {
				return true;
			}
			return false;
		});
	})

	const sum = correct.reduce((acc, val) => acc += val[(val.length-1)/2], 0);
	return sum;
}