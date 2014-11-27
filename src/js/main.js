(function(){

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


		var square = document.getElementById("square");
		square.style.webkitTransform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
		square.style.mozTransform = "rotate("+tiltLR +"deg)";
		square.style.transform = "rotate("+ tiltLR+"deg) rotate3d(1,0,0,"+ (tiltFB*-1)+"deg)";
	}

	// Check for Device motion events
	if (window.DeviceMotionEvent) {
		console.log("DeviceMotionEvent is supported");

		 window.addEventListener('devicemotion', deviceMotionHandler, false);
	} else {
		console.log("DeviceMotionEvent is not supported!");
		document.getElementById("dmEvent").innerHTML = "Not supported";
	}

	function deviceMotionHandler(eventData) {
	  var info, xyz = "[X, Y, Z]";

	  // Grab the acceleration from the results
	  var acceleration = eventData.acceleration;
	  info = xyz.replace("X", acceleration.x);
	  info = info.replace("Y", acceleration.y);
	  info = info.replace("Z", acceleration.z);
	  document.getElementById("moAccel").innerHTML = info;

	  // Grab the acceleration including gravity from the results
	  acceleration = eventData.accelerationIncludingGravity;
	  info = xyz.replace("X", acceleration.x);
	  info = info.replace("Y", acceleration.y);
	  info = info.replace("Z", acceleration.z);
	  document.getElementById("moAccelGrav").innerHTML = info;

	  // Grab the rotation rate from the results
	  var rotation = eventData.rotationRate;
	  info = xyz.replace("X", rotation.alpha);
	  info = info.replace("Y", rotation.beta);
	  info = info.replace("Z", rotation.gamma);
	  document.getElementById("moRotation").innerHTML = info;

	  // // Grab the refresh interval from the results
	  info = eventData.interval;
	  document.getElementById("moInterval").innerHTML = info;       
	}
	
})();