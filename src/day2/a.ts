const checkAsc = (report: number[]) => report.every((v,i) => i == 0 || (report[i] < report[i-1] && report[i-1]-report[i] <= 3))
const checkDesc = (report: number[]) => report.every((v,i) => i == 0 || (report[i] > report[i-1] && report[i]-report[i-1] <= 3))

export const run = async (input: string) => {
	const reports = input.split('\n').map(l => l.trim().split(' ').map(v => +v));

	return reports.filter(r => checkAsc(r) || checkDesc(r)).length;
}