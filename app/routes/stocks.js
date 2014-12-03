import Ember from 'ember';

var StocksRoute = Ember.Route.extend({
  deactivate: function() {
    var streamer = this.get('streamer');
    streamer.stop();
  },
  model: function() {
    return {
      stocks: this.store.find('stock')
    };
  },
  setupController: function(controller, model) {
    var streamer = this.get('streamer');
    streamer.on('update', this, 'onStreamUpdate');

    model.stocks.then(function(stocks) {
      streamer.start(stocks);
    });
  },
  onStreamUpdate: function(date, stocks) {
    this.controller.set('lastUpdatedDate', date);
    this.controller.set('stocks', stocks);
  }
});

export default StocksRoute;
