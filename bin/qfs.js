var Q = require('q');
var fs = require('fs');

exports.readFile = function(filename) {
  return Q.nfcall(fs.readFile, filename, 'utf-8');
};

exports.writeFile = function(filename, data) {
  return Q.nfcall(fs.writeFile, filename, data, 'utf-8');
};

exports.writeToStream = function(stream, contents) {
  return Q.ninvoke(stream, 'write', contents, 'utf-8');
};
