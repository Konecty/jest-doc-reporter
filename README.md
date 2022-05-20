![Konecty](./docs/logo-konecty.png)

![npm shield](https://img.shields.io/npm/v/@konecty/jest-doc-reporter?style=flat-square)

# Jest Docs Reporter

[Jest](https://github.com/facebook/jest) test results processor for generate a list of suites and test cases

## Installation

```shell
$ yarn add --dev @konecty/jest-doc-reporter
```

## Usage

Configure Jest to process the test results by adding the following entry to the Jest config (jest.config.json):

```JSON
"reporters": [
	"default",
	["@konecty/jest-doc-reporter", {
		"title": "Test Report",
        "outputPath": "./docs",
		"sort": "asc",
	}]
]
```

As you run Jest from within the terminal, a file called _index.md_ will be created within your outputPath or root folder containing information about your tests.

### Node Compatibility

![npm shield](https://img.shields.io/node/v/@konecty/jest-doc-reporter?style=flat-square)

This plugin is compatible with Node version `^16.0.0`

## Configuration

Please note that all configuration properties are optional.

| Property          | Type                | Description                                                                           | Default     |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------- | ----------- |
| `title`           | `STRING`            | The title of the document. This string will also be outputted on the top of the page. | `"Docs"`    |
| `logo`            | `STRING`            | Path to a logo that will be included in the header of the report                      | `null`      |
| `outputPath`      | `STRING`            | The path to where the plugin will output the HTML report.                             | `"./"`      |
| `sort`            | `STRING`            | Sorts the test results alphabeticaly using `"asc"`, `"desc"` or `"none"`              | `"none"`    |
| `filterRegex`     | `STRING` or `REGEX` | Remove test result that matches the pattern                                           | `undefined` |
| `oneFilePerSuite` | `BOOLEAN`           | Split results one file per suite                                                      | `false`     |
