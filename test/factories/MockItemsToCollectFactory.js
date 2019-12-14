const { Factory } = require('rosie')

const MockItemsToCollectFactory = new Factory()
  .attrs({
    itemsToCollect: ['Potted Plant', 'Knife'],
  })

module.exports = MockItemsToCollectFactory
