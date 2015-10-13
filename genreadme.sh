#!/bin/sh

cat << EOF > README.md
# Kuvia

Kuvia is a simple image gallery for static web sites.
Give it a list of image files, and you've got an image gallery that can be hosted in any web host.

## Usage

EOF

node -e 'console.log(require("./bin/options").help())' \
    | sed 's/^/    /' \
    >> README.md

cat << EOF >> README.md

## Installation

EOF

cat installation.md >> README.md

cat << EOF >> README.md

## Documentation

EOF

cat documentation.md >> README.md

cat << EOF >> README.md

## Hacking the source code

EOF

cat hacking.md >> README.md

cat << EOF >> README.md

## License

(2-clause BSD license)

EOF

cat LICENSE >> README.md

