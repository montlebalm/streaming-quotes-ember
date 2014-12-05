import Ember from 'ember';

var FEATURES = {
  title: true,
  subtitle: false
};

export default Ember.Component.extend({
  enabled: function() {
    return FEATURES[this.get('key')];
  }.property('key'),
  key: ''
});
