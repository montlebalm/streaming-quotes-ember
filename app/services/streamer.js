import _ from '../utils/underscore';
import Ember from 'ember';

function stockToDisplay(stock) {
  return {
    name: stock.get('name'),
    symbol: stock.get('symbol'),
    values: {
      ask: {
        value: stock.get('ask'),
        updated: false
      },
      bid: {
        value: stock.get('bid'),
        updated: false
      },
      price: {
        value: stock.get('price'),
        updated: false
      },
      volume: {
        value: stock.get('volume'),
        updated: false
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
    // Only update some fields
    if (Math.floor(Math.random() * 5) === 0) {
      stock.values[key].value = randomVariant(stock.values[key].value);
      stock.values[key].updated = true;
    } else {
      stock.values[key].updated = false;
    }
  });

  return stock;
}

var Streamer = Ember.Object.extend(Ember.Evented, {
  schedule: function() {
    return Ember.run.later(this, function() {
      var stocks = _.map(this.get('stocks'), updateStock);

      this.trigger('update', new Date(), stocks);
      this.set('timer', this.schedule());
    }, 1000);
  },
  start: function(stocks) {
    var formatted = _.map(stocks.toArray(), stockToDisplay);
    this.set('stocks', formatted);

    this.trigger('connect');
    this.set('timer', this.schedule());
  },
  stocks: [],
  stop: function() {
    Ember.run.cancel(this.get('timer'));
  }
});

export default Streamer;
