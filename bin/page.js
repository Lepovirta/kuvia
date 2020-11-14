const Q = require('q');
const handlebars = require('handlebars');
const uglifycss = require('uglifycss');
const fs = require('./qfs');
const resources = require('./resources');

const cssFile = resources.resourcePath('style.css');
const templateFile = resources.resourcePath('page.hbs');

function readCssFile(options) {
  const contents = fs.readFile(cssFile);

  if (options['no-min']) {
    return contents;
  }
  return contents.then((v) => uglifycss.processString(v));
}

function optionsToLocals(options) {
  return {
    pretty: options['no-min'],
    cssUrls: options.css || [],
    jsUrls: options.js || [],
  };
}

/**
 * Render the HTML page for Kuvia
 */
function renderPage(options, jsSource, listSource) {
  const promises = [
    fs.readFile(templateFile),
    readCssFile(options),
    jsSource(),
    listSource(),
  ];

  function render([templateStr, galleryCss, galleryJs, listJs]) {
    const template = handlebars.compile(templateStr);
    const locals = optionsToLocals(options);
    const templateOpts = { galleryCss, galleryJs, listJs };
    return template({ ...locals, ...templateOpts });
  }

  return Q.all(promises).then(render);
}

module.exports = renderPage;
