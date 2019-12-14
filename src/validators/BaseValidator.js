const ValidationError = require('../errors/ValidationError')
const WithOptionalLogger = require('../helpers/WithOptionalLogger')
const sanitizer = require('../utils/sanitizer')

/**
 * Class implementing the base validator.
 * @extends {WithOptionalLogger}
 */
class BaseValidator extends WithOptionalLogger {
  /**
   * Create a new instance.
   * @param  {Object<Object>} [options.logger] The logger instance.
   * @throws {TypeError}                       If some required property is missing.
   */
  constructor({ logger }) {
    super({ logger })
  }

  /**
   * Validate the given command args with its own schema.
   * @param {Object} args       The command args.
   * @param {Object} schema     The command args schema.
   * @throws {ValidationError}  If some error occurs.
   */
  async validateAsync(args, schema) {
    try {
      const validatedArgs = await schema.validateAsync(args)
      return validatedArgs
    } catch (error) {
      this.logger.error({
        fn: 'validateAsync',
        error: error.details.map(err => sanitizer.sanitizeObjectQuotes(err)),
      })
      throw new ValidationError(error)
    }
  }
}

module.exports = BaseValidator
