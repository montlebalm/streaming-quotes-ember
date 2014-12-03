import Ember from 'ember';
import numeral from '../utils/numeral';

export default Ember.Component.extend({
  classNameBindings: ['updated'],
  format: '0',
  last: 0,
  lastFormatted: function() {
    return numeral(this.get('last')).format(this.get('format'));
  }.property('last', 'format'),
  tagName: 'span',
  updated: function() {
    return this.get('valueFormatted') !== this.get('lastFormatted');
  }.property('value', 'last'),
  value: 0,
  valueFormatted: function() {
    return numeral(this.get('value')).format(this.get('format'));
  }.property('value', 'format')
});
