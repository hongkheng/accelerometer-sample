(function() {
    // // Check for deviceorientation support
    // if (window.DeviceOrientationEvent) {
    //     console.log("DeviceOrientation is supported");

    // } else {
    //     console.log("DeviceOrientation is not supported!");
    // }

    require.config({
        paths: {
            es6promise: '../../es6-promise/promise.min',
            fulltilt: '../../fulltilt/dist/fulltilt'
        },
        shim: {
            'es6promise': {
                exports: 'es6promise'
            },
            'fulltilt': {
                exports: 'FULLTILT'
            }
        }
    });

    require(['es6promise', 'fulltilt'], function(ES6promise, FULLTILT) {

        console.log("ft", ES6promise, FULLTILT);

        var container = document.getElementById("container");
        var circle = document.getElementById("circle");
        var containerHeight = window.innerHeight - circle.offsetHeight;
        var containerWidth = window.innerWidth - circle.offsetWidth;

        var promise = new FULLTILT.getDeviceOrientation({
            'type': 'world'
        });
        // FULLTILT.DeviceOrientation instance placeholder
        var deviceOrientation;

        promise.then(function(controller) {
            // Store the FULLTILT.DeviceOrientation object
            deviceOrientation = controller;
            console.log("done?");
            draw();
        }).catch(function(message) {
            console.error(message);

            // fallback controls
        });

        function draw() {

            // var quarternion = deviceOrientation.getScreenAdjustedQuaternion();
            // var matrix = deviceOrientation.getScreenAdjustedMatrix();
            // var euler = deviceOrientation.getScreenAdjustedEuler();
            deviceOrientation.listen(function() {
                var screenAdjustedEvent = deviceOrientation.getFixedFrameEuler();
                var euler = deviceOrientation.getScreenAdjustedEuler();
                // document.getElementById("doTiltLR").innerHTML = Math.round(euler.gamma);
                // document.getElementById("doTiltFB").innerHTML = Math.round(euler.beta);
                // document.getElementById("doDirection").innerHTML = Math.round(euler.alpha);
                document.getElementById("doTiltLR").innerHTML = Math.round(screenAdjustedEvent.gamma);
                document.getElementById("doTiltFB").innerHTML = Math.round(screenAdjustedEvent.beta);
                document.getElementById("doDirection").innerHTML = Math.round(screenAdjustedEvent.alpha);
                var tiltLR = screenAdjustedEvent.gamma;
                var tiltFB = screenAdjustedEvent.beta;
                // circle.style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
                // circle.style.mozTransform = "rotate(" + tiltLR + "deg)";
                // circle.style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0," + (tiltFB * -1) + "deg)";

                var x = tiltFB;
                var y = tiltLR;

                circle.style.webkitTransform = "translate3d(" + x + "px," + y + "px, 0)";
                circle.style.transform = "translate3d(" + x + "px," + y + "px,0)";

            });

            // console.debug(quarternion);
            // console.debug(matrix);
            // console.debug(euler);

        }

    });


})();
