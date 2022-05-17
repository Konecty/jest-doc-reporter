export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',

	testEnvironment: 'jest-environment-node',

	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	reporters: [
		'default',

		[
			'.',
			{
				title: 'Konecty Jest Docs Reporter',
				outputPath: './docs',
				sort: 'asc',
			},
		],
	],
	verbose: true,
};
