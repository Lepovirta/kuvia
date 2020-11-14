const Q = require('q');
const fs = require('fs');

exports.readFile = (filename) => Q.nfcall(fs.readFile, filename, 'utf-8');
exports.writeFile = (filename, data) => Q.nfcall(fs.writeFile, filename, data, 'utf-8');
exports.writeToStream = (stream, contents) => Q.ninvoke(stream, 'write', contents, 'utf-8');
