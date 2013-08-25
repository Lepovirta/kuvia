#!/bin/sh

browserify src/main.js | uglifyjs > instantgallery.js
