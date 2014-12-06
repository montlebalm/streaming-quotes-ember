import _ from '../utils/underscore';
import Ember from 'ember';
import moment from '../utils/moment';

// TODO: refactor this somewhere shared
var COLUMNS = ['ask', 'askSize', 'bid', 'bidSize', 'price', 'volume'];
var LAST_UPDATED_TEXT = 'Waiting...';
var LAST_UPDATED_FORMAT = 'h:mm:ss a';

function stockToDisplay(stock, update) {
  var display = {
    name: stock.get('name'),
    symbol: stock.get('symbol')
  };

  _.each(COLUMNS, function(key) {
    display[key] = {
      value: stock.get(key),
      last: (update && key in update) ? update[key][0] : stock.get(key)
    };
  });

  return display;
}

export default Ember.Controller.extend({
  lastUpdated: function() {
    var date = this.get('lastUpdatedDate');
    var text = LAST_UPDATED_TEXT;

    if (date) {
      text = moment(date).format(LAST_UPDATED_FORMAT);
    }

    return text;
  }.property('lastUpdatedDate'),
  lastUpdatedDate: null,
  stocks: function() {
    var updates = this.get('updates');

    return _.map(this.get('watchlist.stocks').toArray(), function(stock) {
      return stockToDisplay(stock, updates[stock.get('symbol')]);
    });
  }.property('updates'),
  updates: {},
  watchlist: {}
});
