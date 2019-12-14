const { Factory } = require('rosie')
const Graph = require('node-dijkstra')

const MockRoomsGraphFactory = new Factory()
  .attrs({
    graph: new Graph({
      1: { 2: 1 },
      2: { 1: 1, 3: 1, 4: 1 },
      3: { 2: 1 },
      4: { 2: 1 },
    })
  })

module.exports = MockRoomsGraphFactory
