(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var raf = require('raf-component')

var Animate = function(frame, fps) {
  if (!(this instanceof Animate)) {
    return new Animate(frame, fps)
  }

  this.id = null
  this.now = null
  this.then = +new Date
  this.delta = null
  this.frame = frame
  this.interval = 1000 / fps
  this.start = this.start.bind(this)

  this.start()
}

Animate.prototype.pause = function() {
  raf.cancel(this.id)
  this.id = null  
  return this
}

Animate.prototype.resume = function() {
  if (this.id == null) {
    this.start()
  }

  return this
}

Animate.prototype.start = function() {
  this.id = raf(this.start)

  this.now = +new Date
  this.delta = this.now - this.then

  if (this.delta < this.interval) {
    return
  }

  this.frame()
  this.then = this.now - (this.delta % this.interval)
}

module.exports = Animate

},{"raf-component":2}],2:[function(require,module,exports){
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.oCancelAnimationFrame
  || window.msCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

},{}],3:[function(require,module,exports){
exports = module.exports = Victor;

/**
 * # Victor - A JavaScript 2D vector class with methods for common vector operations
 */

/**
 * Constructor. Will also work without the `new` keyword
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = Victor(42, 1337);
 *
 * @param {Number} x Value of the x axis
 * @param {Number} y Value of the y axis
 * @return {Victor}
 * @api public
 */
function Victor (x, y) {
	if (!(this instanceof Victor)) {
		return new Victor(x, y);
	}

	/**
	 * The X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.x;
	 *     // => 42
	 *
	 * @api public
	 */
	this.x = x || 0;

	/**
	 * The Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.y;
	 *     // => 21
	 *
	 * @api public
	 */
	this.y = y || 0;
};

/**
 * # Static
 */

/**
 * Creates a new instance from an array
 *
 * ### Examples:
 *     var vec = Victor.fromArray([42, 21]);
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromArray
 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromArray = function (arr) {
	return new Victor(arr[0] || 0, arr[1] || 0);
};

/**
 * Creates a new instance from an object
 *
 * ### Examples:
 *     var vec = Victor.fromObject({ x: 42, y: 21 });
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromObject
 * @param {Object} obj Object with the values for x and y
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromObject = function (obj) {
	return new Victor(obj.x || 0, obj.y || 0);
};

Victor.add = function (vecA, vecB) {
	return new Victor(vecA.x + vecB.x, vecA.y + vecB.y);
};

Victor.subtract = function (vecA, vecB) {
	return new Victor(vecA.x - vecB.x, vecA.y - vecB.y);
};

Victor.multiply = function (vec, scalar) {
	return new Victor(vec.x * scalar, vec.y * scalar);
};

Victor.divide = function (vec, scalar) {
	return new Victor(vec.x / scalar, vec.y / scalar);
};

Victor.mix = function (vecA, vecB, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	var x = (1 - amount) * vecA.x + amount * vecB.x;
	var y = (1 - amount) * vecA.y + amount * vecB.y;
	return new Victor(x, y);
};

Victor.random = function (maxX, maxY) {
	var x = Math.floor(Math.random() * maxX),
		y = Math.floor(Math.random() * maxY);

	return new Victor(x, y);
};

/**
 * # Manipulation
 *
 * These functions are chainable.
 */

/**
 * Adds another vector's X axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addX(vec2);
 *     vec1.toString();
 *     // => x:30, y:10
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addX = function (vec) {
	this.x += vec.x;
	return this;
};

/**
 * Adds another vector's Y axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addY(vec2);
 *     vec1.toString();
 *     // => x:10, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addY = function (vec) {
	this.y += vec.y;
	return this;
};

/**
 * Adds another vector to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.add(vec2);
 *     vec1.toString();
 *     // => x:30, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.add = function (vec) {
	this.addX(vec);
	this.addY(vec);
	return this;
};

/**
 * Subtracts the X axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractX(vec2);
 *     vec1.toString();
 *     // => x:80, y:50
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractX = function (vec) {
	this.x -= vec.x;
	return this;
};

/**
 * Subtracts the Y axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractY(vec2);
 *     vec1.toString();
 *     // => x:100, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractY = function (vec) {
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtract(vec2);
 *     vec1.toString();
 *     // => x:80, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtract = function (vec) {
	this.subtractX(vec);
	this.subtractY(vec);
	return this;
};

/**
 * Divides the X axis by a number
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideX(2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Number} number The number to divide the axis by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideX = function (scalar) {
	this.x /= scalar;
	return this;
};

/**
 * Divides the Y axis by a number
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideY(2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Number} number The number to divide the axis by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideY = function (scalar) {
	this.y /= scalar;
	return this;
};

/**
 * Divides both vector axis by a number
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divide(2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Number} number The number to divide the axis by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divide = function (scalar) {
	this.divideX(scalar);
	this.divideY(scalar);
	return this;
};

/**
 * Inverts the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertX();
 *     vec.toString();
 *     // => x:-100, y:50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertX = function () {
	this.x *= -1;
	return this;
};

/**
 * Inverts the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertY();
 *     vec.toString();
 *     // => x:100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertY = function () {
	this.y *= -1;
	return this;
};

/**
 * Inverts both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invert();
 *     vec.toString();
 *     // => x:-100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invert = function () {
	this.invertX();
	this.invertY();
	return this;
};

/**
 * Multiplies the X axis by a number
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyX(2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Number} number The number to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyX = function (scalar) {
	this.x *= scalar;
	return this;
};

/**
 * Multiplies the Y axis by a number
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyY(2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Number} number The number to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyY = function (scalar) {
	this.y *= scalar;
	return this;
};

/**
 * Multiplies both vector axis by a number
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiply(2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Number} number The number to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiply = function (scalar) {
	this.multiplyX(scalar);
	this.multiplyY(scalar);
	return this;
};

/**
 * Normalize
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.normalize = function () {
	var length = this.length();

	if (length === 0) {
		this.x = 1;
		this.y = 0;
	} else {
		this.divide(length);
	}
	return this;
};

Victor.prototype.norm = Victor.prototype.normalize;

/**
 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.limit(80, 0.9);
 *     vec.toString();
 *     // => x:90, y:50
 *
 * @param {Number} max The maximum value for both x and y axis
 * @param {Number} factor Factor by which the axis are to be multiplied with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.limit = function (max, factor) {
	if (Math.abs(this.x) > max){ this.x *= factor; }
	if (Math.abs(this.y) > max){ this.y *= factor; }
	return this;
};

/**
 * Randomizes both vector axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:67, y:73
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomize = function (topLeft, bottomRight) {
	this.randomizeX(topLeft, bottomRight);
	this.randomizeY(topLeft, bottomRight);

	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:55, y:50
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeX = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.x, bottomRight.x);
	var max = Math.max(topLeft.x, bottomRight.x);
	this.x = random(min, max);
	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:100, y:66
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeY = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.y, bottomRight.y);
	var max = Math.max(topLeft.y, bottomRight.y);
	this.y = random(min, max);
	return this;
};

/**
 * Randomly randomizes either axis between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
 *     vec.toString();
 *     // => x:100, y:77
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
	if (!! Math.round(Math.random())) {
		this.randomizeX(topLeft, bottomRight);
	} else {
		this.randomizeY(topLeft, bottomRight);
	}
	return this;
};

/**
 * Rounds both axis to an integer value
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.unfloat = function () {
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
	return this;
};

/**
 * Performs a linear blend / interpolation of the X axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixX(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:100
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixX = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.x = (1 - amount) * this.x + amount * vec.x;
	return this;
};

/**
 * Performs a linear blend / interpolation of the Y axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixY(vec2, 0.5);
 *     vec.toString();
 *     // => x:100, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixY = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.y = (1 - amount) * this.y + amount * vec.y;
	return this;
};

/**
 * Performs a linear blend / interpolation towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mix(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mix = function (vec, amount) {
	this.mixX(vec, amount);
	this.mixY(vec, amount);
	return this;
};

/**
 * # Products
 */

/**
 * Creates a clone of this vector
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = vec1.clone();
 *
 *     vec2.toString();
 *     // => x:10, y:10
 *
 * @return {Victor} A clone of the vector
 * @api public
 */
Victor.prototype.clone = function () {
	return new Victor(this.x, this.y);
};

/**
 * Copies another vector's X component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyX(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:10
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyX = function (vec) {
	this.x = vec.x;
	return this;
};

/**
 * Copies another vector's Y component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyY(vec1);
 *
 *     vec2.toString();
 *     // => x:10, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyY = function (vec) {
	this.y = vec.y;
	return this;
};

/**
 * Copies another vector's X and Y components in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copy(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copy = function (vec) {
	this.copyX(vec);
	this.copyY(vec);
	return this;
};

/**
 * Calculates the dot product of this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.dot(vec2);
 *     // => 23000
 *
 * @param {Victor} vector The second vector
 * @return {Number} Dot product
 * @api public
 */
Victor.prototype.dot = function (vec2) {
	return this.x * vec2.x + this.y * vec2.y;
};

Victor.prototype.horizontalAngle = function () {
	return Math.atan2(this.y, this.x);
};

Victor.prototype.horizontalAngleDeg = function () {
	return radian2degrees(this.horizontalAngle());
};

Victor.prototype.verticalAngle = function () {
	return Math.atan2(this.x, this.y);
};

Victor.prototype.verticalAngleDeg = function () {
	return radian2degrees(this.verticalAngle());
};

Victor.prototype.angle = Victor.prototype.horizontalAngle;
Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
Victor.prototype.direction = Victor.prototype.horizontalAngle;

Victor.prototype.rotate = function (angle) {
	var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
	var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

	this.x = nx;
	this.y = ny;
};

Victor.prototype.rotateDeg = function (angle) {
	angle = degrees2radian(angle);
	this.rotate(angle);
};

Victor.prototype.rotateBy = function (rotation) {
	var angle = this.angle() + rotation;

	this.rotate(angle);
};

Victor.prototype.rotateByDeg = function (rotation) {
	rotation = degrees2radian(rotation);
	this.rotateBy(rotation);
};

/**
 * Calculates the distance of the X axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceX(vec2);
 *     // => -100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceX = function (vec) {
	return this.x - vec.x;
};

/**
 * Same as `distanceX()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.absDistanceX(vec2);
 *     // => 100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceX = function (vec) {
	return Math.abs(this.distanceX(vec));
};

/**
 * Calculates the distance of the Y axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => -10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceY = function (vec) {
	return this.y - vec.y;
};

/**
 * Same as `distanceY()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => 10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceY = function (vec) {
	return Math.abs(this.distanceY(vec));
};

/**
 * Calculates the euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distance(vec2);
 *     // => 100.4987562112089
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distance = function (vec) {
	return Math.sqrt(this.distanceSq(vec));
};

/**
 * Calculates the squared euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceSq(vec2);
 *     // => 10100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceSq = function (vec) {
	var dx = this.distanceX(vec),
		dy = this.distanceY(vec);

	return dx * dx + dy * dy;
};

/**
 * Calculates the length or magnitude of the vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.length();
 *     // => 111.80339887498948
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.length = function () {
	return Math.sqrt(this.lengthSq());
};

/**
 * Squared length / magnitude
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.lengthSq();
 *     // => 12500
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.lengthSq = function () {
	return this.x * this.x + this.y * this.y;
};

Victor.prototype.magnitude = Victor.prototype.length;

/**
 * # Utility Methods
 */

/**
 * Returns an string representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toString();
 *     // => x:10, y:20
 *
 * @return {String}
 * @api public
 */
Victor.prototype.toString = function () {
	return 'x:' + this.x + ', y:' + this.y;
};

/**
 * Returns an array representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toArray();
 *     // => [10, 20]
 *
 * @return {Array}
 * @api public
 */
Victor.prototype.toArray = function () {
	return [ this.x, this.y ];
};

/**
 * Returns an object representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toObject();
 *     // => { x: 10, y: 20 }
 *
 * @return {Object}
 * @api public
 */
Victor.prototype.toObject = function () {
	return { x: this.x, y: this.y };
};


var degrees = 180 / Math.PI;

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function radian2degrees (rad) {
	return rad * degrees;
}

function degrees2radian (deg) {
	return deg / degrees;
}

},{}],4:[function(require,module,exports){
var Victor = require('victor');

var Character = {
  draw: function(ctx, colors) {
    var canvWidth = ctx.canvas.width;
    var canvHeight = ctx.canvas.height;

    var width1 = this.sizes[this.color].length() +
                 this.sizes[this.inactiveColor()].length();
    var width2 = this.sizes[this.inactiveColor()].length();

    ctx.beginPath();
    ctx.fillStyle = colors[this.color];
    ctx.arc(this.position.x, this.position.y, width1, 0, 2 * Math.PI);

    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = colors[this.inactiveColor()];
    ctx.arc(this.position.x, this.position.y, width2, 0, 2 * Math.PI);
    ctx.fill();
  },
  totalSize: function() {
    return this.sizes[0].clone().add(this.sizes[1]);
  },
  inactiveColor: function() {
    return this.color === 0? 1 : 0;
  },
  sizeByWeakness: function() {
    return this.sizes.sort(function(sizeA, sizeB) {
      var aLen = sizeA.length();
      var bLen = sizeB.length();
      return Math.max(aLen, bLen) === bLen? -1 : 1;
    });
  },
  reverse: function() {
    this.color = this.inactiveColor();
  },
  balance: function(sizeDiff) {
    var sizesByWeakness = this.sizeByWeakness();

    sizesByWeakness[0].add(sizeDiff);
    sizesByWeakness[1].subtract(sizeDiff);

    var len2 = sizesByWeakness[0].length();
    var len1 = sizesByWeakness[1].length();

    if (len2 > len1) {
      this.sizes = [
        this.defaultSizes[0].clone(),
        this.defaultSizes[1].clone()
      ];
    }
  },
  unbalance: function(sizeDiff) {
    var sizesByWeakness = this.sizeByWeakness();
    sizesByWeakness[1].add(sizeDiff);
    sizesByWeakness[0].subtract(sizeDiff);
  },
  touch: function(nutriment) {
    if (nutriment.dead) return;
    var growBy = new Victor(1, 1).normalize();
    growBy.multiply(nutriment.charged? 4 : 1);
    var points = 0;
    var colorMatch = this.color === nutriment.color;
    if (colorMatch) {
      points += nutriment.charged? 4 : 1;
      this.balance(growBy);
    } else {
      this.unbalance(growBy);
    }
    return points;
  }
};

module.exports = function(position, size1, size2, colors) {
  var character = Object.create(Character);

  character.defaultSizes = [
    new Victor(size1, size1),
    new Victor(size2, size2)
  ];
  character.sizes = [
    character.defaultSizes[0].clone(),
    character.defaultSizes[1].clone()
  ];
  character.color = 0;

  character.position = position;
  return character;
};

},{"victor":3}],5:[function(require,module,exports){
var noiseImages = null;
var noiseSources = [
  './gfx/img/noise1.png',
  './gfx/img/noise2.png',
  './gfx/img/noise3.png',
  './gfx/img/noise4.png',
  './gfx/img/noise5.png'
];
var noiseDrawn = 0;

// Load noise images, and pass a draw(ctx) function to the callback
var lastNoiseChange = null;
function prepareNoise(cb) {
  loadImages(noiseSources, function(images) {
    noiseImages = images;
    cb(function(ctx) {

      var now = Date.now();
      if (!lastNoiseChange || now - lastNoiseChange > 50) {
        noiseDrawn += 1;
        if (noiseDrawn >= noiseSources.length - 1) {
          noiseDrawn = 0;
        }
        lastNoiseChange = now;
      }

      ctx.drawImage(noiseImages[noiseSources[noiseDrawn]], 0, 0,
                    ctx.canvas.width, ctx.canvas.height);
    });
  });
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
  prepareNoise: prepareNoise
};

},{}],6:[function(require,module,exports){
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
var NUTRIMENTS_ACCELERATION = 0.0005;
var NUTRIMENTS_MIN_POP_DELAY_ACCELERATION = 0.005;
var NUTRIMENTS_POP_CHANCES_ACCELERATION = 0.005;
var SCORE_MULTIPLIER_ACCELERATION = 1.001;

function start(ctx, drawNoise) {
  var characterPosition = null;
  var character = null;
  var waveList = null;
  var nutrimentManager = null;
  var updatedDrawn = null;
  var addWave = null;
  var reverseCharacter = null;
  var updateTimeoutId = null;
  var ticks = null;
  var lastWaveAdded = null;
  var characterSizeDiff = null;
  var playerScore = null;
  var scoreMultiplier = null;

  var fpsmeter = null;
  if (window.DEBUG && window.FPSMeter) {
    fpsmeter = new window.FPSMeter({
      theme: 'light',
      heat: 1,
      graph: 1,
      history: 20
    });
  }

  function init() {
    characterPosition = new Victor(CANV_WIDTH / 2, CANV_HEIGHT / 2);
    character = makeCharacter(characterPosition, 25, 25, COLORS);
    waveList = makeWaveList();
    nutrimentManager = makeNutrimentManager(CANV_WIDTH, CANV_HEIGHT, character);
    nutrimentManager.nutrimentsSpeed = 1.5;
    updatedDrawn = false;
    addWave = false;
    reverseCharacter = false;
    updateTimeoutId = null;
    ticks = 0;
    lastWaveAdded = null;
    characterSizeDiff = new Victor(1, 1).normalize().multiply(0.04);
    playerScore = 0;
    scoreMultiplier = 1.001;
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
        playerScore += character.touch(nutriments[i]) * scoreMultiplier;
        nutriments[i].destroy();
      }

      if (nutriments[i].charged) continue;

      // waves
      for (var j = 0, len2 = waveList.waves.length, wave; j < len2; j++) {
        wave = waveList.waves[j];

        // waves <> character
        if (wave.invert && wave.size.length() < characterSize) {
          character.unbalance(new Victor(1, 1).normalize().multiply(2));
          wave.destroy();
        }

        if (wave.invert) continue;

        // nutriments <> waves
        if (wave.size.length() > distanceLen - nutrimentSize) {
          if (wave.active) {
            if (wave.color === nutriments[i].color) {
              nutriments[i].charged = true;
              wave.active = false;
            } else if (wave.color !== nutriments[i].color) {
              wave.invert = true;
            }
          } else if (wave.color === nutriments[i].color) {
            // nutriments[i].invertColor();
          }
        }
      }
    }
  }

  function update() {
    var now = Date.now();

    ticks++;

    if (reverseCharacter) {
      character.reverse();
      reverseCharacter = false;
    }

    if (addWave && (!lastWaveAdded || ticks - lastWaveAdded > 2)) {
      waveList.add(makeWave(character.position.clone(),
                            character.totalSize().clone(), character.color));
      addWave = false;
      lastWaveAdded = ticks;
    }

    character.unbalance(characterSizeDiff);

    waveList.tick(ticks, character, CANV_WIDTH, CANV_HEIGHT);
    nutrimentManager.tick(ticks, character);
    updatedDrawn = false;

    collisions();

    if (character.sizes[0].x < 0 || character.sizes[1].x < 0) {
      gameStatus.gameover = true;
      gameStatus.pause();
    }

    nutrimentManager.speed += NUTRIMENTS_ACCELERATION;
    nutrimentManager.minPopDelay -= NUTRIMENTS_MIN_POP_DELAY_ACCELERATION;
    nutrimentManager.popChances -= NUTRIMENTS_POP_CHANCES_ACCELERATION;

    scoreMultiplier *= SCORE_MULTIPLIER_ACCELERATION;

    if (!gameStatus.paused) updateTimeoutId = setTimeout(update, GAME_UPATE);
  }

  function draw() {
    ctx.clearRect(0, 0, CANV_WIDTH, CANV_HEIGHT);
    character.draw(ctx, COLORS);
    waveList.draw(ctx, COLORS);
    nutrimentManager.draw(ctx, COLORS);
    if (gameStatus.pausedScreen) screens.pause(ctx);
    if (gameStatus.gameover) screens.gameover(ctx, playerScore);
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
    },
    restart: function() {
      this.pause();
      this.gameover = false;
      this.paused = false;
      this.pausedScreen = false;
      init();
      this.resume();
    }
  };

  window.onblur = function() {
    if (window.DEBUG) return;
    if (!gameStatus.paused) gameStatus.pause(true);
    draw();
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'r' && (!gameStatus.paused || gameStatus.gameover)) {
      gameStatus.restart();
    }
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

  init();

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

},{"./character":4,"./filters":5,"./nutriment-manager":8,"./screens":10,"./wave":14,"./wave-list":13,"animate":1,"victor":3}],7:[function(require,module,exports){

var game = require('./game');
var ui = require('./ui');
var makeGame = require('./game');
var container = document.querySelector('main');

var game = makeGame(container);

game.start(function(gameStatus) {
  container.classList.add('ready');

  gameStatus.resume();

  ui(function(boxDisplayed) {
    gameStatus.externalPause = boxDisplayed;
    if (boxDisplayed) {
      gameStatus.pause();
    }
    else if (!gameStatus.pausedScreen) gameStatus.resume();
  });
});

},{"./game":6,"./ui":11}],8:[function(require,module,exports){
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
  return new Victor(7, 7);
}

module.exports = function makeNutrimentManager(canvWidth, canvHeight, character) {
  var nutriments = [];
  var lastpop = null;
  return {
    nutriments: nutriments,
    maxPopDelay: 0.5 * 20, // <seconds> * 20
    minPopDelay: 5 * 20, // <seconds> * 20
    popChances: 80,
    speed: 1,
    tick: function(ticks, character) {
      // update every existing nutriment
      var i = nutriments.length;
      while (i--) {
        nutriments[i].tick(character, this.speed);

        // Remove destroyed nutriments
        if (nutriments[i].toBeRemoved) {
          nutriments.splice(i, 1);
        }
      }

      if (lastpop !== null && ticks - lastpop < this.maxPopDelay) return;
      if (ticks - lastpop < this.minPopDelay &&
          utils.getRandomInt(0, this.popChances)) return;
      if (nutriments.length > 40) return;

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

},{"./nutriment":9,"./utils":12,"victor":3}],9:[function(require,module,exports){
var Victor = require('victor');

var Nutriment = {
  draw: function(ctx, colors) {
    var color = this.dead? 'grey' : colors[this.color];
    ctx[this.charged? 'fillStyle' : 'strokeStyle'] = color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size.x, 0, 2 * Math.PI);
    if (!this.charged) ctx.lineWidth = 2;
    ctx[this.charged? 'fill' : 'stroke']();
  },
  tick: function(character, speed) {
    var direction = Victor.subtract(character.position, this.position);
    direction.normalize().multiply(speed);
    this.position.add(direction);
  },
  invertColor: function() {
    this.color = this.color === 0? 1 : 0;
  },
  destroy: function() {
    this.toBeRemoved = true;
  }
};

module.exports = function(position, size, color) {
  var nutriment = Object.create(Nutriment);
  nutriment.charged = false;
  nutriment.dead = false;
  nutriment.position = position;
  nutriment.direction = new Victor(0, 0);
  nutriment.size = size;
  nutriment.color = color;
  return nutriment;
};

},{"victor":3}],10:[function(require,module,exports){
module.exports = {
  pause: function(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,.65)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '60px/100px Verdana, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME PAUSED', width / 2, height / 2 - 20);

    ctx.font = '20px/60px Verdana, sans-serif';
    ctx.fillText('PRESS [P] TO RESUME', width / 2, height / 2 + 60);
  },
  starting: function(ctx) {
    // TODO
  },
  gameover: function(ctx, score) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,.65)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '60px/100px Verdana, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', width / 2, height / 2 - 20);

    ctx.font = '20px/60px Verdana, sans-serif';

    var years = (Math.round(score * 1000) + '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    ctx.fillText('EVOLUTION PERIOD: ' + years + ' YEARS', width / 2, height / 2 + 60);

    ctx.font = '20px/60px Verdana, sans-serif';
    ctx.fillText('PRESS [R] TO PLAY AGAIN', width / 2, height / 2 + 180);
  }
};

},{}],11:[function(require,module,exports){
onclick=".pause()";

var audioCtrl = document.querySelector('.audioCtrl');
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

  aboutBox.onclick = controlsBox.onclick = function() {
    about.classList.remove('opened');
    controlsBox.classList.remove('opened');
    cb(false);
  };

  aboutBtn.onclick = function() {
    var opened = aboutBox.classList.toggle('opened');
    controlsBox.classList.remove('opened');
    cb(opened);
  };

  controlsBtn.onclick = function() {
    var opened = controlsBox.classList.toggle('opened');
    aboutBox.classList.remove('opened');
    cb(opened);
  };
};

},{}],12:[function(require,module,exports){
module.exports = {
  getRandomInt: function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};

},{}],13:[function(require,module,exports){
module.exports = function makeWaveList() {
  return {
    wavesToRemove: [],
    waves: [],
    add: function(wave) {
      this.waves.push(wave);
    },
    tick: function(ticks, character, canvWidth, canvHeight) {
      var i = this.waves.length;
      var wave = null;
      while (i--) {
        wave = this.waves[i];
        wave.size.x += wave.invert? -2 : 2;
        wave.size.y += wave.invert? -2 : 2;
        if (wave.size.length() > canvWidth / 2) {
          wave.destroy();
        }
        // remove waves
        if (wave.toBeRemoved) this.waves.splice(i, 1);
      }
    },
    draw: function(ctx, colors) {
      for (var i = 0, len = this.waves.length; i < len; i++) {
        this.waves[i].draw(ctx, colors);
      }
    }
  };
};

},{}],14:[function(require,module,exports){
var Victor = require('victor');

var Wave = {
  draw: function(ctx, colors) {
    ctx.beginPath();
    ctx.strokeStyle = this.invert? 'grey' : colors[this.color];
    ctx.arc(this.position.x, this.position.y, this.size.length(), 0, 2 * Math.PI);
    ctx.lineWidth = this.active? 2 : 0.5;
    ctx.stroke();
  },
  destroy: function() {
    this.toBeRemoved = true;
  }
};

module.exports = function(position, size, color) {
  var wave = Object.create(Wave);
  wave.active = true;
  wave.invert = false;
  wave.position = position;
  wave.size = size;
  wave.color = color;
  wave.created = Date.now();
  return wave;
};

},{"victor":3}]},{},[7])