const execa = require('execa');
const { splitToObject } = require('split-cmd')
const { sendSuccess, sendError, log } = require('./processor');
const stdin = process.stdin;
const stdout = process.stdout;
const stderr = process.stderr;
const exec = function(cmdLine, cli = false) {
  return new Promise((resolve, reject) => {
    const parts = splitToObject(cmdLine);
    if (cli) {
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
    }
    const pr = execa(parts.command, [].concat(parts.args), { input: stdin })
    pr.stderr.pipe(stderr);
    pr.stdout.pipe(stdout);
    pr.on('error', (err) => {
      log(err);
    })
    pr.on('exit', (_, signal) => {
      if (signal == 'SIGINT') {
        process.exit(0)
      }
      resolve()
    })
    pr.on('close', (_, signal) => {
      if (signal == 'SIGINT') {
        process.exit(0)
      }
      resolve()
    })
  })

}

module.exports = exec;
module.exports.shell = (cmd) => {
  const { stdout, stderr } = execa.shellSync(cmd);
  if (stderr) {
    return sendError(stderr)
  }
  sendSuccess(stdout);
}
module.exports.execa = execa;