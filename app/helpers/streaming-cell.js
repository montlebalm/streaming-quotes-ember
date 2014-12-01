import Ember from 'ember';
import numeral from '../utils/numeral';

export function streamingCell(data, format) {
  var formatted = numeral(data.value).format(format);
  var escaped = Ember.Handlebars.Utils.escapeExpression(formatted);
  var highlightClass = (data.updated) ? 'updated' : '';

  return new Ember.Handlebars.SafeString('<span class="' + highlightClass + '">' + escaped + '</span>');
}

export default Ember.Handlebars.makeBoundHelper(streamingCell);
