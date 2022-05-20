import { AggregatedResult } from '@jest/test-result';
import { Config } from '@jest/types';

export type IJestDocReporterConfigOptions = {
	title?: string;
	logo?: string;
	outputPath?: string;
	sort?: JestDocReporterSortType;
	filterRegex?: string | RegExp;
	oneFilePerSuite?: boolean;
};

export interface JestDocReporterProps {
	testData: AggregatedResult;
	options: IJestDocReporterConfigOptions;
	jestConfig?: Config.GlobalConfig;
}

export interface IJestDocReporterConsole {
	filePath: string;
	logs: ConsoleBuffer;
}

export type JestDocReporterSortType = 'none' | 'asc' | 'desc';
