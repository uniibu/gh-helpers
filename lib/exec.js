const execa = require('execa');
const { splitToObject } = require('split-cmd')
const { sendSuccess, sendError } = require('./processor');
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
    const pr = execa(parts.command, [].concat(parts.args), { input: stdin, })
    pr.stdout.pipe(stdout)
    pr.stderr.pipe(stderr)
    pr.on('error', (err) => {
      return reject(err);
    })
    pr.on('exit', (code) => {
      if (code != 0) {
        return reject(code)
      }
      return resolve(code);
    })
    pr.on('close', (code) => {
      if (code != 0) {
        return reject(code)
      }
      return resolve(code)
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