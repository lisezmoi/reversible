function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
function toggleClass(elem, className) {
  var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(" " + className + " ") >= 0 ) {
        newClass = newClass.replace( " " + className + " " , " " );
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  } else {
    elem.className += ' ' + className;
  }
}
var aboutBox = document.querySelector('.about-box');
var controlsBox = document.querySelector('.controls-box');

document.getElementById('about').onclick = function() {
  toggleClass(aboutBox, 'opened');
}

document.getElementById('controls').onclick = function() {
  toggleClass(controlsBox, 'opened');
}