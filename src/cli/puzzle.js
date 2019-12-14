const PUZZLE_COMMAND_DIR = 'puzzle'

module.exports = {
  command: 'puzzle <command>',
  describe: 'Manage puzzle service.',
  builder: yargs => yargs.commandDir(PUZZLE_COMMAND_DIR),
}
