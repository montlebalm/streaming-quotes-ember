import config from './config/environment';
import Ember from 'ember';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('index', { path: '/' });
  this.resource('watchlists');
  this.resource('watchlist', { path: '/watchlists/:id' });
});

export default Router;
