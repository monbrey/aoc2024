
const calculateDFS = (equation: number[]) => {
	const target = equation.shift()!;
	const first = equation.shift()!;
	const stack: number[] = [first];

	do {
		const next = equation.shift()!;
		stack.push(...stack.map(x => x+next), ...stack.map(x => x*next));
	} while(equation.length);

	return stack.includes(target);

}

export const run = (input: string) => {
	const equations = input.split('\n').map(line => line.trim().split(/:? /).map(Number));

	return equations.reduce((acc, val) => acc += calculateDFS([...val]) ? val[0] : 0, 0);
}