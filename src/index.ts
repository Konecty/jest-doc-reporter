import { BaseReporter } from '@jest/reporters';
import type { AggregatedResult } from '@jest/test-result';
import { Config } from '@jest/types';
import chalk from 'chalk';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import reporter from './reporter';
import { IJestDocReporterConfigOptions } from './types';

/**
 * The test runner function passed to Jest
 */
class JestDocReporter extends BaseReporter {
	private _globalConfig: Config.GlobalConfig | AggregatedResult;
	private _options: IJestDocReporterConfigOptions;

	constructor(globalConfig: Config.GlobalConfig | AggregatedResult, options: IJestDocReporterConfigOptions) {
		super();
		this._globalConfig = globalConfig;
		this._options = options;
	}

	onRunComplete(_: unknown, _aggregatedResults?: AggregatedResult): Promise<void> | void {
		if (_aggregatedResults == null) {
			return;
		}
		const result = reporter({
			testData: _aggregatedResults,
			options: this._options,
		});
		const currentPath = path.resolve();

		const outputPath = path.resolve(currentPath, this._options.outputPath ?? './');

		mkdirp.sync(outputPath);

		const outputFile = path.resolve(outputPath, 'index.md');
		fs.writeFileSync(outputFile, result);

		console.info(chalk.greenBright(`@konecty/jest-doc-reporter >> Report generated (${outputFile})`));
	}
}

export default JestDocReporter;
