// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.mediaDevices.getUserMedia = (
  navigator.mediaDevices.getUserMedia ||
  navigator.mediaDevices.webkitGetUserMedia ||
  navigator.mediaDevices.mozGetUserMedia ||
  navigator.mediaDevices.msGetUserMedia
)

module.exports = function () {
  console.log ('Supported Constraints', navigator.mediaDevices.getSupportedConstraints())

  navigator
    .mediaDevices
    .enumerateDevices ()
    .then (console.warn)

  return navigator.mediaDevices.getUserMedia
    ({ audio: true, video: false })
}

function mics () {
  return navigator.mediaDevices.enumerateDevices ()
    .then (_mics)
}

function _mics (devices) {
  return devices
    .filter (device => 'audioinput' === device.kind)
}
