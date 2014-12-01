import _ from '../utils/underscore';
import Ember from 'ember';

var COLUMNS = ['ask', 'bid', 'price', 'volume'];
var STOCKS = {
  a: makeStock('a', 'Agile A'),
  b: makeStock('b', 'B Brothers'),
  c: makeStock('c', 'C co.'),
  d: makeStock('d', 'D Dungarees'),
  e: makeStock('e', 'Electric E Inc.'),
  f: makeStock('f', 'Fantastic F co.Agile A'),
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

function randomVariant(seed, diff) {
  return seed + (Math.random() * seed / 99);
}

function getUpdates(stock) {
  var updates = {};

  _.each(COLUMNS, function(col) {
    if (Math.floor(Math.random() * 4) === 0) {
      updates[col] = randomVariant(stock[col]);
    }
  });

  return updates;
}

var Streamer = Ember.Object.extend({
  init: function() {
    this.set('stocks', _.map(this.get('symbols'), function(s) {
      return STOCKS[s.get('symbol')];
    }));
  },
  firstRun: true,
  onUpdate: function(date) {},
  schedule: function(fn) {
    return Ember.run.later(this, function() {
      var updates = {};

      _.each(this.get('stocks'), function(s) {
        updates[s.symbol] = getUpdates(s);
      });

      if (this.get('firstRun')) {
        updates = STOCKS;
        this.set('firstRun', false);
      }

      fn(updates, new Date());
      this.set('timer', this.schedule(fn));
    }, 1000);
  },
  start: function() {
    this.set('timer', this.schedule(this.get('onUpdate')));
  },
  stocks: [],
  stop: function() {
    Ember.run.cancel(this.get('timer'));
  },
  symbols: []
});

export default Streamer;
