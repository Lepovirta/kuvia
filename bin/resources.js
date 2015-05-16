var path = require('path');

var sourceBasePath = path.join(__dirname, '..', 'src');
var resourceBasePath = path.join(__dirname, '..', 'resources');

exports.resourcePath = function(filename) {
  return path.join(resourceBasePath, filename);
};

exports.sourcePath = function(filename) {
  return path.join(sourceBasePath, filename);
};
