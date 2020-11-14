const path = require('path');
const Q = require('q');
const glob = require('glob');
const url = require('url');

const defaultFiletypes = [
  'jpg', 'jpeg', 'png', 'gif', 'webp',
];

function filetypesToPattern(filetypes, dir, isRecursive) {
  const star = isRecursive ? '**' : '';
  const combined = filetypes.join('|');
  const pattern = `*.*(${combined})`;
  return path.join(dir || '', star, pattern);
}

function getFiletypes(options) {
  if (!options.types) {
    return defaultFiletypes;
  }
  if (typeof options.types === 'string') {
    return options.types.split(',');
  }
  return options.types;
}

function optionsToPatterns(options) {
  const optionPatterns = options.pattern || [];
  const filetypes = getFiletypes(options);
  const dirPatterns = (options.dir || []).map(
    (dir) => filetypesToPattern(filetypes, dir, options.recursive),
  );
  return optionPatterns.concat(dirPatterns);
}

function canGlob(options) {
  return (options.pattern && options.pattern.length > 0)
    || (options.dir && options.dir.length > 0);
}

function globFiles(options) {
  if (!canGlob(options)) {
    return Q([]);
  }

  const patterns = optionsToPatterns(options);
  const files = patterns.map(
    (pattern) => Q.nfcall(glob, pattern, { nocase: true }),
  );
  return Q.all(files).then((a) => a.flat());
}

function httpPath(file) {
  const f = path.sep === '\\'
    ? file.replace(/\\/g, '/')
    : file;
  return url.format(f);
}

function httpPaths(options, files) {
  const prefix = options.prefix || '';

  return files.map((file) => prefix + httpPath(file));
}

function deduplicate(l) {
  return l.filter((v, i, a) => a.indexOf(v) === i);
}

/**
 * Find files based on the given options.
 *
 * Duplicates are automatically removed from the results.
 *
 * The given options is a map that can contain these fields:
 * - files: list of files to always include in the results
 * - pattern: patterns for scanning files
 * - dir: directories to scan for files
 * - types: the types of files to scan for (e.g. jpg, png)
 * - prefix: prefix to include in all the scanned results
 * - recursive: whether to scan files recursively or not
 */
function findFiles(options) {
  const extraFiles = options.files || [];
  return globFiles(options)
    .then((files) => files.concat(extraFiles))
    .then((files) => httpPaths(options, files))
    .then(deduplicate);
}

module.exports = findFiles;
