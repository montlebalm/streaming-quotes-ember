import DS from 'ember-data';

var Stock = DS.Model.extend({
  ask: DS.attr('number'),
  bid: DS.attr('number'),
  name: DS.attr('string'),
  price: DS.attr('number'),
  symbol: DS.attr('string'),
  volume: DS.attr('number')
});

var GUID = 0;

function makeStock(symbol, name) {
  return {
    id: GUID++,
    symbol: symbol,
    name: name,
    ask: 100,
    bid: 100,
    price: 100,
    volume: 1000000
  };
}

// Fixtures
Stock.reopenClass({
  FIXTURES: [
    makeStock('a', 'Agile A'),
    makeStock('b', 'B Brothers'),
    makeStock('c', 'C co.'),
    makeStock('d', 'D Dungarees'),
    makeStock('e', 'Electric E Inc.'),
    makeStock('f', 'Fantastic F co.'),
    makeStock('g', 'Guaranteed G LLC.'),
    makeStock('h', 'Hyped H'),
    makeStock('i', 'Industrious I Inc.')
  ]
});

export default Stock;
