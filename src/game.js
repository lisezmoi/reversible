var Victor = require('victor');
var makeCharacter = require('./character');
var makeWave = require('./wave');
var makeWaveList = require('./wave-list');
var loop = require('./loop');

var GAME_FPS = 30;
var CANV_WIDTH = 800;
var CANV_HEIGHT = 600;
var KEY_UP = 38;
var KEY_DOWN = 40;

function start(ctx) {
  var characterPosition = new Victor(CANV_WIDTH / 2, CANV_HEIGHT / 2);
  var character = makeCharacter(characterPosition, 40, 40);
  var waves = [];
  var waveList = makeWaveList();

  function draw() {
    ctx.clearRect(0, 0, CANV_WIDTH, CANV_HEIGHT);
    character.draw(ctx);
    waveList.draw(ctx);
  }

  function update(time) {
    waveList.update(function(wave, remove) {
      wave.size.x += 2;
      wave.size.y += 2;
      if (wave.size.x > CANV_WIDTH / 2 ||
          wave.size.y > CANV_HEIGHT / 2) {
        wave.destroy();
      }
    });
  }

  var lastUpdate = null;
  var updatedDrawn = false;
  var gameloop = loop(GAME_FPS, function loop(time) {
    if (!lastUpdate || time - lastUpdate > 30) {
      update();
      lastUpdate = time;
      updatedDrawn = false;
    }
    if (!updatedDrawn) {
      draw();
      updatedDrawn = true;
    }
  });

  function addWave() {
    waveList.add(makeWave(character.position.clone(),
                          character.totalSize().clone(), character.getColor()));
  }

  document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case KEY_UP:
        addWave();
        break;
      case KEY_DOWN:
        character.reverse();
        break;
    }
  });

  gameloop.start();
}

function getCanvas(container) {
  var canvas = document.createElement('canvas');
  canvas.width = CANV_WIDTH;
  canvas.height = CANV_HEIGHT;
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
