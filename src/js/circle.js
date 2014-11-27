(function () {
	// Circle
	var containerHeight = window.innerHeight;
	var containerWidth = window.innerWidth;
	var container = document.getElementById("container");

	// Check for deviceorientation support
	if (window.DeviceOrientationEvent) {
		console.log("DeviceOrientation is supported");

		document.getElementById("doEvent").innerHTML = "DeviceOrientation";
	
		// Device orientation
		window.addEventListener("deviceorientation", handleOrientation, true);


	} else {
		console.log("DeviceOrientation is not supported!");
	}

	function handleOrientation(evt){
		var absolute = evt.absolute;
		// Device orientation data
		// z-axis - comes straight up out of the mobile, + towards as it moves up
		var alpha = evt.alpha;
		// y-axis - runs front-to-back across the mobile, + towards as it moves away from you
		var beta = evt.beta;
		// x-axis - runs side to side across the mobile, + towards the right side
		var gamma = evt.gamma;

		deviceOrientationHandler(gamma, beta, alpha);

	}

	function deviceOrientationHandler(tiltLR, tiltFB, dir){
		document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
		document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
		document.getElementById("doDirection").innerHTML = Math.round(dir);

		// var circle = document.getElementById("circle");
		// square.style.webkitTransform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
		// square.style.mozTransform = "rotate("+tiltLR +"deg)";
		// square.style.transform = "rotate("+ tiltLR+"deg) rotate3d(1,0,0,"+ (tiltFB*-1)+"deg)";

		console.log(container.offsetHeight);
	}


})();