const Graph = require('node-dijkstra')
const WithOptionalLogger = require('../helpers/WithOptionalLogger')

const BuildGraphError = require('../errors/BuildGraphError')
const ListPathRoomsError = require('../errors/ListPathRoomsError')
const GetRoomEdgesError = require('../errors/GetRoomEdgesError')
const ListRoomIdsByItemsError = require('../errors/ListRoomIdsByItemsError')
const NoPathError = require('../errors/NoPathError')
const NoEdgesError = require('../errors/NoEdgesError')

/**
 * Returns an object representing the passed room edges with fixed weight.
 * @param {Object} room              The room.
 * @throws {GetRoomCoordinatesError} If some error occurs.
 */
// eslint-disable-next-line no-underscore-dangle
function _getRoomEdges(room) {
  try {
    const {
      id,
      objects,
      name,
      ...edges
    } = room
    const weightEdges = Object.values(edges).reduce((acc, edge) => {
      acc[`${edge}`] = 1
      return acc
    }, {})
    if (!Object.keys(weightEdges).length) {
      this.logger.error({
        fn: '_getRoomEdges',
        args: { room },
      })
      throw new NoEdgesError()
    }
    return weightEdges
  } catch (error) {
    this.logger.error({
      fn: '_getRoomEdges',
      error,
      args: { room },
    })
    throw new GetRoomEdgesError(error)
  }
}

/**
 * Class implementing the retro-puzzle service.
 * @extends {WithOptionalLogger}
 */
class RetroPuzzleService extends WithOptionalLogger {
  /**
   * Create a new instance.
   * @param  {Object<Object>} [options.logger] The logger instance.
   * @throws {TypeError}                       If some required property is missing.
   */
  constructor({ logger }) {
    super({ logger })
  }

  /**
   * Returns a Graph object representing the passed rooms.
   * @param {Array} rooms      The rooms.
   * @throws {BuildGraphError} If some error occurs.
   */
  buildGraph(rooms) {
    try {
      return rooms.reduce((graph, room) => graph.addNode(`${room.id}`, _getRoomEdges(room)), new Graph())
    } catch (error) {
      this.logger.error({
        fn: 'buildGraph',
        error,
        args: { rooms },
      })
      throw new BuildGraphError(error)
    }
  }

  /**
   * Returns the filtered rooms id by passed items.
   * @param {Object} rooms             The rooms of the puzzle.
   * @param {Array} itemsToCollect     The items to be collected.
   * @throws {ListRoomIdsByItemsError} If some error occurs.
   */
  listRoomIdsByItems(rooms, itemsToCollect) {
    try {
      return rooms
        .filter(({ objects }) => objects.some(({ name }) => itemsToCollect.includes(name)) === true)
        .map(({ id }) => `${id}`)
    } catch (error) {
      this.logger.error({
        fn: 'listRoomIdsByItems',
        error,
        args: { rooms, itemsToCollect },
      })
      throw new ListRoomIdsByItemsError(error)
    }
  }

  /**
   * Returns the list of rooms in order to collect all the items.
   * @param {Object} rooms          The rooms of the puzzle.
   * @param {Array}  itemsToCollect The items to be collected.
   * @param {String} start          The room id starting point.
   * @throws {NoPathError}          If there are no available paths.
   * @throws {ListPathRoomsError}   If some error occurs.
   */
  listPathRooms(rooms, itemsToCollect, start) {
    try {
      const graph = this.buildGraph(rooms)
      const roomsWithInterestedItems = this.listRoomIdsByItems(rooms, itemsToCollect)
      let currentRoom = start
      let path = []
      while (roomsWithInterestedItems.length) {
        const [nearestItemPath] = roomsWithInterestedItems
          // eslint-disable-next-line no-loop-func
          .map(targetRoom => graph.path(currentRoom, targetRoom))
          .filter(availablePath => availablePath.length)
          .sort(availablePath => availablePath.length)

        if (!nearestItemPath) {
          this.logger.error({
            fn: 'listPathRooms',
            args: {
              rooms,
              graph,
              itemsToCollect,
              start,
            },
          })
          throw new NoPathError()
        }

        currentRoom = nearestItemPath[nearestItemPath.length - 1]
        path = [...path, ...nearestItemPath]
        roomsWithInterestedItems.splice(roomsWithInterestedItems
          // eslint-disable-next-line no-loop-func
          .findIndex(item => item === path[path.length - 1]), 1)
      }
      const sanitize = path.filter((item, index) => item !== path[index + 1])
      return sanitize
        .reduce((mapPath, roomId) => [...mapPath, ...rooms.filter(({ id }) => roomId === `${id}`)], [])
    } catch (error) {
      this.logger.error({
        fn: 'listPathRooms',
        error,
        args: {
          rooms,
          itemsToCollect,
          start,
        },
      })
      throw new ListPathRoomsError(error)
    }
  }
}

module.exports = RetroPuzzleService
