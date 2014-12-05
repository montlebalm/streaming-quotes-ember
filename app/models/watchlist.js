import DS from 'ember-data';

var Watchlist = DS.Model.extend({
  dateCreated: DS.attr('date'),
  dateModified: DS.attr('date'),
  name: DS.attr('string'),
  stocks: DS.hasMany('stock', { async: true })
});

// Fixtures
Watchlist.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Watchlist A', stocks: [0, 1, 2, 3, 4], dateCreated: new Date('January 15, 2012 10:02:00') },
    { id: 2, name: 'Watchlist B', stocks: [5, 6, 7, 8], dateCreated: new Date('October 13, 2014 11:13:00') }
  ]
});

export default Watchlist;
