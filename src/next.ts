import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const day = await readdir("inputs").then(dirs => dirs.length+1)

await mkdir(join("inputs", `day${day}`));
await mkdir(join("src", `day${day}`));

await writeFile(join("inputs", `day${day}`, "test.txt"), "");
await writeFile(join("inputs", `day${day}`, "data.txt"), "");

await writeFile(join("src", `day${day}`, "a.ts"), "export const run = (input: string) => {}");
await writeFile(join("src", `day${day}`, "b.ts"), "export const run = (input: string) => {}");