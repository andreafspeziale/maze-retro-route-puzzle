const yargs = require('yargs')

const COMMAND_DIR = './'

const run = () => yargs
  .commandDir(COMMAND_DIR)
  .demandCommand()
  .help()
  .argv

module.exports = run
