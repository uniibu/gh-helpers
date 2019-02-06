const chalk = require('chalk');
const { resolve } = require('path');
const { existsSync } = require('fs');
let npmClient;
if (process.env.npm_execpath) {
  npmClient = process.env.npm_execpath.includes('yarn.js') ? 'yarn' : 'npm run'
} else {
  npmClient = existsSync(resolve(process.cwd(), 'yarn.lock')) ? 'yarn' : 'npm run'
}
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
      - "--publish"     Publishes to NPM
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
exports.npm = npmClient