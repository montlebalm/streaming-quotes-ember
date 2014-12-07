import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    removeStock: function(id) {
      var watchlist = this.get('controller.watchlist');

      this.store.find('stock', id).then(function(stock) {
        watchlist.get('stocks').removeObject(stock);
        watchlist.save();
      });
    }
  },
  deactivate: function() {
    var streamer = this.get('streamer');
    streamer.stop();
  },
  model: function(params) {
    return this.store.find('watchlist', params.id);
  },
  setupController: function(controller, watchlist) {
    var streamer = this.get('streamer');
    streamer.on('update', this, 'onStreamUpdate');

    this.set('watchlist', watchlist);
    controller.set('watchlist', watchlist);

    watchlist.get('stocks').then(function(stocks) {
      streamer.start(stocks);
    });
  },
  onStreamUpdate: function(date, updates) {
    console.log('onStreamUpdate');
    if (updates) {
      this.controller.set('lastUpdatedDate', date);
      this.controller.set('updates', updates);
    }
  }
});
