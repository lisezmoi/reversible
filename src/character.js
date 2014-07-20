var Victor = require('victor');
var filters = require('./filters');

var Character = {
  draw: function(ctx, colors) {
    var canvWidth = ctx.canvas.width;
    var canvHeight = ctx.canvas.height;
    var width1 = this.size2.x + this.size1.x;
    var width2 = this.size2.x;

    ctx.beginPath();
    ctx.fillStyle = colors[this.color];
    ctx.arc(this.position.x, this.position.y, width1, 0, 2 * Math.PI);
    //filters.drawCircle(this.position.x, this.position.y, width1, width1+2, 1, COLOR2, ctx);

    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = colors[this.color === 0? 1 : 0];
    ctx.arc(this.position.x, this.position.y, width2, 0, 2 * Math.PI);
    ctx.fill();
  },
  totalSize: function() {
    return this.size1.clone().add(this.size2);
  },
  reverse: function() {
    this.color = this.color === 0? 1 : 0;
  }
};

module.exports = function(position, size1, size2, colors) {
  var character = Object.create(Character);
  character.size1 = new Victor(size1, size1);
  character.size2 = new Victor(size2, size2);
  character.color = 0;

  character.position = position;
  return character;
};
