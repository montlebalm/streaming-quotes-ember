import Ember from 'ember';
import moment from '../utils/moment';

var LAST_UPDATED_TEXT = 'Waiting...';
var LAST_UPDATED_FORMAT = 'h:mm:ss a';

var StocksController = Ember.Controller.extend({
  lastUpdated: function() {
    var date = this.get('lastUpdatedDate');

    if (!date) {
      return LAST_UPDATED_TEXT;
    }

    return moment(date).format(LAST_UPDATED_FORMAT);
  }.property('lastUpdatedDate'),
  lastUpdatedDate: null,
  stocks: []
});

export default StocksController;
