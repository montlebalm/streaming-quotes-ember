import _ from '../utils/underscore';
import Ember from 'ember';

var COLUMNS = ['ask', 'bid', 'price', 'volume'];
var STOCKS = {
  a: makeStock('a', 'Agile A'),
  b: makeStock('b', 'B Brothers'),
  c: makeStock('c', 'C co.'),
  d: makeStock('d', 'D Dungarees'),
  e: makeStock('e', 'Electric E Inc.'),
  f: makeStock('f', 'Fantastic F co.'),
  g: makeStock('g', 'Guaranteed G LLC.'),
  h: makeStock('h', 'Hyped H'),
  i: makeStock('i', 'Industrious I Inc.')
};

function makeStock(symbol, name) {
  return {
    symbol: symbol,
    name: name,
    ask: 100,
    bid: 100,
    price: 100,
    volume: 1000000
  };
}

// Randomly augment the `seed` value by a max of `diff`
function randomVariant(seed, diff) {
  return seed + (Math.random() * seed / 99);
}

function getUpdates(stock) {
  var updates = {};

  _.each(COLUMNS, function(col) {
    // Only update some fields
    if (Math.floor(Math.random() * 4) === 0) {
      updates[col] = randomVariant(stock[col]);
    }
  });

  return updates;
}

var Streamer = Ember.Object.extend({
  onConnect: function(data) {},
  onUpdate: function(updates, date) {},
  schedule: function() {
    return Ember.run.later(this, function() {
      var updates = {};
      var updateObjs = _.map(this.get('stocks'), function(s) {
        updates[s.symbol] = getUpdates(s);
      });
      this.get('onUpdate')(updates, new Date());

      this.set('timer', this.schedule());
    }, 1000);
  },
  start: function() {
    // Do the initial stock setup
    this.set('stocks', _.map(this.get('symbols'), function(s) {
      return STOCKS[s.get('symbol')];
    }));
    this.get('onConnect')(STOCKS);

    this.set('timer', this.schedule());
  },
  stocks: [],
  stop: function() {
    Ember.run.cancel(this.get('timer'));
  },
  symbols: []
});

export default Streamer;
