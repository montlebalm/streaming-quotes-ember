import Ember from 'ember';

export default Ember.Route.extend({
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
      controller.set('updates', {});
    });
  },
  onStreamUpdate: function(date, updates) {
    if (updates) {
      this.controller.set('lastUpdatedDate', date);
      this.controller.set('updates', updates);
    }
  },
  watchlist: null
});
