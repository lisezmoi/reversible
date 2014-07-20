var makeNutriment = require('./nutriment');
var Victor = require('victor');
var utils = require('./utils');

function nutrimentPosition(nutrimentSize, canvWidth, canvHeight) {
  var halfW = nutrimentSize.x / 2;
  var halfH = nutrimentSize.y / 2;
  var x = utils.getRandomInt( - canvWidth / 2 + halfW, canvWidth/2 - halfW);
  var y = utils.getRandomInt( - canvHeight / 2 + halfH, canvHeight/2 - halfH);
  var center = new Victor(canvWidth / 2, canvHeight / 2);
  var directionFromCenter = new Victor(x, y).normalize();
  return center.add(
    directionFromCenter.clone().multiply(canvWidth / 2 - halfW), true);
}

function nutrimentSize() {
  return new Victor(10, 10);
}

module.exports = function makeNutrimentManager(canvWidth, canvHeight, character) {
  var nutriments = [];
  var lastpop = null;
  return {
    nutriments: nutriments,
    popDelay: 20,
    tick: function(ticks, character) {
      // update every existing nutriment
      var i = nutriments.length;
      while (i--) {
        nutriments[i].tick(character);

        // Remove destroyed nutriments
        if (nutriments[i].toBeRemoved) {
          nutriments.splice(i, 1);
        }
      }

      if (lastpop !== null && ticks - lastpop < this.popDelay) return;
      // if (utils.getRandomInt(0, 10)) return;
      if (nutriments.length > 100) return;

      lastpop = ticks;

      // create a new nutriment
      var nsize = nutrimentSize();
      nutriments.push(makeNutriment(
        nutrimentPosition(nsize, canvWidth, canvHeight),
        nsize, utils.getRandomInt(0, 2)
      ));
    },
    draw: function(ctx, colors) {
      for (var i = 0, len = nutriments.length; i < len; i++) {
        nutriments[i].draw(ctx, colors);
      }
    }
  };
};
