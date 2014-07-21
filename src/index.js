var game = require('./game');
var ui = require('./ui');
var makeGame = require('./game');
var container = document.querySelector('main');

var game = makeGame(container);

game.start(function(gameStatus) {
  container.classList.add('ready');

  // gameStatus.resume();

  ui(function uiUpdate(boxDisplayed) {
    gameStatus.externalPause = boxDisplayed;
    if (boxDisplayed) gameStatus.pause();
    else if (!gameStatus.pausedScreen) gameStatus.resume();
  });

});
