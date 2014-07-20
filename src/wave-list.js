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
    update: function(cb) {
      for (var i = 0, len = this.waves.length; i < len; i++) {
        cb(this.waves[i]);
      }

      // Remove destroyed waves
      var wavesCopy = this.waves.slice();
      var waveIndex = null;
      for (var i = 0, len = wavesCopy.length; i < len; i++) {
        if (wavesCopy[i].toBeRemoved) {
          waveIndex = this.waves.indexOf(wavesCopy[i]);
          if (waveIndex > -1) this.waves.splice(waveIndex, 1);
        }
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
