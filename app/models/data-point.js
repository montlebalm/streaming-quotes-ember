import DS from 'ember-data';

var DataPoint = DS.Model.extend({
  value: DS.attr('number'),
  updated: DS.attr('bool')
});

export default DataPoint;
