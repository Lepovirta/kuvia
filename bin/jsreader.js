const Q = require('q');
const browserify = require('browserify');
const uglifyify = require('uglifyify');
const resources = require('./resources');

const mainProgramPath = resources.sourcePath('main.js');

/**
 * Read the JavaScript and bundle it up to a single file.
 *
 * By default, the JavaScript is minified. If the 'no-min' option is found
 * from the given options, the JavaScript is not minified.
 */
function readJs(options) {
  const bundler = browserify(mainProgramPath);
  if (!options['no-min']) {
    bundler.transform({ global: true }, uglifyify);
  }
  return Q
    .ninvoke(bundler, 'bundle')
    .then((v) => v.toString('utf-8'));
}

module.exports = readJs;
