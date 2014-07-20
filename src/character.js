var Victor = require('victor');

var Character = {
  draw: function(ctx, colors) {
    var canvWidth = ctx.canvas.width;
    var canvHeight = ctx.canvas.height;

    var width1 = this.sizes[this.color].length() +
                 this.sizes[this.inactiveColor()].length();
    var width2 = this.sizes[this.inactiveColor()].length();

    ctx.beginPath();
    ctx.fillStyle = colors[this.color];
    ctx.arc(this.position.x, this.position.y, width1, 0, 2 * Math.PI);

    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = colors[this.inactiveColor()];
    ctx.arc(this.position.x, this.position.y, width2, 0, 2 * Math.PI);
    ctx.fill();
  },
  totalSize: function() {
    return this.sizes[0].clone().add(this.sizes[1]);
  },
  inactiveColor: function() {
    return this.color === 0? 1 : 0;
  },
  reverse: function() {
    this.color = this.inactiveColor();
  },
  touch: function(color) {
    var growBy = new Victor(1, 1).normalize().multiply(2);
    if (color === this.color) {
      this.sizes[this.color].add(growBy);
      this.sizes[this.inactiveColor()].subtract(growBy);
    }
  }
};

module.exports = function(position, size1, size2, colors) {
  var character = Object.create(Character);
  character.sizes = [
    new Victor(size1, size1),
    new Victor(size2, size2)
  ];
  character.color = 0;

  character.position = position;
  return character;
};
