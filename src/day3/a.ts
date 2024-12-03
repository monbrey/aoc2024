export const run = (input: string) => {
	const re = /mul\((\d{1,3},\d{1,3})\)/g;
	const matches = input.matchAll(re);

	if (!matches) return 0;
	return [...matches].reduce((acc, match) => {
		const [a, b] = match[1].split(',');
		return acc += +a * +b;
	}, 0);
}