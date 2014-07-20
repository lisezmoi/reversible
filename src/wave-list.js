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
        wave.size.x += wave.invert? -2 : 2;
        wave.size.y += wave.invert? -2 : 2;
        if (wave.size.length() > canvWidth / 2) {
          wave.destroy();
        }
        // remove waves
        if (wave.toBeRemoved) this.waves.splice(i, 1);
      }
    },
    draw: function(ctx, colors) {
      for (var i = 0, len = this.waves.length; i < len; i++) {
        this.waves[i].draw(ctx, colors);
      }
    }
  };
};
