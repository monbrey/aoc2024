import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile(join(".", "inputs", process.argv[2]), "utf-8");

const lists = input.split('\n').reduce<number[][]>((acc, val) => {
	const vals = val.split(/\s+/).map(Number);
	return [[...acc[0], vals[0]], [...acc[1], vals[1]]];
}, [[], []])

lists[0].sort();
lists[1].sort();

const result = lists[0].reduce((acc, val, i) => acc += Math.abs(lists[1][i] - val), 0);

console.log(result);