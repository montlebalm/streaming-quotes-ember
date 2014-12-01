import _ from '../utils/underscore';
import Ember from 'ember';

var StocksRoute = Ember.Route.extend({
  deactivate: function() {
    this.get('streamer').stop();
  },
  model: function() {
    return {
      symbols: this.store.find('symbol')
    };
  },
  setupController: function(controller, model) {
    controller.set('model', {
      lastUpdatedDate: null,
      updates: {}
    });

    var streamer = this.get('streamer');
    streamer.on('connect', this, 'onStreamConnect');
    streamer.on('update', this, 'onStreamUpdate');

    model.symbols.then(function() {
      streamer.start(model.symbols.toArray());
    });
  },
  onStreamConnect: function(data) {
    this.controller.set('stocks', _.values(data));
  },
  onStreamUpdate: function(updates, date, data) {
    this.controller.set('model.updates', updates);
    this.controller.set('model.lastUpdatedDate', date);
  }
});

export default StocksRoute;
