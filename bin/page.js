var Q = require('q');
var fs = require('./qfs');
var jade = require('jade');
var uglifycss = require('uglifycss');
var _ = require('lodash');
var resources = require('./resources');

var cssFile = resources.resourcePath('style.css');
var templateFile = resources.resourcePath('page.jade');

function readCssFile(options) {
  var contents = fs.readFile(cssFile);

  if (options['no-min']) {
    return contents;
  } else {
    return contents.then(function(v) { return uglifycss.processString(v); });
  }
}

function readTemplateFile() {
  return fs.readFile(templateFile);
}

function optionsToLocals(options) {
  return {
    pretty: options['no-min'],
    cssUrls: options.css || [],
    jsUrls: options.js || [],
  };
}

function readPage(options, jsSource, listSource) {
  var promises = [readTemplateFile(), readCssFile(options), jsSource(), listSource()];

  function render(results) {
    var contents = results[0];
    var locals = optionsToLocals(options);
    var jadeOpts = _.extend(locals, {
      galleryCss: results[1],
      galleryJs: results[2],
      listJs: results[3]
    });
    return jade.render(contents, jadeOpts);
  }

  return Q.all(promises).then(render);
}

module.exports = readPage;
