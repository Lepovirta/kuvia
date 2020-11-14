module.exports = (...args) => {
  if (window.console && window.console.log) {
    // console is not always available in some browsers
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};
