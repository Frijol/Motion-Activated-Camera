// Set up hardware
var tessel = require('tessel');
var PIR = tessel.port['GPIO'].pin['G3']; // Connect 5V, GND, pin G3 in GPIO
var camera = require('camera-vc0706').use(tessel.port['A']); // Connect port A

// Set up router
var router = require('tiny-router');
var port = 8080;

router.get('/', function (req, res) {
  console.log('Page started, listening for camera event...');
  // res.send(fs.readFileSync('./picture-131536229.jpg'));
  // When we get a picture
  camera.on('picture', function(picture) {
    // Serve it up
    console.log('We got a picture! Sending...');
    // var contentType = typeof arguments[1] !== 'undefined' ? arguments[1] : 'image/jpeg';
    // res.writeHead(200, {'Content-Type': contentType, 'Content-Length': image.length, 'Access-Control-Allow-Origin':'*'});

    res.sendImage(picture);
  });
});

// Wait for camera to connect
camera.on('ready', function (err) {
  if (err) return console.log('not ok - error on ready:', err);
  console.log('Camera connected. Setting resolution...');
  // Set image resolution
  camera.setResolution('vga', function (err) {
    if (err) return console.log('not ok - error setting resolution:', err);
    console.log('Resolution set. Setting compression...');
    // Set image compression
    camera.setCompression(100, function (err) {
      if (err) return console.log('not ok - error setting compression:', err);
      console.log('Compression set.');
      console.log('Camera ready.');
      // Start server, turn on blue light
      tessel.led[1].write(1);
      router.listen(port);
      console.log('Server listening on port', port);
      // Wait for motion
      PIR.on('rise', function(time) {
        console.log('Motion detected! Taking picture...');
        // Take a picture
        camera.takePicture(function(err, image) {
          if (err) {
            console.log('Error taking picture:', err);
          } else {
            console.log('Picture taken.');
          }
        });
      });
    });
  });
});

// // Wait for the camera to say it's ready
// camera.on('ready', function () {
//   // Start listening on a local port
//   var port = 8080;
//   router.listen(port);
//   console.log('Listening on port', port);
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