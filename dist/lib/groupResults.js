"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = groupResults;

var _update = _interopRequireDefault(require("lodash/update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function groupResults(aggregatedResults) {
  return aggregatedResults.testResults.reduce((acc, testResult) => {
    testResult.testResults.forEach(test => {
      (0, _update.default)(acc, test.ancestorTitles.concat('testResults'), value => (value ?? []).concat(test));
    });
    return acc;
  }, {});
}