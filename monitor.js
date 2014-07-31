// Set up hardware
var tessel = require('tessel');
var PIR = tessel.port['GPIO'].pin['G3']; // Connect 5V, GND, pin G3 in GPIO
var camera = require('camera-vc0706').use(tessel.port['A']); // Connect port A

var lights = { 
    green: tessel.led[0], 
    blue: tessel.led[1], 
    red: tessel.led[2],
    amber: tessel.led[3]
};

// Set up router
var router = require('tiny-router');

router.get('/', function (req, res) {
  res.send('Motion activated camera monitoring page.');
});

router.get('/lights', function (req, res) {
  res.send(lights);
});

router.get('/blink', function (req, res) {
  var blinker = setInterval(function () {
    lights.forEach(function (light) {
      light.toggle();
    });
  }, 200);
  res.send('Blinking!');
});

// Start listening on a local port
var port = 8080
router.listen(port);
console.log('Listening on port', port);

// // Wait for the camera to say it's ready
// camera.on('ready', function () {
//   // Wait for motion
//   PIR.on('rise', function(time) {
//     console.log('Motion detected! Taking picture...');
//     // Take a picture
//     camera.takePicture(function(err, image) {
//       if (err) {
//         console.log('Error taking picture:', err);
//       } else {
//         console.log('Picture taken. Saving...');
//         // Name the image for the time it was taken
//         var name = 'picture-' + time + '.jpg';
//         // Save
//         process.sendfile(name, image);
//         console.log('Picture saved.');
//       }
//     });
//   });
// });