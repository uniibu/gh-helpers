const chalk = require('chalk');
const sendError = (...message) => {
  console.log(chalk.red(...message));
  process.exit(1);
}
const sendSuccess = (...message) => {
  console.log(chalk.green(...message));
  process.exit(0);
}
const validate = (args, len, message) => {
  if (args.length !== len) {
    return sendError(message);
  }
  return args;
}

const parse = (argv) => {
  return argv.slice(2);
}
exports.sendError = sendError;
exports.sendSuccess = sendSuccess;
exports.log = (...args) => console.log(chalk.cyan(...args));
exports.parseValidate = (argv, len, message) => {
  return validate(parse(argv), len, message);
}