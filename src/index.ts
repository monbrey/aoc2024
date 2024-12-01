import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";

const {
	values: { day, part, test }
} = parseArgs({
	options: {
		day: {
			type: "string",
			short: "d",
		},
		part: {
			type: "string",
			short: "p"
		},
		test: {
			type: "boolean",
			short: "t"
		}
	}
});

const data = await readFile(join("inputs", `day${day}`, `${test ? "test" : "data"}.txt`), "utf-8");

const { run } = await import(`./day${day}/${part}.js`);

console.log(await run(data));