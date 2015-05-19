var Getopt = require('node-getopt');

var optionSpec = [
  ['h', 'help', 'Display this help'],
  ['o', 'output=ARG', 'File to write the output'],

  // Image scanning
  ['d', 'dir=ARG+', 'Directories to scan for images'],
  ['r', 'recursive', 'Recursively scan directories for images'],
  ['t', 'types=ARG', 'Comma separated list of file types to include in image scanning'],
  ['e', 'pattern=ARG+', 'Patterns for scanning image files'],
  ['p', 'prefix=ARG', 'Prefix to add to each scanned file'],

  // Alternatives for image scanning
  ['j', 'json=ARG', 'Custom JSON source for images'],
  ['', 'php', 'Use PHP to load a list of images'],

  // Customization
  ['J', 'js=ARG+', 'URLs to custom JavaScript files'],
  ['C', 'css=ARG+', 'URLs to custom CSS files'],
  ['', 'no-min', 'Disable minimization']
];

var helpText = [
  "Usage: instantgallery [OPTIONS] [FILE ...]",
  "Instant Gallery page generator",
  "\n[[OPTIONS]]\n",
].join('\n');

function getOptions() {
  var opt = new Getopt(optionSpec);
  opt.setHelp(helpText);
  opt.bindHelp();
  var result = opt.parseSystem();
  var options = result.options;
  options.files = result.argv;
  return options;
}

module.exports = getOptions;
