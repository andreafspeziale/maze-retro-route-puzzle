/* eslint-env node, mocha */
const Graph = require('node-dijkstra')
const { expect } = require('chai')
const sinon = require('sinon')

const RetroPuzzleService = require('./RetroPuzzleService')
const MockRoomsFactory = require('../../test/factories/MockRoomsFactory')
const MockRoomsGraphFactory = require('../../test/factories/MockRoomsGraphFactory')
const MockItemsToCollectFactory = require('../../test/factories/MockItemsToCollectFactory')
const MockListRoomIdsByItemsFactory = require('../../test/factories/MockListRoomIdsByItemsFactory')
const MockExpectedPathFactory = require('../../test/factories/MockExpectedPathFactory')

describe('RetroPuzzleService (unit)', () => {
  describe('buildGraph()', () => {
    it('Should build the expected graph', () => {
      const { rooms } = MockRoomsFactory.build()
      const { graph: expectedGraph } = MockRoomsGraphFactory.build()
      const retroPuzzle = new RetroPuzzleService({})
      const graph = retroPuzzle.buildGraph(rooms)
      expect(graph).to.be.an.instanceof(Graph)
      expect(graph).to.deep.equal(expectedGraph)
    })
  })
  describe('listRoomIdsByItems()', () => {
    it('Should list the expected rooms for given objects to collect', () => {
      const { rooms } = MockRoomsFactory.build()
      const { itemsToCollect } = MockItemsToCollectFactory.build()
      const { listRoomIdsByItems: expectedListRoomIdsByItems } = MockListRoomIdsByItemsFactory.build()
      const retroPuzzle = new RetroPuzzleService({})
      const roomsWithInterestedItems = retroPuzzle.listRoomIdsByItems(rooms, itemsToCollect)
      expect(roomsWithInterestedItems)
        .to.deep.equal(expectedListRoomIdsByItems)
    })
  })
  describe('listPathRooms()', () => {
    it('Should get the expected path', () => {
      const { rooms } = MockRoomsFactory.build()
      const { graph } = MockRoomsGraphFactory.build()
      const { itemsToCollect } = MockItemsToCollectFactory.build()
      const { listRoomIdsByItems } = MockListRoomIdsByItemsFactory.build()
      const { expectedPath } = MockExpectedPathFactory.build()

      const retroPuzzle = new RetroPuzzleService({})
      sinon.stub(retroPuzzle, 'buildGraph').returns(graph)
      sinon.stub(retroPuzzle, 'listRoomIdsByItems').returns(listRoomIdsByItems)

      const listPathRooms = retroPuzzle.listPathRooms(rooms, itemsToCollect, '2')
      expect(listPathRooms).to.deep.equal(expectedPath)
    })
    afterEach(() => {
      sinon.restore()
    })
  })
})
