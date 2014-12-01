import _ from '../utils/underscore';
import Ember from 'ember';
import Streamer from '../services/streamer';

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
    var self = this;

    controller.set('model', {
      lastUpdatedDate: null,
      stocks: []
    });

    model.symbols.then(function(obj) {
      var streamer = Streamer.create({
        onUpdate: function(updates, date) {
          if (!controller.get('model.lastUpdatedDate')) {
            controller.set('stocks', _.values(updates));
          }

          controller.set('updates', updates);
          controller.set('model.lastUpdatedDate', date);
        },
        symbols: model.symbols.toArray()
      });
      streamer.start();
      self.set('streamer', streamer);
    });
  }
});

export default StocksRoute;
