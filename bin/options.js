const Getopt = require('node-getopt');

const optionSpec = [
  ['h', 'help', 'Display this help.'],
  ['o', 'output=ARG', 'File to write the page to. Uses STDOUT if not specified.'],

  // Image scanning
  ['d', 'dir=ARG+', 'Directories to scan for images.'],
  ['r', 'recursive', 'Recursively scan directories for images.'],
  ['t', 'types=ARG', 'Comma separated list of file types to include in image scanning'],
  ['e', 'pattern=ARG+', 'Patterns for scanning image files'],
  ['p', 'prefix=ARG', 'Prefix to add to each scanned file'],

  // Alternatives for image scanning
  ['j', 'json=ARG', 'Custom JSON source for images'],
  ['', 'php', 'Use PHP to load the list of images.'],

  // Customization
  ['J', 'js=ARG+', 'URLs to custom JavaScript files'],
  ['C', 'css=ARG+', 'URLs to custom CSS files'],
  ['', 'no-min', 'Disable minimization'],
];

const helpText = [
  'Usage: kuvia [OPTIONS] [FILE ...]',
  'Kuvia page generator',
  '\n[[OPTIONS]]\n',
].join('\n');

const opt = (() => {
  const o = new Getopt(optionSpec);
  o.setHelp(helpText);
  o.bindHelp();
  return o;
})();

function getOptions(args) {
  const result = args ? opt.parse(args) : opt.parseSystem();
  const { options } = result;
  options.files = result.argv;
  return options;
}

function getHelp() {
  return opt.getHelp();
}

exports.options = getOptions;
exports.help = getHelp;
