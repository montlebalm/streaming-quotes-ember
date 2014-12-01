import DS from 'ember-data';

var Symbol = DS.Model.extend({
  symbol: DS.attr('string')
});

// Fixtures
Symbol.reopenClass({
  FIXTURES: [
    { id: 1, symbol: 'a' },
    { id: 2, symbol: 'b' },
    { id: 3, symbol: 'c' },
    { id: 4, symbol: 'd' },
    { id: 5, symbol: 'e' },
    { id: 6, symbol: 'f' },
    { id: 7, symbol: 'g' },
    { id: 8, symbol: 'h' },
    { id: 9, symbol: 'i' }
  ]
});

export default Symbol;
