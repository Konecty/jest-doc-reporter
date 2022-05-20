"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path = _interopRequireDefault(require("path"));

var _filterEntries = _interopRequireDefault(require("../lib/filterEntries"));

var _groupResults = _interopRequireDefault(require("../lib/groupResults"));

var _groupSuites = _interopRequireDefault(require("../lib/groupSuites"));

var _sortEntries = _interopRequireDefault(require("../lib/sortEntries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(aggregatedResults, options) {
  if (aggregatedResults == null) {
    return;
  }

  const {
    title = 'Docs',
    logo,
    sort = 'none',
    filterRegex
  } = options;

  const currentPath = _path.default.resolve();

  const outputPath = _path.default.resolve(currentPath, options.outputPath ?? './');

  const testResultGroup = (0, _groupResults.default)(aggregatedResults);
  const outputFiles = (0, _groupSuites.default)(testResultGroup, filterRegex, sort); // eslint-disable-next-line @typescript-eslint/no-explicit-any

  function writeIndex(groups, parent = []) {
    const index = [];

    if (parent.length == 0) {
      if (logo != null) {
        index.push(`${logo}\n`);
      }

      index.push(`# ${title}\n`);
    } else {
      index.push(`# ${parent[parent.length - 1]}\n`);
    }

    (0, _sortEntries.default)(sort, (0, _filterEntries.default)(filterRegex, Object.keys(groups))).forEach(suite => {
      if (groups[suite].testResults == null) {
        index.push(`-   [${suite}](${(0, _kebabCase.default)(suite)}/index.md)\n`);
        writeIndex(groups[suite], parent.concat(suite));
      } else {
        index.push(`-   [${suite}](${(0, _kebabCase.default)(suite)}.md)\n`);
      }
    });

    const indexFile = _path.default.resolve(outputPath, parent.map(_kebabCase.default).join('/'), 'index.md');

    _mkdirp.default.sync(_path.default.dirname(indexFile));

    _fs.default.writeFileSync(indexFile, index.join('\n'));
  }

  writeIndex(testResultGroup);
  Object.keys(outputFiles).forEach(key => {
    const outputFile = _path.default.resolve(outputPath, `${key}.md`);

    const content = outputFiles[key];

    _mkdirp.default.sync(_path.default.dirname(outputFile));

    _fs.default.writeFileSync(outputFile, content);
  });
  console.info(_chalk.default.greenBright(`@konecty/jest-doc-reporter >> ${Object.keys(outputFiles).length + 1} Reports generated to (${outputPath})`));
}