import numeral from 'streaming-stocks/utils/numeral';

module('numeral');

test('does not expose global', function() {
  ok(!window.numeral);
});
