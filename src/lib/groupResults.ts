import { AggregatedResult } from '@jest/test-result';
import update from 'lodash/update';

export default function groupResults(aggregatedResults: AggregatedResult) {
	return aggregatedResults.testResults.reduce((acc, testResult) => {
		testResult.testResults.forEach(test => {
			update(acc, test.ancestorTitles.concat('testResults'), value => (value ?? []).concat(test));
		});

		return acc;
	}, {});
}
