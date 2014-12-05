import _ from '../utils/underscore';
import Ember from 'ember';

// TODO: refactor this somewhere shared
var COLUMNS = ['ask', 'askSize', 'bid', 'bidSize', 'price', 'volume'];

// Randomly augment the `seed` value by up to 1%
function randomVariant(seed) {
  return seed + (Math.random() * seed / 99);
}

function updateStock(stock) {
  _.each(COLUMNS, function(key) {
    if (Math.floor(Math.random() * 5) === 0) {
      stock.set(key, randomVariant(stock.get(key)));
    }
  });

  var changes = stock.changedAttributes();
  stock.save();

  return _.defaults(changes, {
    symbol: stock.get('symbol')
  });
}

var Streamer = Ember.Object.extend(Ember.Evented, {
  interval: 1000,
  schedule: function() {
    return Ember.run.later(this, function() {
      var changes = _.chain(this.get('stocks').toArray())
        .map(updateStock)
        .indexBy('symbol')
        .value();

      this.trigger('update', new Date(), changes);
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
