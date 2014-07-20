var Victor = require('victor');

var Nutriment = {
  draw: function(ctx, colors) {
    ctx.strokeStyle = colors[this.color];
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size.x, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.stroke();
  },
  tick: function(character) {
    var direction = Victor.subtract(character.position, this.position);
    direction.normalize().multiply(4);
    this.position.add(direction);
  },
  destroy: function() {
    this.toBeRemoved = true;
  }
};

module.exports = function(position, size, color) {
  var nutriment = Object.create(Nutriment);
  nutriment.position = position;
  nutriment.direction = new Victor(0, 0);
  nutriment.size = size;
  nutriment.color = color;
  return nutriment;
};
