const Q = require('q');
const fs = require('./qfs');
const resources = require('./resources');

const phpImageList = resources.resourcePath('imagelist.php');

function renderString(s) {
  return `"${s}"`;
}

function renderList(list) {
  const listContents = list.map(renderString).join(', ');
  return `[${listContents}]`;
}

function renderTargetAssign(s) {
  return `window.imagelist = ${s};`;
}

function readPhpImageList() {
  return fs.readFile(phpImageList);
}

/**
 * Render image list for the image gallery based on options.
 *
 * - PHP enabled? PHP image list script is read.
 * - JSON source? Use the JSON path as the image list.
 * - Otherwise: Create a list out of the given files.
 */
function renderFileList(options, filelistSource) {
  if (options.php) {
    return readPhpImageList();
  }

  if (options.json) {
    return Q(renderTargetAssign(renderString(options.json)));
  }

  return filelistSource()
    .then(renderList)
    .then(renderTargetAssign);
}

module.exports = renderFileList;
