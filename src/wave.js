var Victor = require('victor');

var Wave = {
  draw: function(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size.x, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.stroke();
  },
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
