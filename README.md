Motion-Activated-Camera
=======================

Takes a picture when motion is detected.

Materials:
* [Tessel](https://tessel.io)
* [Camera Module](tessel.io/modules#module-camera)
* [PIR motion detector](http://www.adafruit.com/products/189)

Connecting the PIR:
PIR's GND goes to Tessel's GND on the GPIO bank
PIR's +5V goes to Tessel's Vin on the GPIO bank
PIR's OUT goes to Tessel's G3 on the GPIO bank

Connecting the camera:
Plug in the camera module to Tessel port A.

Running the code:

1. Clone this repo.
1. From inside this directory, run `npm install` to install dependencies.
1. Run the code with `tessel run index.js --upload-dir .` (the flag specifies where pictures will be saved).

Now, when you move in front of the PIR motion detector, Tessel will take a picture!
