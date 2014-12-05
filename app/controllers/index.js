import _ from '../utils/underscore';
import Ember from 'ember';

export default Ember.Controller.extend({
  watchlists: [],
  watchlistsSorted: function() {
    return _.sortBy(this.get('watchlists').toArray(), function(watchlist) {
      return watchlist.get('name');
    });
  }.property('watchlists.[]')
});
