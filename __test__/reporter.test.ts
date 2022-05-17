import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import reporter from '../src/reporter';
import { IJestDocReporterConfigOptions } from '../src/types';
import { mockedJestGlobalConfig } from './fixtures/jest-config';
import { mockedJestResponseMultipleTestResult, mockedJestResponseSingleTestResult } from './fixtures/jest-results';

describe('Render docs from jest output', () => {
	it('Render single result with full options', () => {
		// Arrange

		const testData = mockedJestResponseSingleTestResult;
		const expectedOutput = fs.readFileSync(path.resolve(__dirname, 'fixtures/single-test-result.md'), 'utf8');
		const options: IJestDocReporterConfigOptions = {
			title: 'Jest Doc Reporter',
			logo: '![Tux, the Linux mascot](/assets/images/tux.png)',
			outputPath: '/dev/null',
			sort: 'none',
		};
		// Act
		const output = reporter({
			testData,
			options,
			jestConfig: mockedJestGlobalConfig,
		});

		// Assert
		expect(output).to.be.equals(expectedOutput);
	});

	it('Render multiple test result with full options', () => {
		// Arrange

		const testData = mockedJestResponseMultipleTestResult;
		const expectedOutput = fs.readFileSync(path.resolve(__dirname, 'fixtures/multiple-test-result.md'), 'utf8');
		const options: IJestDocReporterConfigOptions = {
			title: 'Jest Doc Reporter',
			logo: '![Tux, the Linux mascot](/assets/images/tux.png)',
			outputPath: '/dev/null',
			sort: 'none',
		};
		// Act
		const output = reporter({
			testData,
			options,
			jestConfig: mockedJestGlobalConfig,
		});

		// Assert
		expect(output).to.be.equals(expectedOutput);
	});

	it('Render multiple test result with sort asc', () => {
		// Arrange

		const testData = mockedJestResponseMultipleTestResult;
		const expectedOutput = fs.readFileSync(path.resolve(__dirname, 'fixtures/multiple-test-result-sorted.md'), 'utf8');
		const options: IJestDocReporterConfigOptions = {
			title: 'Jest Doc Reporter',
			logo: '![Tux, the Linux mascot](/assets/images/tux.png)',
			outputPath: '/dev/null',
			sort: 'asc',
		};
		// Act
		const output = reporter({
			testData,
			options,
			jestConfig: mockedJestGlobalConfig,
		});

		// Assert
		expect(output).to.be.equals(expectedOutput);
	});

	it('Render multiple test result with sort desc', () => {
		// Arrange

		const testData = mockedJestResponseMultipleTestResult;
		const expectedOutput = fs.readFileSync(path.resolve(__dirname, 'fixtures/multiple-test-result-sorted-desc.md'), 'utf8');
		const options: IJestDocReporterConfigOptions = {
			title: 'Jest Doc Reporter',
			logo: '![Tux, the Linux mascot](/assets/images/tux.png)',
			outputPath: '/dev/null',
			sort: 'desc',
		};
		// Act
		const output = reporter({
			testData,
			options,
			jestConfig: mockedJestGlobalConfig,
		});

		// Assert
		expect(output).to.be.equals(expectedOutput);
	});

	it('Render multiple test result with filter string for suite 3', () => {
		// Arrange

		const testData = mockedJestResponseMultipleTestResult;
		const expectedOutput = fs.readFileSync(path.resolve(__dirname, 'fixtures/multiple-test-result-filtered.md'), 'utf8');
		const options: IJestDocReporterConfigOptions = {
			title: 'Jest Doc Reporter',
			logo: '![Tux, the Linux mascot](/assets/images/tux.png)',
			outputPath: '/dev/null',
			sort: 'none',
			filterRegex: '^Suite name 3$',
		};
		// Act
		const output = reporter({
			testData,
			options,
			jestConfig: mockedJestGlobalConfig,
		});

		// Assert
		expect(output).to.be.equals(expectedOutput);
	});

	it('Render multiple test result with filter RegExp for suite 3', () => {
		// Arrange

		const testData = mockedJestResponseMultipleTestResult;
		const expectedOutput = fs.readFileSync(path.resolve(__dirname, 'fixtures/multiple-test-result-filtered.md'), 'utf8');
		const options: IJestDocReporterConfigOptions = {
			title: 'Jest Doc Reporter',
			logo: '![Tux, the Linux mascot](/assets/images/tux.png)',
			outputPath: '/dev/null',
			sort: 'none',
			filterRegex: /^Suite name 3$/,
		};
		// Act
		const output = reporter({
			testData,
			options,
			jestConfig: mockedJestGlobalConfig,
		});

		// Assert
		expect(output).to.be.equals(expectedOutput);
	});
});
