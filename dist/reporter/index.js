"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reporter;

var _update = _interopRequireDefault(require("lodash/update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reporter({
  testData,
  options
}) {
  const {
    title = 'Docs',
    logo,
    sort = 'none',
    filterRegex
  } = options;
  const result = [];

  if (logo != null) {
    result.push(`${logo}\n`);
  }

  result.push(`# ${title}\n`);
  result.push('---\n');
  const suites = testData.testResults.reduce((acc, testResult) => {
    if (testResult.testResults.length === 0) {
      return acc;
    }

    testResult.testResults.forEach(test => {
      (0, _update.default)(acc, test.ancestorTitles, value => (value ?? []).concat(`-   ${test.title}`));
    });
    return acc;
  }, {});

  const sortedEntries = entries => {
    if (sort === 'asc') {
      return entries.sort();
    }

    if (sort === 'desc') {
      return entries.sort().reverse();
    }

    return entries;
  };

  const filteredEntries = entries => {
    if (filterRegex == null) {
      return entries;
    }

    if (filterRegex instanceof RegExp) {
      return entries.filter(entry => !entry.match(filterRegex));
    }

    return entries.filter(entry => !entry.match(new RegExp(filterRegex)));
  };

  return result.concat(sortedEntries(filteredEntries(Object.keys(suites))).reduce((acc, suite) => {
    acc.push(`## ${suite}\n`);
    return acc.concat(sortedEntries(filteredEntries(suites[suite]))).concat('');
  }, [])).join('\n');
}