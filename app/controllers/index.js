import Ember from 'ember';

export default Ember.Controller.extend({
  sortFields: ['name'],
  watchlists: [],
  watchlistsSorted: Ember.computed.sort('watchlists', 'sortFields')
});
