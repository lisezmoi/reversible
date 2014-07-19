

// Colors
var col1 = "rgba(200,255,0,1)";
var col2 = "rgba(250,90,100,1)";



	var theCanvas = document.getElementById("canvas");
	var context = theCanvas.getContext("2d");
	var displayWidth = theCanvas.width;
	var displayHeight = theCanvas.height;
	
	init();
	
	function init() {
      context.fillStyle="rgb(50,50,50)";
      context.fillRect(0,0,800,600);
      drawCircle(400, 300, 100, 105, 1, col2);
      drawCircle(400, 300, 40, 42, 0, col1);
      // Nutriments
      drawCircle(200, 100, 10, 11, 0, col1 );
      drawCircle(400, 470, 10, 11, 3, col2 );
    }