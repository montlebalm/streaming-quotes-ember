import Ember from 'ember';
import numeral from '../utils/numeral';

function cellHtml(text, classes) {
  return '<span class="' + classes.join(' ') + '">' + text + '</span>';
}

export function streamingCell(data, format, defaultText) {
  var text = defaultText;
  var classes = [];

  if (data) {
    var formatted = numeral(data.value).format(format);
    text = Ember.Handlebars.Utils.escapeExpression(formatted);

    if (data.updated) {
      classes.push('updated');
    }
  }

  return new Ember.Handlebars.SafeString(cellHtml(text, classes));
}

export default Ember.Handlebars.makeBoundHelper(streamingCell);
