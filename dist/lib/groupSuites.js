"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = groupSuites;

var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));

var _sortEntries = _interopRequireDefault(require("./sortEntries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function groupSuites(testResultGroup, filterRegex, sort) {
  const testFilter = filterRegex instanceof RegExp ? filterRegex : new RegExp(filterRegex ?? '');
  const outputFiles = {}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const generateFiles = (groups, parent = []) => {
    Object.keys(groups).forEach(suite => {
      if (filterRegex != null && suite.match(testFilter)) {
        return;
      }

      const group = groups[suite];

      if (group != null && group.testResults != null) {
        const key = parent.concat(suite).filter(k => k).map(p => (0, _kebabCase.default)(p || '')).join('/');
        outputFiles[key] = [`# ${suite}\n`].concat((0, _sortEntries.default)(sort, group.testResults.filter(test => {
          if (filterRegex != null && test.title.match(testFilter)) {
            return false;
          }

          return true;
        }).map(test => `-   ${test.title}`))).join('\n');
      }

      Object.keys(group).filter(k => k !== 'testResults').forEach(k => {
        generateFiles({
          [k]: group[k]
        }, parent.concat(suite));
      });
    }, {});
  };

  generateFiles(testResultGroup);
  return outputFiles;
}