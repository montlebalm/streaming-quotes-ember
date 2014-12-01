import _ from '../utils/underscore';
import Ember from 'ember';
import moment from '../utils/moment';

var StocksController = Ember.ObjectController.extend({
  lastUpdated: function() {
    if (!this.get('model.lastUpdatedDate')){
      return 'Waiting...';
    }

    return moment(this.get('model.lastUpdatedDate')).format('h:mm:ss a');
  }.property('model.lastUpdatedDate'),
  stocks: [],
  stocksDisplay: function() {
    var updates = this.get('updates');

    return _.map(this.get('stocks').toArray(), function(stock) {
      var update = updates[stock.symbol] || {};
      var display = {
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

      // Update the values
      var props = _.pick(update, 'ask', 'bid', 'price', 'volume');
      _.each(props, function(value, key) {
        stock[key] = display.values[key].value = value;
        display.values[key].updated = true;
      });

      return display;
    });
  }.property('updates'),
  updates: {}
});

export default StocksController;
