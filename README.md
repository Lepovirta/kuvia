# Instant Gallery

From time to time, I like to show some photos to a group of friends. I usually
load up the files to a web server, and let the server do an automatic index
page. It's fine for a file or two, but browsing files by individually opening
each link becomes tedious fast.

To solve this problem, I made a JS powered page that loads up all the images on
a single page. In this page, browsing the images is as easy as pressing left
and right keys. This way I can host a simple photo gallery on pretty much any
platform that supports serving static files.

## Options

      -h, --help          Display this help
      -o, --output=ARG    File to write the output
      -d, --dir=ARG+      Directories to scan for images
      -r, --recursive     Recursively scan directories for images
      -t, --types=ARG     Comma separated list of file types to include in image scanning
      -e, --pattern=ARG+  Patterns for scanning image files
      -p, --prefix=ARG    Prefix to add to each scanned file
      -u, --url=ARG       Custom URL source for images
          --php           Generate PHP version of Instant Gallery
          --no-min        Disable minimization
          --css=ARG       Custom CSS file
          --css-url=ARG   Custom CSS url

## License

(2-clause BSD license)

Copyright (c) 2012-2015, Jaakko Pallari
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

