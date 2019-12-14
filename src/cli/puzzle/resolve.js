const RetroPuzzleService = require('../../services/RetroPuzzleService')
const ResolveCommandValidator = require('../../validators/ResolveCommandValidator')
const ResolveCommand = require('../../commands/puzzle/ResolveCommand')
const loggerFactory = require('../../factories/loggerFactory')
const sanitizer = require('../../utils/sanitizer')

const logger = loggerFactory.build()
const retroPuzzleService = new RetroPuzzleService({ logger })
const resolveCommandValidator = new ResolveCommandValidator({ logger })
const resolveCommand = new ResolveCommand({ retroPuzzleService, resolveCommandValidator, logger })

module.exports = {
  describe: resolveCommand.constructor.description,
  builder: resolveCommand.buildArgsDetailsForBuilder(),
  handler: async (argv) => {
    const result = await resolveCommand.executeAsync(argv)
    logger.info({ path: result.map(room => sanitizer.sanitizeLineBreaks(room)) })
  },
}
