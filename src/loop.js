var raf = require('raf');

module.exports = function loop(fps, callback, debug) {
  var rafid = null;
  var lastrender = null;

  function main() {
    var now = Date.now();

    // Request the next anim frame
    rafid = raf(main);

    // Max fps
    if (lastrender && now - lastrender < 1000 / fps) return;

    callback(now);

    // Save the last rendering time (lock the max. framerate)
    lastrender = now;
  }

  return {
    start: main,
    stop: function() {
      raf.cancel(rafid);
      lastrender = null;
    }
  };
};
