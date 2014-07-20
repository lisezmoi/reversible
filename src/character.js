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
  sizeByWeakness: function() {
    return this.sizes.sort(function(sizeA, sizeB) {
      var aLen = sizeA.length();
      var bLen = sizeB.length();
      return Math.max(aLen, bLen) === bLen? -1 : 1;
    });
  },
  reverse: function() {
    this.color = this.inactiveColor();
  },
  balance: function(sizeDiff) {
    var sizesByWeakness = this.sizeByWeakness();
    sizesByWeakness[0].add(sizeDiff);
    sizesByWeakness[1].subtract(sizeDiff);
  },
  unbalance: function(sizeDiff) {
    var sizesByWeakness = this.sizeByWeakness();
    sizesByWeakness[1].add(sizeDiff);
    sizesByWeakness[0].subtract(sizeDiff);
  },
  touch: function(nutriment) {
    if (!nutriment.charged || nutriment.dead) return;
    var growBy = new Victor(1, 1).normalize().multiply(4);
    var colorMatch = this.color === nutriment.color;
    if (colorMatch) {
      this.balance(growBy);
    } else {
      this.unbalance(growBy);
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
