var Victor = require('victor');

var Nutriment = {
  draw: function(ctx, colors) {
    ctx[this.charged? 'fillStyle' : 'strokeStyle'] = colors[this.color];
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size.x, 0, 2 * Math.PI);
    if (!this.charged) ctx.lineWidth = 2;
    ctx[this.charged? 'fill' : 'stroke']();
  },
  tick: function(character, speed) {
    var direction = Victor.subtract(character.position, this.position);
    direction.normalize().multiply(speed);
    this.position.add(direction);
  },
  invertColor: function() {
    this.color = this.color === 0? 1 : 0;
  },
  destroy: function() {
    this.toBeRemoved = true;
  }
};

module.exports = function(position, size, color) {
  var nutriment = Object.create(Nutriment);
  nutriment.charged = false;
  nutriment.position = position;
  nutriment.direction = new Victor(0, 0);
  nutriment.size = size;
  nutriment.color = color;
  return nutriment;
};
