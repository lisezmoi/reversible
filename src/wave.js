var Victor = require('victor');

var Wave = {
  destroy: function() {
    this.toBeRemoved = true;
  }
};

module.exports = function(position, size, color) {
  var wave = Object.create(Wave);
  wave.position = position;
  wave.size = size;
  wave.color = color;
  wave.created = Date.now();
  return wave;
};
