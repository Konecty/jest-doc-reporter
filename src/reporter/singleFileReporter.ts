import type { AggregatedResult } from '@jest/test-result';
import chalk from 'chalk';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { IJestDocReporterConfigOptions } from '../types';
import reporter from './index';

export default async function (aggregatedResults: AggregatedResult, options: IJestDocReporterConfigOptions): Promise<void> {
	if (aggregatedResults == null) {
		return;
	}
	const result = reporter({
		testData: aggregatedResults,
		options: options,
	});
	const currentPath = path.resolve();

	const outputPath = path.resolve(currentPath, options.outputPath ?? './');

	mkdirp.sync(outputPath);

	const outputFile = path.resolve(outputPath, 'index.md');
	fs.writeFileSync(outputFile, result);

	console.info(chalk.greenBright(`@konecty/jest-doc-reporter >> Report generated (${outputFile})`));
}
