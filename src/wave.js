var Victor = require('victor');

var Wave = {
  draw: function(ctx) {
    var canvWidth = ctx.canvas.width;
    var canvHeight = ctx.canvas.height;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(canvWidth / 2, canvHeight / 2, this.size.x, 0, 2 * Math.PI);
    ctx.stroke();
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
