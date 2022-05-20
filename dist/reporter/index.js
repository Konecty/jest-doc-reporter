"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reporter;

var _filterEntries = _interopRequireDefault(require("../lib/filterEntries"));

var _groupResults = _interopRequireDefault(require("../lib/groupResults"));

var _sortEntries = _interopRequireDefault(require("../lib/sortEntries"));

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
  const testResultGroup = (0, _groupResults.default)(testData); // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const buildResult = (group, title, level = 0) => {
    if (title != null) {
      result.push(`${'#'.repeat(level + 1)} ${title}\n`);
    }

    if (group.testResults != null) {
      (0, _sortEntries.default)(sort, (0, _filterEntries.default)(filterRegex, group.testResults.map(({
        title
      }) => title))).forEach(title => {
        result.push(`-   ${title}`);
      });
      result.push('');
    }

    (0, _sortEntries.default)(sort, (0, _filterEntries.default)(filterRegex, Object.keys(group).filter(k => k !== 'testResults'))).forEach(k => {
      buildResult(group[k], k, level + 1);
    });
  };

  buildResult(testResultGroup);
  return result.join('\n');
}