var Q = require('q');
var _ = require('lodash');
var browserify = require('browserify');
var uglifyify = require('uglifyify');
var resources = require('./resources');

var mainProgramPath = resources.sourcePath('main.js');

function readJs(options) {
  var bundler = browserify(mainProgramPath);
  if (!options['no-min']) {
    bundler.transform({global: true}, uglifyify);
  }
  return Q.ninvoke(bundler, 'bundle')
    .then(function(v) { return v.toString('utf-8'); });
}

module.exports = readJs;
