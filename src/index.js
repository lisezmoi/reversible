
var game = require('./game');
var ui = require('./ui');
var makeGame = require('./game');
var container = document.querySelector('main');

var game = makeGame(container);

game.start(function() {
  container.classList.add('ready');
});
