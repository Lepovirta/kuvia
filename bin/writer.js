const qfs = require('./qfs');

function writeContents(options, contents) {
  if (options.output) {
    return qfs.writeFile(options.output, contents);
  }
  return qfs.writeToStream(process.stdout, contents);
}

module.exports = writeContents;
