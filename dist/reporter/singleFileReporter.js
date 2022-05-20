"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(aggregatedResults, options) {
  if (aggregatedResults == null) {
    return;
  }

  const result = (0, _index.default)({
    testData: aggregatedResults,
    options: options
  });

  const currentPath = _path.default.resolve();

  const outputPath = _path.default.resolve(currentPath, options.outputPath ?? './');

  _mkdirp.default.sync(outputPath);

  const outputFile = _path.default.resolve(outputPath, 'index.md');

  _fs.default.writeFileSync(outputFile, result);

  console.info(_chalk.default.greenBright(`@konecty/jest-doc-reporter >> Report generated (${outputFile})`));
}