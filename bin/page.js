var Q = require('q');
var fs = require('./qfs');
var jade = require('jade');
var uglifycss = require('uglifycss');
var _ = require('lodash');
var resources = require('./resources');

var cssFile = resources.resourcePath('style.css');
var templateFile = resources.resourcePath('page.jade');

function readCssFile(options) {
  var file = options.css || cssFile;
  var contents = fs.readFile(file);

  if (options['no-min']) {
    return contents;
  } else {
    return contents.then(function(v) { return uglifycss.processString(v); });
  }
}

function cssLocals(options) {
  var cssUrl = options['css-url'];

  if (cssUrl) {
    return Q({cssSrc: cssUrl});
  }

  return readCssFile(options).then(function(v) { return {igCss: v}; });
}

function readTemplateFile() {
  return fs.readFile(templateFile);
}

function readPage(options, jsSource, listSource) {
  var promises = [readTemplateFile(), cssLocals(options), jsSource(), listSource()];

  function render(results) {
    var contents = results[0];
    var jadeOpts = _.extend(results[1], {
      pretty: options['no-min'],
      igJs: results[2],
      listJs: results[3]
    });
    return jade.render(contents, jadeOpts);
  }

  return Q.all(promises).then(render);
}

module.exports = readPage;
