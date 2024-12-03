const isEnabled = (toggles: RegExpExecArray[], match: RegExpExecArray) => {
	let enabled = true;
	for (const t of toggles) {
		if (t.index > match.index) break;
		enabled = t[0] === "do()";
	}

	return enabled;
}

export const run = (input: string) => {
	const toggles = [...input.matchAll(/don?'?t?\(\)/g)];
	const matches = [...input.matchAll(/mul\((\d{1,3},\d{1,3})\)/g)];

	if (!matches) return 0;
	return [...matches].reduce((acc, match) => {
		if (!isEnabled(toggles, match)) return acc;
		const [a, b] = match[1].split(',');
		return acc += +a * +b;
	}, 0);
}