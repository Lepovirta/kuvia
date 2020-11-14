/* global test, expect */
const optionParser = require('./options').options;

test('parse image scanning options', () => {
  const args = [
    '-o', 'output.html',
    '-d', 'dir1',
    '-d', 'dir2',
    '-r',
    '-t', 'jpeg',
    '-J', 'extra.js',
    '-C', 'extra.css',
  ];
  const options = {
    output: 'output.html',
    dir: ['dir1', 'dir2'],
    recursive: true,
    types: 'jpeg',
    js: ['extra.js'],
    css: ['extra.css'],
  };
  expect(optionParser(args)).toMatchObject(options);
});
