import DS from 'ember-data';

var Stock = DS.Model.extend({
  ask: DS.attr('number'),
  askSize: DS.attr('number'),
  bid: DS.attr('number'),
  bidSize: DS.attr('number'),
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
    askSize: 100,
    bid: 100,
    bidSize: 100,
    price: 100,
    volume: 1000000
  };
}

// Fixtures
Stock.reopenClass({
  FIXTURES: [
    makeStock('a', 'Company A'),
    makeStock('b', 'Company B'),
    makeStock('c', 'Company C'),
    makeStock('d', 'Company D'),
    makeStock('e', 'Company E'),
    makeStock('f', 'Company F'),
    makeStock('g', 'Company G'),
    makeStock('h', 'Company H'),
    makeStock('i', 'Company I')
  ]
});

export default Stock;
