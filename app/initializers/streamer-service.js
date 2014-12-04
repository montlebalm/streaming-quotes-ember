import Streamer from '../services/streamer';

export function initialize(container, application) {
  application.register('service:streamer', Streamer);
  application.inject('route', 'streamer', 'service:streamer');
}

export default {
  name: 'streamer-service',
  initialize: initialize
};
