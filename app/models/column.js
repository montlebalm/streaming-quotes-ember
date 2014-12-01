import DS from 'ember-data';

var Column = DS.Model.extend({
  align: DS.attr('string'),
  key: DS.attr('string'),
  name: DS.attr('string')
});

// Fixtures
Column.reopenClass({
  FIXTURES: [
    { id: 1, align: 'left', key: 'symbol', name: 'Symbol' },
    { id: 2, align: 'left', key: 'name', name: 'Name' },
    { id: 3, align: 'right', key: 'price', name: 'Price' },
    { id: 4, align: 'right', key: 'lastUpdated', name: 'Last Updated' }
  ]
});

export default Column;
