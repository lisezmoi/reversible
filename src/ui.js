onclick=".pause()";

var playBtn = document.querySelector('.play');
var pauseBtn = document.querySelector('.pause');
var player = document.getElementById('player');

playBtn.onclick = function() {
  player.play();
  this.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
};
pauseBtn.onclick = function() {
  player.pause();
  this.classList.add('hidden');
  playBtn.classList.remove('hidden');
};

module.exports = function init(cb) {

  var aboutBox = document.querySelector('.about-box');
  var controlsBox = document.querySelector('.controls-box');
  var aboutBtn = document.querySelector('#about');
  var controlsBtn = document.querySelector('#controls');
  var startBox = document.querySelector('.start-box');

  startBox.classList.add('opened');
  startBox.onclick = function() {
    controlsBox.classList.remove('opened');
    aboutBox.classList.remove('opened');
    startBox.classList.remove('opened');
    player.play();
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    cb(false);
  };

  aboutBox.onclick = controlsBox.onclick = function() {
    about.classList.remove('opened');
    controlsBox.classList.remove('opened');
    cb(false);
  };

  aboutBtn.onclick = function() {
    var opened = aboutBox.classList.toggle('opened');
    controlsBox.classList.remove('opened');
    cb(opened || startBox.classList.contains('opened'));
  };

  controlsBtn.onclick = function() {
    var opened = controlsBox.classList.toggle('opened');
    aboutBox.classList.remove('opened');
    cb(opened || startBox.classList.contains('opened'));
  };
};
