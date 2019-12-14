const { Factory } = require('rosie')
const MockRoomsFactory = require('./MockRoomsFactory')

const { rooms } = MockRoomsFactory.build()

const MockListRoomIdsByItemsFactory = new Factory()
  .attrs({
    listRoomIdsByItems: [`${rooms[2].id}`, `${rooms[3].id}`]
  })

module.exports = MockListRoomIdsByItemsFactory
