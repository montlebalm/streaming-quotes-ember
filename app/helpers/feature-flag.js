var FEATURES = {
  title: true,
  subtitle: false
};

export default function(key, options) {
  if (options && key && FEATURES[key]) {
    return options.fn(this);
  }
}
