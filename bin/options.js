var optparser = require('node-getopt');

var optionSpec = [
  ['h', 'help', 'display this help'],
  ['u', 'url=ARG', 'Custom URL source for images'],
  ['P', 'php', 'Generate PHP version of Instant Gallery'],
  ['o', 'output=ARG', 'File to write the output'],

  // Image scanning
  ['d', 'dir=ARG', 'Directory to scan for images'],
  ['r', 'recursive', 'Recursively scan directory for images'],
  ['p', 'path=ARG', 'Path to prepend to scanned images'],
  ['g', 'glob=ARG', 'Glob pattern for image files'],
  ['f', 'file=ARG+', 'Files to include in the file list'],
  ['t', 'filetypes=ARG', 'File types to include in directory scanning'],

  // Customization
  ['M', 'no-min', 'Disable minimization'],
  ['C', 'css=ARG', 'Custom CSS file'],
  ['', 'css-url=ARG', 'Custom CSS url']
];

function getOptions() {
  return optparser.create(optionSpec).bindHelp().parseSystem();
}

module.exports = getOptions;
