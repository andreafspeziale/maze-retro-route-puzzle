const BaseCommand = require('../BaseCommand')
const CommandArg = require('../../models/CommandArg')
const ResolveCommandExecutionError = require('../../errors/ResolveCommandExecutionError')

/**
 * Class implementing the resolve command.
 * @extends {BaseCommand}
 */
class ResolveCommand extends BaseCommand {
  /**
   * Create a new instance.
   * @param  {Object<Object>} options.retroPuzzleService      The retroPuzzleService instance.
   * @param  {Object<Object>} options.resolveCommandValidator The resolveCommandValidator instance.
   * @param  {Object<Object>} [options.logger]                The logger instance.
   * @throws {TypeError}                                      If some required property is missing.
   */
  constructor({ retroPuzzleService, resolveCommandValidator, logger }) {
    super({ logger })

    if (!retroPuzzleService) {
      const errorMessage = `Invalid "retroPuzzleService" value: ${retroPuzzleService}`
      throw new TypeError(errorMessage)
    }

    if (!resolveCommandValidator) {
      const errorMessage = `Invalid "resolveCommandValidator" value: ${resolveCommandValidator}`
      throw new TypeError(errorMessage)
    }

    this.retroPuzzleService = retroPuzzleService
    this.resolveCommandValidator = resolveCommandValidator
    this.args = this.constructor.listArgs()
    this.synopsis = this.setSynopsis()
  }

  /**
   * The command description.
   */
  static get description() {
    return 'It resolves a given puzzle for give items to collect and start.'
  }

  /**
   * It set the command synopsis.
   */
  setSynopsis() {
    let synopsis = 'resolve '
    this.args.forEach((item) => {
      synopsis += item.formatSynopsis()
    })
    return synopsis
  }

  /**
   * It list the args necessary to set the cli command args.
   */
  static listArgs() {
    const puzzle = new CommandArg({
      name: 'puzzle',
      type: 'string',
      alias: 'p',
      description: 'The puzzle to be resolved.',
      nargs: 1,
      demand: true,
    })
    const items = new CommandArg({
      name: 'items',
      type: 'string',
      alias: 'i',
      description: 'The items to collect.',
      nargs: 1,
      demand: true,
    })
    const start = new CommandArg({
      name: 'start',
      type: 'string',
      alias: 's',
      description: 'The starting point.',
      nargs: 1,
      demand: true,
    })
    return [puzzle, items, start]
  }

  /**
   * It build the args details object to be injected in yargs cli command.
   */
  buildArgsDetailsForBuilder() {
    const argsDetails = {}
    this.args.forEach((arg) => {
      argsDetails[arg.name] = arg.getArgPropertiesWithoutName()
    })
    return argsDetails
  }

  /**
   * It validates the input parameters in order to execute the command.
   * @param  {Object<Object>} options.puzzle The puzzle.
   * @param  {Object<Object>} options.items  The items to collect.
   * @param  {Object<Object>} options.start  The start.
   */
  async doValidateAsync({ puzzle, items, start }) {
    return this.resolveCommandValidator
      .resolveAsync({ puzzle, items, start })
  }

  /**
   * It executes the command after the validation step.
   * @param  {Object<Object>} options.puzzle The puzzle.
   * @param  {Object<Object>} options.items  The items to collect.
   * @param  {Object<Object>} options.start  The start.
   * @throws {ResolveCommandExecutionError}  If some error occurs.
   */
  async doExecuteAsync({ puzzle, items, start }) {
    try {
      const path = await this.retroPuzzleService.listPathRooms(puzzle, items, start)
      return path
    } catch (error) {
      this.logger.error({
        fn: 'doExecuteAsync',
        error,
        args: { puzzle, items, start },
      })
      throw new ResolveCommandExecutionError(error)
    }
  }
}

module.exports = ResolveCommand
