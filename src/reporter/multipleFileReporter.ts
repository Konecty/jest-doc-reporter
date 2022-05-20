import type { AggregatedResult } from '@jest/test-result';
import chalk from 'chalk';
import fs from 'fs';
import kebabCase from 'lodash/kebabCase';
import mkdirp from 'mkdirp';
import path from 'path';
import filterEntries from '../lib/filterEntries';
import groupResults from '../lib/groupResults';
import groupSuites from '../lib/groupSuites';
import sortEntries from '../lib/sortEntries';
import { IJestDocReporterConfigOptions } from '../types';

export default async function (aggregatedResults: AggregatedResult, options: IJestDocReporterConfigOptions): Promise<void> {
	if (aggregatedResults == null) {
		return;
	}

	const { title = 'Docs', logo, sort = 'none', filterRegex } = options;
	const currentPath = path.resolve();
	const outputPath = path.resolve(currentPath, options.outputPath ?? './');

	const testResultGroup = groupResults(aggregatedResults);

	const outputFiles = groupSuites(testResultGroup, filterRegex, sort);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function writeIndex(groups: any, parent: string[] = []) {
		const index = [];

		if (parent.length == 0) {
			if (logo != null) {
				index.push(`${logo}\n`);
			}
			index.push(`# ${title}\n`);
		} else {
			index.push(`# ${parent[parent.length - 1]}\n`);
		}

		sortEntries(sort, filterEntries(filterRegex, Object.keys(groups))).forEach(suite => {
			if (groups[suite].testResults == null) {
				index.push(`-   [${suite}](${kebabCase(suite)}/index.md)\n`);
				writeIndex(groups[suite], parent.concat(suite));
			} else {
				index.push(`-   [${suite}](${kebabCase(suite)}.md)\n`);
			}
		});

		const indexFile = path.resolve(outputPath, parent.map(kebabCase).join('/'), 'index.md');
		mkdirp.sync(path.dirname(indexFile));

		fs.writeFileSync(indexFile, index.join('\n'));
	}

	writeIndex(testResultGroup);

	Object.keys(outputFiles).forEach(key => {
		const outputFile = path.resolve(outputPath, `${key}.md`);
		const content = outputFiles[key];
		mkdirp.sync(path.dirname(outputFile));
		fs.writeFileSync(outputFile, content);
	});

	console.info(
		chalk.greenBright(
			`@konecty/jest-doc-reporter >> ${Object.keys(outputFiles).length + 1} Reports generated to (${outputPath})`,
		),
	);
}
