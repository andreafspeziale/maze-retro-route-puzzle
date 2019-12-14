const CommandError = require('../errors/CommandError')
const WithOptionalLogger = require('../helpers/WithOptionalLogger')
const sanitizer = require('../utils/sanitizer')

/**
 * Class implementing the base command.
 * @extends {WithOptionalLogger}
 */
class BaseCommand extends WithOptionalLogger {
  /**
   * Create a new instance.
   * @param  {Object<Object>} [options.logger] The logger instance.
   * @throws {TypeError}                       If some required property is missing.
   */
  constructor({ logger }) {
    super({ logger })
  }

  /**
   * Validate and execute the specific command.
   * @param {Object} args   The command args.
   * @throws {CommandError} If some error occurs.
   */
  async executeAsync(args) {
    let result
    try {
      const validatedArgs = await this.doValidateAsync(args)
      result = await this.doExecuteAsync(validatedArgs)
    } catch (error) {
      const { _, $0, ...usefulArgs } = args
      this.logger.error({
        fn: 'executeAsync',
        error,
        args: sanitizer.sanitizeObjectQuotes(usefulArgs),
      })
      throw new CommandError(error)
    }
    return result
  }

  /**
   * Common method interface for command execution.
   */
  // eslint-disable-next-line class-methods-use-this
  doExecuteAsync() {
    return Promise.reject(new Error('Method "doExecuteAsync" has not been implemented yet.'))
  }

  /**
   * Common method interface for command validation.
   */
  // eslint-disable-next-line class-methods-use-this
  doValidateAsync() {
    return Promise.reject(new Error('Method "doValidateAsync" has not been implemented yet.'))
  }
}

module.exports = BaseCommand
