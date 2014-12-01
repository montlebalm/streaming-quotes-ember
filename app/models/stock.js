import DS from 'ember-data';

var Stock = DS.Model.extend({
  ask: DS.attr('number'),
  bid: DS.attr('number'),
  name: DS.attr('string'),
  price: DS.attr('number'),
  symbol: DS.attr('string'),
  volume: DS.attr('number')
});

// Fixtures
Stock.reopenClass({
  FIXTURES: [
    { id: 1, ask: 320, bid: 280, name: 'Apple Inc.', price: 300, symbol: 'aapl', volume: 148372123 },
    { id: 2, ask: 41, bid: 40, name: 'Tesla Motors Inc.', price: 41, symbol: 'tsla', volume: 3002199 }
  ]
});

export default Stock;
