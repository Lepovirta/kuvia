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
  ['u', 'url=ARG', 'Custom URL source for images'],
  ['', 'php', 'Generate PHP version of Instant Gallery'],

  // Customization
  ['', 'no-min', 'Disable minimization'],
  ['', 'css=ARG', 'Custom CSS file'],
  ['', 'css-url=ARG', 'Custom CSS url']
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
