import moment from 'streaming-stocks/utils/moment';

module('moment');

test('does not expose global', function() {
  ok(!window.moment);
});
