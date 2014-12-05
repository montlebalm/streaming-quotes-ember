import moment from '../utils/moment';
import Ember from 'ember';

export function formatDate(date, format) {
  return moment(date).format(format);
}

export default Ember.Handlebars.makeBoundHelper(formatDate);
