import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:streamer', 'StreamerService', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('fires "connect" event', function() {
  expect(1);
  stop();

  var service = this.subject();
  service.one('connect', function() {
    ok(true);
    service.stop();
    start();
  });
  service.start();
});

test('fires "update" event', function() {
  expect(1);
  stop();

  var service = this.subject();
  service.one('update', function() {
    ok(true);
    service.stop();
    start();
  });
  service.start();
});
