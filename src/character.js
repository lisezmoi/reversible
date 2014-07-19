var Victor = require('victor');

var COLOR1 = '#d35f5f';
var COLOR2 = '#80b3ff';

var Character = {
  draw: function(ctx) {
    var canvWidth = ctx.canvas.width;
    var canvHeight = ctx.canvas.height;
    var width1 = this.size2.x + this.size1.x;
    var width2 = this.size2.x;

    ctx.beginPath();
    ctx.fillStyle = this.activeColor === 1? COLOR1 : COLOR2;
    ctx.arc(this.position.x, this.position.y, width1, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = this.activeColor === 1? COLOR2 : COLOR1;
    ctx.arc(this.position.x, this.position.y, width2, 0, 2 * Math.PI);
    ctx.fill();
  },
  totalSize: function() {
    return this.size1.clone().add(this.size2);
  },
  reverse: function() {
    this.activeColor = this.activeColor === 1? 2 : 1;
  },
  getColor: function() {
    return this.activeColor === 1? COLOR1 : COLOR2;
  }
};

module.exports = function(position, size1, size2) {
  var character = Object.create(Character);
  character.size1 = new Victor(size1, size1);
  character.size2 = new Victor(size2, size2);
  character.activeColor = 1;

  character.position = position;
  return character;
};