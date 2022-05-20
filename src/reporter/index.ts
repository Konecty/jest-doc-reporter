import { AggregatedResult, AssertionResult } from '@jest/test-result';
import filterEntries from '../lib/filterEntries';
import groupResults from '../lib/groupResults';
import sortEntries from '../lib/sortEntries';
import { JestDocReporterProps } from '../types/index';

export default function reporter({ testData, options }: JestDocReporterProps): string {
	const { title = 'Docs', logo, sort = 'none', filterRegex } = options;
	const result: string[] = [];

	if (logo != null) {
		result.push(`${logo}\n`);
	}

	result.push(`# ${title}\n`);

	const testResultGroup = groupResults(testData);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const buildResult = (group: any, title?: string, level = 0) => {
		if (title != null) {
			result.push(`${'#'.repeat(level + 1)} ${title}\n`);
		}
		if (group.testResults != null) {
			sortEntries(
				sort,
				filterEntries(
					filterRegex,
					(group.testResults as Array<AssertionResult>).map(({ title }) => title),
				),
			).forEach(title => {
				result.push(`-   ${title}`);
			});
			result.push('');
		}
		sortEntries(
			sort,
			filterEntries(
				filterRegex,
				Object.keys(group).filter(k => k !== 'testResults'),
			),
		).forEach(k => {
			buildResult(group[k] as AggregatedResult, k, level + 1);
		});
	};

	buildResult(testResultGroup);

	return result.join('\n');
}
