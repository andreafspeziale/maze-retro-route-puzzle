const { Factory } = require('rosie')
const MockRoomsFactory = require('./MockRoomsFactory')

const { rooms } = MockRoomsFactory.build()

const MockExpectedPathFactory = new Factory()
  .attrs({
    expectedPath: [rooms[1], rooms[2], rooms[1], rooms[3]]
  })

module.exports = MockExpectedPathFactory
