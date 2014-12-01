import DS from 'ember-data';

var Stock = DS.Model.extend({
  ask: DS.attr('number'),
  bid: DS.attr('number'),
  name: DS.attr('string'),
  price: DS.attr('number'),
  symbol: DS.attr('string'),
  volume: DS.attr('number')
});

export default Stock;
