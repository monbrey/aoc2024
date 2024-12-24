import { transform } from "../../node_modules/typescript/lib/typescript.js";

export const run = (input: string) => {
	const cache = new Map();

	const transformStone = (stone: string, i: number): number => {
		if (i === 0) return 1;

		const key = `${stone},${i}`;

		if(cache.has(key)) return cache.get(key);

		if (stone === '0') {
			const result = transformStone('1', i - 1)
			cache.set(key, result);
			return result;
		}

		if (stone.length % 2 === 0) {
			const l = stone.slice(0, stone.length / 2);
			const r = stone.slice(stone.length / 2);

			const lresult = transformStone(`${Number(l)}`, i - 1);
			const rresult = transformStone(`${Number(r)}`, i - 1);

			cache.set(key, lresult + rresult);
			return lresult + rresult;

		}

		const result = transformStone(`${+stone * 2024}`, i - 1);
		cache.set(key, result);
		return result;
	}

	const stones = input.split(' ');
	return stones.reduce((acc, val) => acc += transformStone(val, 75), 0);
}