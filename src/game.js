var Victor = require('victor');
var makeCharacter = require('./character');
var makeWave = require('./wave');
var makeWaveList = require('./wave-list');
var makeNutrimentManager = require('./nutriment-manager');
var filters = require('./filters');
var animate = require('animate');

var GAME_FPS = 60;
var GAME_UPATE = 50;
var CANV_WIDTH = 600;
var CANV_HEIGHT = 600;
var KEY_UP = 38;
var KEY_DOWN = 40;
var COLORS = ['rgb(200,255,0)', 'rgb(250,90,100)'];

function start(ctx, drawNoise, cb) {
  var characterPosition = new Victor(CANV_WIDTH / 2, CANV_HEIGHT / 2);
  var character = makeCharacter(characterPosition, 40, 40, COLORS);
  var waves = [];
  var waveList = makeWaveList();
  var nutrimentManager = makeNutrimentManager(CANV_WIDTH, CANV_HEIGHT, character);
  var updatedDrawn = false;
  var addWave = false;
  var reverseCharacter = false;

  var fpsmeter = null;
  if (window.DEBUG && window.FPSMeter) {
    fpsmeter = new window.FPSMeter({
      theme: 'light',
      heat: 1,
      graph: 1,
      history: 20
    });
  }

  function update() {
    var now = Date.now();

    if (addWave) {
      waveList.add(makeWave(character.position.clone(),
                            character.totalSize().clone(), character.color));
      addWave = false;
    }

    if (reverseCharacter) {
      character.reverse();
      reverseCharacter = false;
    }

    waveList.update(function(wave, remove) {
      wave.size.x += 2;
      wave.size.y += 2;
      if (wave.size.x > CANV_WIDTH / 2 ||
          wave.size.y > CANV_HEIGHT / 2) {
        wave.destroy();
      }
    });
    nutrimentManager.tick(now, character);
    updatedDrawn = false;
    setTimeout(update, GAME_UPATE);
  }
  setTimeout(update, GAME_UPATE);

  function draw() {
    ctx.clearRect(0, 0, CANV_WIDTH, CANV_HEIGHT);
    character.draw(ctx, COLORS);
    waveList.draw(ctx, COLORS);
    nutrimentManager.draw(ctx, COLORS);
    if (!window.DEBUG) drawNoise(ctx);
  }

  var drawloop = animate(function loop() {
    if (fpsmeter) fpsmeter.tickStart();

    if (!updatedDrawn) {
      draw();
      updatedDrawn = true;
    }

    if (fpsmeter) fpsmeter.tick();
  }, GAME_FPS);

  document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case KEY_UP:
        addWave = true;
        break;
      case KEY_DOWN:
        reverseCharacter = true;
        break;
    }
  });

  cb();
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
    start: function(cb) {
      filters.prepareNoise(function(drawNoise) {
        start(ctx, drawNoise, cb);
      });
    }
  };
};
