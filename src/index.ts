import { BaseReporter } from '@jest/reporters';
import type { AggregatedResult } from '@jest/test-result';
import { Config } from '@jest/types';
import multipleFileReporter from './reporter/multipleFileReporter';
import singleFileReporter from './reporter/singleFileReporter';
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
		if (this._options?.oneFilePerSuite === true) {
			return multipleFileReporter(_aggregatedResults, this._options);
		}
		singleFileReporter(_aggregatedResults, this._options);
	}
}

export default JestDocReporter;
