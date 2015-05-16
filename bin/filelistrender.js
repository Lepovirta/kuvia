var Q = require('q');
var fs = require('./qfs');
var resources = require('./resources');

var phpImageList = resources.resourcePath('imagelist.php');
var targetVariable = 'window.imagelist';

function renderList(list) {
  var listContents = list
    .map(renderString)
    .join(', ');
  return '[' + listContents + ']';
}

function renderString(s) {
  return '"' + s + '"';
}

function renderTargetAssign(s) {
  return targetVariable + ' = ' + s + ";";
}

function readPhpImageList() {
  return fs.readFile(phpImageList);
}

function renderFileList(options, filelistSource) {
  if (options.php) {
    return readPhpImageList();
  }

  if (options.url) {
    return Q(renderTargetAssign(renderString(options.url)));
  }

  return filelistSource()
    .then(renderList)
    .then(renderTargetAssign);
}

module.exports = renderFileList;
