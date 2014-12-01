import Streamer from '../services/streamer';

export default {
  name: 'streamer',
  initialize: function(container, application) {
    application.register('streamer:main', Streamer);
    application.inject('route', 'streamer', 'streamer:main');
  }
}
