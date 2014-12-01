import config from './config/environment';
import Ember from 'ember';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('stocks', { path: '/' });
});

export default Router;
