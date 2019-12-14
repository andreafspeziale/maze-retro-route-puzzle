const Joi = require('@hapi/joi')
const BaseValidator = require('./BaseValidator')
const ResolveCommandValidationError = require('../errors/ResolveCommandValidationError')

const resolveSchema = Joi.object()
  .keys({
    puzzle: Joi.array().items(Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      objects: Joi.array().items(Joi.object({ name: Joi.string().required() })),
      north: Joi.number(),
      south: Joi.number(),
      east: Joi.number(),
      west: Joi.number(),
    }).or('north', 'south', 'east', 'west')),
    items: Joi.array().items(Joi.string().required()).required(),
    start: Joi.string().required(),
  })
  .required()

/**
 * Class implementing the resolve command validator.
 * @extends {BaseValidator}
 */
class ResolveCommandValidator extends BaseValidator {
  /**
   * Create a new instance.
   * @param  {Object<Object>} [options.logger] The logger instance.
   * @throws {TypeError}                       If some required property is missing.
   */
  constructor({ logger }) {
    super({ logger })
  }

  /**
   * Validate the given command data.
   * @param {Object} args                     The command args.
   * @throws {ResolveCommandValidationError}  If some error occurs.
   */
  async resolveAsync(args) {
    try {
      const { puzzle, items, start } = args
      const validatedArgs = await this.validateAsync({ puzzle: JSON.parse(puzzle), items: JSON.parse(items), start }, resolveSchema)
      return validatedArgs
    } catch (error) {
      this.logger.error({
        fn: 'resolveAsync',
        error,
      })
      throw new ResolveCommandValidationError(error)
    }
  }
}

module.exports = ResolveCommandValidator
