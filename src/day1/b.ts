import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(".", "inputs", process.argv[2]), "utf-8");

const lists = input.split('\n').reduce<number[][]>((acc, val) => {
	const vals = val.split(/\s+/).map(Number);
	return [[...acc[0], vals[0]], [...acc[1], vals[1]]];
}, [[], []])

const counts = lists[1].reduce((acc, val) => {
	acc[val] = (acc[val] ?? 0) + 1;
	return acc;
}, {} as Record<number, number>);

const result = lists[0].reduce((acc, val) => acc += val * (counts[val] ?? 0), 0);

console.log(result);