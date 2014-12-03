import {
  formatNumber
} from 'streaming-stocks/helpers/format-number';

module('FormatNumberHelper');

test('it accepts null format', function() {
  var result = formatNumber(42);
  equal(result, 42, 'Returns original number');
});
