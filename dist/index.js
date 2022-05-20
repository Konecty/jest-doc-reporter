"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reporters = require("@jest/reporters");

var _multipleFileReporter = _interopRequireDefault(require("./reporter/multipleFileReporter"));

var _singleFileReporter = _interopRequireDefault(require("./reporter/singleFileReporter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The test runner function passed to Jest
 */
class JestDocReporter extends _reporters.BaseReporter {
  constructor(globalConfig, options) {
    super();
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(_, _aggregatedResults) {
    if (_aggregatedResults == null) {
      return;
    }

    if (this._options?.oneFilePerSuite === true) {
      return (0, _multipleFileReporter.default)(_aggregatedResults, this._options);
    }

    (0, _singleFileReporter.default)(_aggregatedResults, this._options);
  }

}

var _default = JestDocReporter;
exports.default = _default;