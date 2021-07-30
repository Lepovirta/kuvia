const fs = require('fs');

fs.copyFile('git-hook-commit-msg', '.git/hooks/commit-msg', (err) => {
  if (err) throw err;
});
