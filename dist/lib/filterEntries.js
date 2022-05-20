"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterEntries;

function filterEntries(filterRegex, entries = []) {
  if (filterRegex == null) {
    return entries;
  }

  if (filterRegex instanceof RegExp) {
    return entries.filter(entry => !entry.match(filterRegex));
  }

  return entries.filter(entry => !entry.match(new RegExp(filterRegex)));
}