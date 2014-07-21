module.exports = {
  pause: function(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,.65)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '12px/19px Verdana, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME PAUSED', width / 2, height / 2);

    ctx.font = '12px/19px Verdana, sans-serif';
    ctx.fillText('PRESS [P] TO RESUME'.split("").join(String.fromCharCode(8201)), width / 2, height / 2 + 120);
  },
  starting: function(ctx) {
    // TODO
  },
  gameover: function(ctx, score) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,.65)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '12px/19px Verdana, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER'.split("").join(String.fromCharCode(8201)), width / 2, height / 2);

    ctx.font = '12px/19px Verdana, sans-serif';

    var years = (Math.round(score * 1000) + '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    ctx.fillText('EVOLUTION PERIOD: '.split("").join(String.fromCharCode(8201)) + years + ' YEARS', width / 2, height / 2 + 120);

    ctx.font = '12px/19px Verdana, sans-serif';
    ctx.fillText('PRESS [R] TO PLAY AGAIN'.split("").join(String.fromCharCode(8201)), width / 2, height / 2 + 160);
  }
};
