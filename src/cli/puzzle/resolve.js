const RetroPuzzleService = require('../../services/RetroPuzzleService')
const ResolveCommandValidator = require('../../validators/ResolveCommandValidator')
const ResolveCommand = require('../../commands/puzzle/ResolveCommand')
const loggerFactory = require('../../factories/loggerFactory')

const logger = loggerFactory.build()
const retroPuzzleService = new RetroPuzzleService({ logger })
const resolveCommandValidator = new ResolveCommandValidator({ logger })
const resolveCommand = new ResolveCommand({ retroPuzzleService, resolveCommandValidator, logger })

module.exports = {
  describe: resolveCommand.constructor.description,
  builder: resolveCommand.buildArgsDetailsForBuilder(),
  handler: async argv => logger.info(await resolveCommand.executeAsync(argv)),
}
