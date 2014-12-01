import Ember from 'ember';
import numeral from '../utils/numeral';

export function formatNumber(number, format) {
  return numeral(number).format(format);
}

export default Ember.Handlebars.makeBoundHelper(formatNumber);
