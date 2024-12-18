export const run = (input: string) => {
	const [_ordering, _updates] = input.split('\n\n');

	const ordering = _ordering.split('\n').map((line) => line.split('|').map(Number));
	const updates = _updates.split('\n').map((line) => line.split(',').map(Number));

	const incorrect = updates.filter((update) => {
		return !update.every((u, i) => {
			const rules = ordering.filter(order => order[0] === u);
			if (update.slice(i + 1).every(x => rules.some(rule => rule[1] === x))) {
				return true;
			}
			return false;
		});
	})

	const corrected = incorrect.map((update) => {
		const correct: number[] = [];
		for(const u of update) {
			let insert = 0;
			for(let c = 0; c < correct.length; c++) {
				const rule = ordering.find(order => order[0] === correct[c] && order[1] === u)
				if(rule) insert = c+1;
			}
			correct.splice(insert, 0, u);
		}
		return correct;
	});

	const sum = corrected.reduce((acc, val) => acc += val[(val.length-1)/2], 0);
	return sum;
}