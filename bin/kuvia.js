#!/usr/bin/env node

var optionParser = require('./options').options;
var getFiles = require('./filelist');
var renderFiles = require('./filelistrender');
var readJs = require('./jsreader');
var renderPage = require('./page');
var fileWriter = require('./writer');

var options = optionParser();
var filelist = getFiles.bind(null, options);
var renderedFiles = renderFiles.bind(null, options, filelist);
var js = readJs.bind(null, options);
var writer = fileWriter.bind(null, options);

renderPage(options, js, renderedFiles).done(writer);

