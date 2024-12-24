export const run = (input: string) => {
	const games = input.split('\n\n').map((game) => game.split('\n'));
	console.log(games);

	const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
	const gcdArr = (arr: number[], n: number): number => {
		let r = arr[0];
		for(let i = 1; i < n; i++) {
			r = gcd(arr[i], r);
			if(r == 1) return 1;
		}
		return r;
	}

	const solveGame = (game: string[]) => {
		// Prepare values
		const [, _AX, _AY] = /Button [AB]: X\+(\d+), Y\+(\d+)/g.exec(game[0])!;
		const [, _BX, _BY] = /Button [AB]: X\+(\d+), Y\+(\d+)/g.exec(game[1])!;
		const [, _PX, _PY] = /Prize: X=(\d+), Y=(\d+)/g.exec(game[2])!;
		const [AX, AY, BX, BY, PX, PY] = [_AX, _AY, _BX, _BY, +_PX, _PY].map(Number);

		// The only possible combinations of button pushes are where after pushing A x-times, the remainder is divisible by B
		// Number of pushes of A
		const pushes = [];

		for (let push = 0; push * AX < PX && push * AY < PY; push++) {
			// Calc remaining distance
			const [rX, rY] = [PX - AX * push, PY - AY * push];
			// Check if it could be covered by the B button
			if (rX % BX !== 0 || rY % BY !== 0) continue;
			// Check if it's the same amount of pushes for both distances
			if (rX / BX !== rY / BY) continue;

			// If it could be, store this number of A pushes
			pushes.push(push);
		}

		console.log(pushes);

		if (pushes.length === 0) return 0;
		const costs = pushes.map((push) => 3 * push + (PX - AX * push) / BX);
		return Math.min(...costs);
	};

	return games.reduce((acc, game) => acc += solveGame(game), 0);
}