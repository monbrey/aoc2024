export const run = (input: string) => {
	const map = input.split('').map(Number);

	let id = 0;
	let index = 0;
	let disk = [];
	while (map.length) {
		const left = Number(map.shift());
		if (index % 2 == 0) {
			disk.push(...Array(left).fill(id++));
		} else disk.push(...Array(left).fill('.'));

		index++;
	}

	console.log(disk);

	let j = disk.length;
	for (let i = 0; i < disk.length; i++) {
		if (disk[i] == '.') {
			while (j-- > i) {
				if (disk[j] !== '.') {
					disk[i] = disk[j];
					disk[j] = '.';
					break;
				}
			}
		}
	}
	return disk.slice(0, disk.indexOf('.')).reduce((acc, val, i) => acc += val * i, 0)
}