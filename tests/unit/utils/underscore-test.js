import underscore from 'streaming-stocks/utils/underscore';

module('underscore');

test('does not expose global', function() {
  ok(!window._);
});
