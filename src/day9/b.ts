export const run = (input: string) => {
	const map = input.split('').map(Number);

	let id = 0;
	let index = 0;
	let disk: { type: 'file'|'free', length: number, id?: number }[] = [];
	while (map.length) {
		const left = Number(map.shift());
		if (left === 0) {
			index++;
			continue;
		}
		if (index % 2 == 0) {
			disk.push({ type: 'file', id: id++, length: left });
		} else disk.push({ type: 'free', length: left });

		index++;
	}

	for (let r = disk.length - 1; r >= 0; r--) {
		// Dont move free space blocks
		if (disk[r].type === 'free') continue;

		// Find a suitable space
		const space = disk.findIndex(s => s.type === 'free' && s.length >= disk[r].length);
		if (space === -1) {
			continue;
		}

		if (space > r) {
			continue;
		}

		// Straight swap if the size is the same
		if (disk[space].length === disk[r].length) {
			[disk[space], disk[r]] = [disk[r], disk[space]];
		}
		// Otherwise we need to split it, and adjust our index
		else {
			// clone it
			const temp = { ...disk[r] };
			disk[r] = { type: 'free', length: disk[r].length };
			disk.splice(space, 1, temp, { type: 'free', length: disk[space].length - disk[r].length });
			// roll back the index by 1 to account for the new item
			r++;
		}
	}

	// Reprocess the disk array into the same format as the original
	const reformat = [];
	for(let i = 0; i < disk.length; i++) {
		reformat.push(...Array(disk[i].length).fill(disk[i].type === 'file' ? disk[i].id : '.'));
	}

	return reformat.reduce((acc, val, i) => acc += (val === '.' ? 0 : +val * i), 0)
}