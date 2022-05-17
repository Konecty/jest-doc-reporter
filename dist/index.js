"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reporters = require("@jest/reporters");

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path = _interopRequireDefault(require("path"));

var _reporter = _interopRequireDefault(require("./reporter"));

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

    const result = (0, _reporter.default)({
      testData: _aggregatedResults,
      options: this._options
    });

    const currentPath = _path.default.resolve();

    const outputPath = _path.default.resolve(currentPath, this._options.outputPath ?? './');

    _mkdirp.default.sync(outputPath);

    const outputFile = _path.default.resolve(outputPath, 'index.md');

    _fs.default.writeFileSync(outputFile, result);

    console.info(_chalk.default.greenBright(`@konecty/jest-doc-reporter >> Report generated (${outputFile})`));
  }

}

var _default = JestDocReporter;
exports.default = _default;