import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      watchlists: this.store.find('watchlist')
    };
  },
  setupController: function(controller, model) {
    controller.set('watchlists', model.watchlists);
  }
});
