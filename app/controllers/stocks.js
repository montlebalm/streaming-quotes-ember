import _ from '../utils/underscore';
import Ember from 'ember';
import moment from '../utils/moment';

var LAST_UPDATED_TEXT = 'Waiting...';
var LAST_UPDATED_FORMAT = 'h:mm:ss a';

function stockToDisplay(stock) {
  return {
    name: stock.name,
    symbol: stock.symbol,
    values: {
      ask: {
        value: stock.ask,
        updated: false
      },
      bid: {
        value: stock.bid,
        updated: false
      },
      price: {
        value: stock.price,
        updated: false
      },
      volume: {
        value: stock.volume,
        updated: false
      }
    }
  };
}

var StocksController = Ember.ObjectController.extend({
  lastUpdated: function() {
    var date = this.get('model.lastUpdatedDate');

    if (!date) {
      return LAST_UPDATED_TEXT;
    }

    return moment(date).format(LAST_UPDATED_FORMAT);
  }.property('model.lastUpdatedDate'),
  stocks: [],
  stocksDisplay: function() {
    var updates = this.get('model.updates');

    function updateStock(stock) {
      return _.extend(stock, updates[stock.symbol]);
    }

    function updateDisplay(display) {
      _.each(updates[display.symbol], function(value, key) {
        display.values[key].value = value;
        display.values[key].updated = true;
      });

      return display;
    }

    return _.chain(this.get('stocks').toArray())
      .map(updateStock)
      .map(stockToDisplay)
      .map(updateDisplay)
      .value();
  }.property('stocks', 'model.updates')
});

export default StocksController;
