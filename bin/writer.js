var qfs = require('./qfs');

function writeContents(options, contents) {
  if (options.output) {
    return qfs.writeFile(options.output, contents);
  } else {
    return qfs.writeToStream(process.stdout, contents);
  }
}

module.exports = writeContents;
