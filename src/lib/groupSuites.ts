import { AggregatedResult, AssertionResult } from '@jest/test-result';
import kebabCase from 'lodash/kebabCase';
import sortEntries from './sortEntries';

export default function groupSuites(testResultGroup: object, filterRegex: string | RegExp | undefined, sort: string) {
	const testFilter = filterRegex instanceof RegExp ? filterRegex : new RegExp(filterRegex ?? '');

	const outputFiles: { [key: string]: string } = {};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const generateFiles = (groups: any, parent: string[] = []) => {
		Object.keys(groups).forEach(suite => {
			if (filterRegex != null && suite.match(testFilter)) {
				return;
			}
			const group = groups[suite];

			if (group != null && group.testResults != null) {
				const key = parent
					.concat(suite)
					.filter(k => k)
					.map(p => kebabCase(p || ''))
					.join('/');

				outputFiles[key] = [`# ${suite}\n`]
					.concat(
						sortEntries(
							sort,
							(group.testResults as Array<AssertionResult>)
								.filter(test => {
									if (filterRegex != null && test.title.match(testFilter)) {
										return false;
									}
									return true;
								})
								.map(test => `-   ${test.title}`),
						),
					)
					.join('\n');
			}

			Object.keys(group)
				.filter(k => k !== 'testResults')
				.forEach(k => {
					generateFiles({ [k]: group[k] as AggregatedResult }, parent.concat(suite));
				});
		}, {});
	};

	generateFiles(testResultGroup);
	return outputFiles;
}
