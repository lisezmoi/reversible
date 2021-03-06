var Victor = require('victor');

var Wave = {
  draw: function(ctx, colors) {
    ctx.beginPath();
    ctx.strokeStyle = this.invert? 'grey' : colors[this.color];
    ctx.arc(this.position.x, this.position.y, this.size.length(), 0, 2 * Math.PI);
    ctx.lineWidth = this.active? 2 : 0.5;
    ctx.stroke();
  },
  destroy: function() {
    this.toBeRemoved = true;
  }
};

module.exports = function(position, size, color) {
  var wave = Object.create(Wave);
  wave.active = true;
  wave.invert = false;
  wave.position = position;
  wave.size = size;
  wave.color = color;
  wave.created = Date.now();
  return wave;
};
