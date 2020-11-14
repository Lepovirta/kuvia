#!/usr/bin/env node

const optionParser = require('./options').options;
const findFiles = require('./findfiles');
const renderFiles = require('./filelistrender');
const readJs = require('./jsreader');
const renderPage = require('./page');
const fileWriter = require('./writer');

const options = optionParser();
const filelist = findFiles.bind(null, options);
const renderedFiles = renderFiles.bind(null, options, filelist);
const js = readJs.bind(null, options);
const writer = fileWriter.bind(null, options);

renderPage(options, js, renderedFiles).done(writer);
