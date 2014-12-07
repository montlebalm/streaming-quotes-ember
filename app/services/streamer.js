import _ from '../utils/underscore';
import Ember from 'ember';

// TODO: refactor this somewhere shared
var COLUMNS = ['ask', 'askSize', 'bid', 'bidSize', 'price', 'volume'];

// Randomly augment the `seed` value by up to 1%
function randomVariant(seed) {
  return seed + (Math.random() * seed / 99);
}

function updateStock(stock) {
  COLUMNS.forEach(function(column) {
    if (Math.floor(Math.random() * 5) === 0) {
      stock.set(column, randomVariant(stock.get(column)));
    }
  });

  var changes = stock.changedAttributes();
  changes.symbol = stock.get('symbol');
  stock.save();

  return changes;
}

var Streamer = Ember.Object.extend(Ember.Evented, {
  interval: 1000,
  schedule: function() {
    return Ember.run.later(this, function() {
      var updates = this.get('stocks').map(updateStock);
      var updatesBySymbol = _.indexBy(updates, 'symbol');

      this.trigger('update', new Date(), updatesBySymbol);
      this.set('timer', this.schedule());
    }, this.get('interval'));
  },
  start: function(stocks) {
    this.set('stocks', stocks);
    this.trigger('connect');
    this.set('timer', this.schedule());
  },
  stocks: [],
  stop: function() {
    Ember.run.cancel(this.get('timer'));
  }
});

export default Streamer;
