You can pull the latest development version from GitHub:

    $ git clone git@github.com:Lepovirta/kuvia.git

Once you've fetched the source code, you can install the dependencies locally using [npm](https://www.npmjs.com/):

    $ cd kuvia
    $ npm install

The JS source code for the UI can be found from `src` directory.
The main program can be found from the `bin` directory.
The `resources` directory contains the stylesheets and HTML templates.

You can run the local Kuvia app from the `bin` directory to try your changes:

    $ ./bin/kuvia.js -o gallery.html -d myimages

