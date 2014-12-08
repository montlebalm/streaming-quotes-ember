import Ember from 'ember';

// TODO: refactor this somewhere shared
var COLUMNS = ['ask', 'askSize', 'bid', 'bidSize', 'price', 'volume'];

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

function sortFn(field) {
  return function(a, b) {
    if (field === 'name') {
      return a.name > b.name;
    } else {
      return a[field].value > b[field].value;
    }
  };
}

export default Ember.Controller.extend({
  lastUpdatedDate: null,
  sortAscending: true,
  sortProperty: 'name',
  stocks: function() {
    var updates = this.get('updates');
    var stocks = this.get('watchlist.stocks').map(function(stock) {
      return stockToDisplay(stock, updates[stock.get('symbol')]);
    });

    var field = this.get('sortProperty');
    var sorted = stocks.sort(sortFn(field));

    if (!this.get('sortAscending')) {
      sorted.reverse();
    }

    return sorted;
  }.property('watchlist.stocks.[]', 'updates', 'sortProperty', 'sortAscending'),
  updates: {},
  watchlist: { stocks: [] }
});
