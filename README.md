# Instant Gallery

From time to time, I like to show some photos to a group of friends. I usually
load up the files to a web server, and let the server do an automatic index
page. It's fine for a file or two, but browsing files by individually opening
each link becomes tedious fast.

To solve this problem, I made a JS powered page that loads up all the images on
a single page. In this page, browsing the images is as easy as pressing left
and right keys. This way I can host a simple photo gallery on pretty much any
platform that supports serving static files.

## How it works

Since Instant Gallery can't automatically read any lists other than what is
provided in JS, the list of image locations are provided as a JS array. Instant
Gallery reads `windows.imagelist` for a list of image sources after the page
has loaded.

Edit the `list.js` file, and replace the contents of `window.imagelist` array
with all the image files you wish to use. You can use whatever source format
that the `img` HTML tag can use as its `src` property.

## Installing

1. Copy these files: `index.html`, `instantgallery.css`, `instantgallery.js`,
   and `list.js`.
2. Edit `list.js` and replace the list of image sources with your own
   list. Make sure that the list is assigned to `window.imagelist`.
3. Place the files to where you want to host your image gallery.
4. (Optional) You can rename `index.html`, if you like.

## Hacking

Instant Gallery is build from `src/` directory using [Browserify][] and
[UglifyJS][]. If you want to modify Instant Gallery the proper way, you first
need [Node.JS][], [NPM][]. Once you've got those, install Browserify and
UglifyJS using NPM. You can build the project with `build.sh` once you have all
the components installed.

## License

(2-clause BSD license)

Copyright (c) 2012, Jaakko Pallari
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

[browserify]: http://browserify.org/
[uglifyjs]: https://github.com/mishoo/UglifyJS2
[node.js]: http://nodejs.org/
[npm]: https://npmjs.org/
