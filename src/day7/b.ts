let total = 0;

const calculate = (e: number[]) => {
	const target = e.shift()!;
	const stack = [e.shift()!];

	while(e.length) {
		const next = e.shift()!;

		const len = stack.length;
		for(let i = 0; i < len; i++) {
			const val = stack.shift()!;

			if(next + val === target || next * val === target || Number(`${val}${next}`) === target) {
				return target;
			}
			else stack.push(next+val, next*val, Number(`${val}${next}`));
		}
	}

	return 0;
}

export const run = (input: string) => {
	const equations = input.split('\n').map(line => line.trim().split(/:? /).map(Number));

	return equations.reduce((acc, val) => acc += calculate([...val]), 0);
}