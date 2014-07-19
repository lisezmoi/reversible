var noiseImages = null;
var noiseSources = [
  './gfx/img/noise1.png',
  './gfx/img/noise2.png',
  './gfx/img/noise3.png'
];
var noiseDrawn = 0;

function drawNextNoise(ctx) {
  noiseDrawn += 1;
  if (noiseDrawn > noiseSources.length - 1) {
    noiseDrawn = 0;
  }
  var image = noiseImages[noiseSources[noiseDrawn]];
  ctx.drawImage(image, 0, 0, 800, 600);
}

function makeSomeNoise(ctx) {
  if (!noiseImages) {
    loadImages(noiseSources, function(images) {
      noiseImages = images;
      drawNextNoise(ctx);
    });
    return;
  }
  drawNextNoise(ctx);
}

// loadImages
function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  for (var i = 0, len = sources.length, src; i < len; i++) {
    src = sources[i];
    images[src] = new Image();
    images[src].onload = function() {
      if (++loadedImages >= sources.length) {
        callback(images);
      }
    };
    images[src].src = src;
  }
}

// setLinePoints

function setLinePoints(iterations) {
  var pointList = {};
  pointList.first = {x:0, y:1};
  var lastPoint = {x:1, y:1};
  var minY = 1;
  var maxY = 1;
  var point;
  var nextPoint;
  var dx, newX, newY;

  pointList.first.next = lastPoint;
  for (var i = 0; i < iterations; i++) {
    point = pointList.first;
    while (point.next != null) {
      nextPoint = point.next;

      dx = nextPoint.x - point.x;
      newX = 0.5*(point.x + nextPoint.x);
      newY = 0.5*(point.y + nextPoint.y);
      newY += dx*(Math.random()*2 - 1);

      var newPoint = {x:newX, y:newY};

      //min, max
      if (newY < minY) {
        minY = newY;
      }
      else if (newY > maxY) {
        maxY = newY;
      }

      //put between points
      newPoint.next = nextPoint;
      point.next = newPoint;

      point = nextPoint;
    }
  }

  //normalize to values between 0 and 1
  if (maxY != minY) {
    var normalizeRate = 1/(maxY - minY);
    point = pointList.first;
    while (point != null) {
      point.y = normalizeRate*(point.y - minY);
      point = point.next;
    }
  }
  //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
  else {
    point = pointList.first;
    while (point != null) {
      point.y = 1;
      point = point.next;
    }
  }

  return pointList;
}


// drawCircle

function drawCircle(centerX, centerY, minRad, maxRad, phase, color, ctx) {
  var point;
  var rad, theta;
  var twoPi = 2*Math.PI;
  var x0,y0;

  //generate the random function that will be used to vary the radius, 9 iterations of subdivision
  var pointList = setLinePoints(9);

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.01;
  ctx.fillStyle = color;
  ctx.beginPath();
  point = pointList.first;
  theta = phase;
  rad = minRad + point.y*(maxRad - minRad);
  x0 = centerX + rad*Math.cos(theta);
  y0 = centerY + rad*Math.sin(theta);
  ctx.lineTo(x0, y0);
  while (point.next != null) {
    point = point.next;
    theta = twoPi*point.x + phase;
    rad = minRad + point.y*(maxRad - minRad);
    x0 = centerX + rad*Math.cos(theta);
    y0 = centerY + rad*Math.sin(theta);
    ctx.lineTo(x0, y0);
  }
  ctx.stroke();
  ctx.fill();
}

module.exports = {
  drawCircle: drawCircle,
  makeSomeNoise: makeSomeNoise
};
