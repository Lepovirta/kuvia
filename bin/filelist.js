var path = require('path');
var Q = require('q');
var glob = require('glob');
var url = require('url');

var defaultFiletypes = [
  'jpg', 'jpeg', 'png', 'gif'
];

function filetypesToPattern(filetypes, dir, isRecursive) {
  var dir_ = dir || '';
  var star = isRecursive ? '**' : '';
  var combined = filetypes.join('|');
  var pattern = '*.*(' + combined + ')';
  return path.join(dir_, star, pattern);
}

function getFiletypes(options) {
  return options.types
    ? (options.types + '').split(',')
    : defaultFiletypes;
}

function optionsToPatterns(options) {
  if (options.pattern && options.pattern.length > 0) {
    return options.pattern;
  }

  var filetypes = getFiletypes(options);
  return options.dir.map(function(dir) {
    return filetypesToPattern(filetypes, dir, options.recursive);
  });
}

function canGlob(options) {
  return (options.pattern && options.pattern.length > 0)
    || (options.dir && options.dir.length > 0);
}

function flatten(arrayOfArrays) {
  var m = [];
  return m.concat.apply(m, arrayOfArrays);
}

function globFiles(options) {
  if (!canGlob(options))
    return Q([]);

  var patterns = optionsToPatterns(options);
  var files = patterns.map(function(pattern) {
    return Q.nfcall(glob, pattern, {nocase: true})
  });
  return Q.all(files).then(flatten);
}

function httpPath(file) {
  var f = path.sep === '\\'
    ? file.replace(/\\/g, '/')
    : file;
  return url.format(f);
}

function httpPaths(options, files) {
  var prefix = options.prefix || "";

  return files.map(function(file) {
    return prefix + httpPath(file);
  });
}

function readFiles(options) {
  var extraFiles = options.files || [];
  return globFiles(options)
    .then(function(files) { return files.concat(extraFiles); })
    .then(function(files) { return httpPaths(options, files); });
}

module.exports = readFiles;
