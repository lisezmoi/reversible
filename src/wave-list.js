function getWavesByColor(waves) {
  var wavesByColor = {};
  for (var i = 0, len = waves.length, wave; i < len; i++) {
    wave = waves[i];
    if (!wavesByColor[wave.color]) wavesByColor[wave.color] = [];
    wavesByColor[wave.color].push(wave);
  }
  return wavesByColor;
}

module.exports = function makeWaveList() {
  return {
    wavesToRemove: [],
    waves: [],
    add: function(wave) {
      this.waves.push(wave);
    },
    tick: function(ticks, character, canvWidth, canvHeight) {
      var i = this.waves.length;
      var wave = null;
      while (i--) {
        wave = this.waves[i];
        wave.size.x += 2;
        wave.size.y += 2;
        if (wave.size.length() > canvWidth / 2) {
          wave.destroy();
        }
        // remove waves
        if (wave.toBeRemoved) this.waves.splice(i, 1);
      }
    },
    draw: function(ctx, colors) {
      var waves = getWavesByColor(this.waves);
      var canvWidth = ctx.canvas.width;
      var canvHeight = ctx.canvas.height;

      for (var color in waves) {
        ctx.strokeStyle = colors[color];
        for (var i = 0, len = waves[color].length, wave; i < len; i++) {
          waves[color][i].draw(ctx);
        }
      }
    }
  };
};
