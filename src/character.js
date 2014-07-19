var Victor = require('victor');
var filters = require('./filters');

var COLOR1 = 'rgba(200,255,0,1)';
var COLOR2 = 'rgba(250,90,100,1)';

var Character = {
  draw: function(ctx) {
    var canvWidth = ctx.canvas.width;
    var canvHeight = ctx.canvas.height;
    var width1 = this.size2.x + this.size1.x;
    var width2 = this.size2.x;
    
    ctx.fillStyle="rgb(50,50,50)";
    ctx.fillRect(0,0,canvWidth,canvHeight);
    
    ctx.beginPath();
    ctx.fillStyle = this.activeColor === 1? COLOR1 : COLOR2;
    ctx.arc(this.position.x, this.position.y, width1, 0, 2 * Math.PI);
    //filters.drawCircle(this.position.x, this.position.y, width1, width1+2, 1, COLOR2, ctx);

    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = this.activeColor === 1? COLOR2 : COLOR1;
    ctx.arc(this.position.x, this.position.y, width2, 0, 2 * Math.PI);
    ctx.fill();

    // filters.makeSomeNoise(ctx);

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
