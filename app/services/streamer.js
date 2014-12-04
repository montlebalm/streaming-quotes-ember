import _ from '../utils/underscore';
import Ember from 'ember';

function stockToDisplay(stock) {
  return {
    name: stock.get('name'),
    symbol: stock.get('symbol'),
    values: {
      ask: {
        last: null,
        value: stock.get('ask')
      },
      askSize: {
        last: null,
        value: stock.get('askSize')
      },
      bid: {
        last: null,
        value: stock.get('bid')
      },
      bidSize: {
        last: null,
        value: stock.get('bidSize')
      },
      price: {
        last: null,
        value: stock.get('price')
      },
      volume: {
        last: null,
        value: stock.get('volume')
      }
    }
  };
}

// Randomly augment the `seed` value by up to 1%
function randomVariant(seed) {
  return seed + (Math.random() * seed / 99);
}

function updateStock(stock) {
  _.each(stock.values, function(value, key) {
    stock.values[key].last = stock.values[key].value;

    // Only update some fields
    if (Math.floor(Math.random() * 5) === 0) {
      stock.values[key].value = randomVariant(stock.values[key].value);
    }
  });

  return stock;
}

var Streamer = Ember.Object.extend(Ember.Evented, {
  interval: 1000,
  schedule: function() {
    return Ember.run.later(this, function() {
      var stocks = _.map(this.get('stocks'), updateStock);

      this.trigger('update', new Date(), stocks);
      this.set('timer', this.schedule());
    }, this.get('interval'));
  },
  start: function(stocks) {
    stocks = (stocks) ? stocks.toArray() : [];
    var formatted = _.map(stocks, stockToDisplay);
    this.set('stocks', formatted);

    this.trigger('connect');
    this.trigger('update', new Date(), formatted);
    this.set('timer', this.schedule());
  },
  stocks: [],
  stop: function() {
    Ember.run.cancel(this.get('timer'));
  }
});

export default Streamer;
