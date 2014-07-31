// Set up hardware
var tessel = require('tessel');
var PIR = tessel.port['GPIO'].pin['G3']; // Connect 5V, GND, pin G3 in GPIO
var camera = require('camera-vc0706').use(tessel.port['A']); // Connect port A

// Wait for the camera to say it's ready
camera.on('ready', function () {
  // Wait for motion
  PIR.on('rise', function(time) {
    console.log('Motion detected! Taking picture...');
    // Take a picture
    camera.takePicture(function(err, image) {
      if (err) {
        console.log('Error taking picture:', err);
      } else {
        console.log('Picture taken. Saving...');
        // Name the image for the time it was taken
        var name = 'picture-' + time + '.jpg';
        // Save
        process.sendfile(name, image);
        console.log('Picture saved.');
      }
    });
  });
});