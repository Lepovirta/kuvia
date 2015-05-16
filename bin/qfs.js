var Q = require('q');
var fs = require('fs');

exports.readFile = function(filename) {
  return Q.nfcall(fs.readFile, filename, 'utf-8');
}
