import fs from 'fs';
import sinon, { SinonStub } from 'sinon';
import JestDocReporter from '../src';
import { mockedJestGlobalConfig } from './fixtures/jest-config';
import { mockedJestResponseSingleTestResult } from './fixtures/jest-results';

jest.mock('mkdirp');

describe('index', () => {
	let writeFileSync: SinonStub;

	beforeEach(() => {
		writeFileSync = sinon.stub(fs, 'writeFileSync').returns(null as unknown as void);
	});
	afterEach(() => {
		writeFileSync.restore();
	});

	it('should return the jest global config if used as a testResultsProcessor', async () => {
		// Arrange

		const reporter = new JestDocReporter(mockedJestGlobalConfig, {
			title: 'Jest Doc Reporter',
			logo: '![Tux, the Linux mascot](/assets/images/tux.png)',
			outputPath: '/dev/null',
			sort: 'none',
		});

		// Act
		await reporter.onRunComplete(mockedJestGlobalConfig, mockedJestResponseSingleTestResult);

		// Assert
		sinon.assert.calledOnce(writeFileSync);
		// expect(testResultsProcessorOutput).to.be.equals(input);
	});
});
