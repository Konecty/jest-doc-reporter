"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortEntries;

function sortEntries(sort, entries) {
  if (!Array.isArray(entries)) {
    return entries;
  }

  if (sort === 'asc') {
    return entries.sort();
  }

  if (sort === 'desc') {
    return entries.sort().reverse();
  }

  return entries;
}