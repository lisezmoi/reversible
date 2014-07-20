module.exports = {
  pause: function(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,.65)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '60px/100px Verdana, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME PAUSED', width / 2, height / 2 - 20);

    ctx.font = '20px/60px Verdana, sans-serif';
    ctx.fillText('PRESS [P] TO RESUME', width / 2, height / 2 + 60);
  },
  starting: function(ctx) {
    // TODO
  },
  gameover: function(ctx, score) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,.65)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '60px/100px Verdana, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', width / 2, height / 2 - 20);

    ctx.font = '20px/60px Verdana, sans-serif';

    var years = (Math.round(score * 1000) + '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    ctx.fillText('EVOLUTION PERIOD: ' + years + ' YEARS', width / 2, height / 2 + 60);

    ctx.font = '20px/60px Verdana, sans-serif';
    ctx.fillText('PRESS [R] TO PLAY AGAIN', width / 2, height / 2 + 180);
  }
};
