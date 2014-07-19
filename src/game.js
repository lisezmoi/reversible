function start(ctx) {
}

function getCanvas(container) {
  var canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  container.appendChild(canvas);
  return canvas;
}

module.exports = function game(container) {
  var canvas = getCanvas(container);
  var ctx = canvas.getContext('2d');
  return {
    start: function() {
      start(ctx);
    }
  };
};
