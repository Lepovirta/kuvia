#!/usr/bin/env node

var options = require('./options')().options;

var filelist = require('./filelist').bind(null, options);

var filelistRender = require('./filelistrender').bind(null, options, filelist);

var jsreader = require('./jsreader').bind(null, options);

var page = require('./page').bind(null, options, jsreader, filelistRender);

var writer = require('./writer').bind(null, options);

page().done(writer);
