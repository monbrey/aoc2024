const testUnsafePermutations = (report: number[]) => {
	for(let i = 0; i < report.length; i++) {
		const testReport = [...report]
		testReport.splice(i, 1);
		if(checkSafe(testReport)) return true;
	}

	return false;
}

const checkSafe = (report: number[]) => report.every((v, i) => i == 0 || (report[i] < report[i - 1] && report[i - 1] - report[i] <= 3)) || report.every((v, i) => i == 0 || (report[i] > report[i - 1] && report[i] - report[i - 1] <= 3))

export const run = async (input: string) => {
	const reports = input.split('\n').map(l => l.trim().split(' ').map(v => +v));

	return reports.filter(r => checkSafe(r) || testUnsafePermutations(r)).length;
}