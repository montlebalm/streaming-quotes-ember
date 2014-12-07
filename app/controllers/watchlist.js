import Ember from 'ember';
import moment from '../utils/moment';

// TODO: refactor this somewhere shared
var COLUMNS = ['ask', 'askSize', 'bid', 'bidSize', 'price', 'volume'];
var LAST_UPDATED_TEXT = 'Waiting...';
var LAST_UPDATED_FORMAT = 'h:mm:ss a';

function stockToDisplay(stock, update) {
  var display = {
    id: stock.get('id'),
    name: stock.get('name'),
    symbol: stock.get('symbol')
  };

  COLUMNS.forEach(function(column) {
    display[column] = {
      value: stock.get(column),
      last: (update && column in update) ? update[column][0] : stock.get(column)
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

    console.log('renegerate stocks');

    return this.get('watchlist.stocks').map(function(stock) {
      return stockToDisplay(stock, updates[stock.get('symbol')]);
    });
  }.property('watchlist.stocks.[]', 'updates'),
  updates: {},
  watchlist: { stocks: [] }
});
