import update from 'lodash/update';
import { JestDocReporterProps } from '../types/index';

export default function reporter({ testData, options }: JestDocReporterProps): string {
	const { title = 'Docs', logo, sort = 'none', filterRegex } = options;
	const result: string[] = [];

	if (logo != null) {
		result.push(`${logo}\n`);
	}

	result.push(`# ${title}\n`);
	result.push('---\n');

	const suites: { [key: string]: string[] } = testData.testResults.reduce((acc, testResult) => {
		if (testResult.testResults.length === 0) {
			return acc;
		}
		testResult.testResults.forEach(test => {
			update(acc, test.ancestorTitles, value => (value ?? []).concat(`-   ${test.title}`));
		});

		return acc;
	}, {});

	const sortedEntries = (entries: string[]) => {
		if (sort === 'asc') {
			return entries.sort();
		}
		if (sort === 'desc') {
			return entries.sort().reverse();
		}
		return entries;
	};

	const filteredEntries = (entries: string[]) => {
		if (filterRegex == null) {
			return entries;
		}
		if (filterRegex instanceof RegExp) {
			return entries.filter(entry => !entry.match(filterRegex));
		}
		return entries.filter(entry => !entry.match(new RegExp(filterRegex)));
	};

	return result
		.concat(
			sortedEntries(filteredEntries(Object.keys(suites))).reduce<string[]>((acc, suite) => {
				acc.push(`## ${suite}\n`);
				return acc.concat(sortedEntries(filteredEntries(suites[suite]))).concat('');
			}, []),
		)
		.join('\n');
}
