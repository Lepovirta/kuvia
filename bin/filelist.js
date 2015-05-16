var path = require('path');
var Q = require('q');
var glob = require('glob');

var defaultFiletypes = [
  'jpg', 'jpeg', 'png', 'gif', 'tiff'
];

function filetypesToPattern(filetypes, dir, isRecursive) {
  var dir_ = dir || '';
  var star = isRecursive ? '**' : '';
  var combined = filetypes.join('|');
  var pattern = '*.*(' + combined + ')';
  return path.join(dir_, star, pattern);
}

function getFiletypes(options) {
  return options.filetypes
    ? (options.filetypes + '').split(',')
    : defaultFiletypes;
}

function optionsToPattern(options) {
  if (typeof options.glob === 'string') {
    return options.glob;
  }

  var filetypes = getFiletypes(options);
  return filetypesToPattern(filetypes, options.dir, options.recursive);
}

function globFiles(options) {
  var pattern = optionsToPattern(options);
  return Q.nfcall(glob, pattern, {nocase: true});
}

function prependDir(dir, files) {
  return files.map(function(file) { return path.join(dir, file); });
}

function readFiles(options) {
  var files = options.file ? Q(options.file) : globFiles(options);
  if (options.path) {
    return files.then(function(files) { return prependDir(options.path, files); })
  } else {
    return files;
  }
}

module.exports = readFiles;
