module.exports = function() {
  if (window.console && window.console.log) {
    // console is not always available in some browsers
    console.log.apply(console, arguments);
  }
}
