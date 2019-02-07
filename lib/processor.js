const chalk = require('chalk');

const sendError = (...message) => {
  console.log(chalk.red(...message));
  process.exit(1);
}
const sendSuccess = (...message) => {
  console.log(chalk.green(...message));
  process.exit(0);
}
const helpMessage = `
Usage: gh-[pull|push|release] [origin] [branch] [options]

- origin      Defaults to "origin"
- branch      Defaults to "master"
- options
  - gh-release:
      - "[patch|minor|major]"     Semver Version to use
      - "publish"                 Publishes to NPM
      - "[0-9]"                   OTP
`
const parse = (argv) => {
  const args = argv.slice(2);
  if (args[0] == 'help' || args[0] == '--help') {
    sendSuccess(`${helpMessage}`);
  }
  return args;
}
exports.sendError = sendError;
exports.sendSuccess = sendSuccess;
exports.log = (...args) => console.log(chalk.cyan(...args));
exports.parse = parse;