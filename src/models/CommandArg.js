/**
 * Class representing a command argument.
 */
class CommandArg {
  /**
   * Create a new instance.
   * @param  {Object<String>}  options.name         The argument name.
   * @param  {Object<String>}  options.type         The argument type.
   * @param  {Object<String>}  options.alias        The argument alias.
   * @param  {Object<String>}  options.description  The argument description.
   * @param  {Object<Number>}  options.nargs        The number of arguments.
   * @param  {Object<Boolean>} options.demand       The argument demand condition.
   * @param  {Object<Any>}     options.defaultValue The argument default value.
   */
  constructor({
    name,
    type,
    alias,
    description,
    nargs,
    demand,
    defaultValue = undefined,
  }) {
    this.name = name
    this.type = type
    this.alias = alias
    this.description = description
    this.nargs = nargs
    this.demand = demand
    this.default = defaultValue
  }

  /**
   * Get the argument properties except the name.
   */
  getArgPropertiesWithoutName() {
    return {
      type: this.type,
      alias: this.alias,
      description: this.description,
      nargs: this.nargs,
      demand: this.demand,
      default: this.default,
    }
  }

  /**
   * Format the synopsis based on the argument demand property.
   */
  formatSynopsis() {
    if (this.demand) {
      return ` <${this.name}>`
    }
    return ` [${this.name}]`
  }
}

module.exports = CommandArg
