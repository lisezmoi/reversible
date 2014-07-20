var Victor = require('victor');
var makeCharacter = require('./character');
var makeWave = require('./wave');
var makeWaveList = require('./wave-list');
var makeNutrimentManager = require('./nutriment-manager');
var screens = require('./screens');
var filters = require('./filters');
var animate = require('animate');

var GAME_FPS = 60;
var GAME_UPATE = 50;
var CANV_WIDTH = 600;
var CANV_HEIGHT = 600;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_SPACE = 32;
var COLORS = ['rgb(200,255,0)', 'rgb(250,90,100)'];

function start(ctx, drawNoise) {
  var characterPosition = new Victor(CANV_WIDTH / 2, CANV_HEIGHT / 2);
  var character = makeCharacter(characterPosition, 25, 25, COLORS);
  var waveList = makeWaveList();
  var nutrimentManager = makeNutrimentManager(CANV_WIDTH, CANV_HEIGHT, character);
  var updatedDrawn = false;
  var addWave = false;
  var reverseCharacter = false;
  var updateTimeoutId = null;

  var fpsmeter = null;
  if (window.DEBUG && window.FPSMeter) {
    fpsmeter = new window.FPSMeter({
      theme: 'light',
      heat: 1,
      graph: 1,
      history: 20
    });
  }

  function collisions() {
    var nutriments = nutrimentManager.nutriments;

    // nutriments
    for (var i = 0, len = nutriments.length; i < len; i++) {

      // nutriments <> character
      var distance = character.position.clone().subtract(nutriments[i].position);
      var characterSize = character.totalSize().length();
      var nutrimentSize = nutriments[i].size.length() - 1;
      var distanceLen = distance.length();
      if (distanceLen < characterSize + nutrimentSize) {
        character.touch(nutriments[i]);
        nutriments[i].destroy();
      }

      // nutriments <> waves
      if (nutriments[i].charged) continue;
      for (var j = 0, len2 = waveList.waves.length; j < len2; j++) {
        if (waveList.waves[j].size.length() > distanceLen - nutrimentSize) {
          if (waveList.waves[j].color !== nutriments[i].color) {
            nutriments[i].invertColor();
          } else {
            nutriments[i].charged = true;
          }
          waveList.waves[j].destroy();
        }
      }
    }
  }

  var ticks = 0;
  function update() {
    var now = Date.now();

    ticks++;

    if (addWave) {
      waveList.add(makeWave(character.position.clone(),
                            character.totalSize().clone(), character.color));
      addWave = false;
    }

    if (reverseCharacter) {
      character.reverse();
      reverseCharacter = false;
    }

    var characterDiff = new Victor(1, 1).normalize().multiply(0.05);
    character.unbalance(characterDiff);

    waveList.tick(ticks, character, CANV_WIDTH, CANV_HEIGHT);
    nutrimentManager.tick(ticks, character);
    updatedDrawn = false;

    collisions();

    if (character.sizes[0].x < 0 || character.sizes[1].x < 0) {
      draw();
      gameStatus.gameover = true;
      gameStatus.pause();
    }

    if (!gameStatus.paused) updateTimeoutId = setTimeout(update, GAME_UPATE);
  }

  function draw() {
    ctx.clearRect(0, 0, CANV_WIDTH, CANV_HEIGHT);
    character.draw(ctx, COLORS);
    waveList.draw(ctx, COLORS);
    nutrimentManager.draw(ctx, COLORS);
    if (gameStatus.pausedScreen) screens.pause(ctx);
    if (gameStatus.gameover) screens.gameover(ctx);
    if (!window.DEBUG) drawNoise(ctx);
  }

  var drawloop = animate(function loop() {
    if (fpsmeter) fpsmeter.tickStart();

    if (!updatedDrawn || gameStatus.paused) {
      draw();
      updatedDrawn = true;
    }

    if (fpsmeter) fpsmeter.tick();
  }, GAME_FPS);

  var gameStatus = {
    gameover: false,
    paused: true,
    pausedScreen: false,
    pause: function(displayPausedScreen) {
      this.paused = true;
      this.pausedScreen = this.pausedScreen || displayPausedScreen;
      clearTimeout(updateTimeoutId);
    },
    resume: function() {
      this.paused = false;
      this.pausedScreen = false;
      clearTimeout(updateTimeoutId);
      updateTimeoutId = setTimeout(update, GAME_UPATE);
    }
  };

  window.onblur = function() {
    if (window.DEBUG) return;
    if (!gameStatus.paused) gameStatus.pause(true);
    draw();
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'p' && !gameStatus.externalPause
                      && (!gameStatus.paused ||
                          (gameStatus.paused && gameStatus.pausedScreen))) {
      gameStatus[gameStatus.paused? 'resume' : 'pause'](true);
    }
    if (gameStatus.paused) return;
    switch (e.keyCode) {
      case KEY_UP:
      case KEY_RIGHT:
      case KEY_SPACE:
        addWave = true;
        break;
      case KEY_DOWN:
      case KEY_LEFT:
        reverseCharacter = true;
        break;
    }
  });

  return gameStatus;
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
        cb(start(ctx, drawNoise));
      });
    }
  };
};
