const
  test = require ('tape')
, gum  = require ('./gum.es')

var noop = _ => {}
var mediaDevices = { getUserMedia: noop }

test (`Returns default user media`, t => {
  t.equal (mediaDevices.getUserMedia, gum (mediaDevices))

  t.end ()
})

test (`webkit get user media`, t => {
  delete mediaDevices.getUserMedia
  mediaDevices.webkitGetUserMedia = noop

  t.equal (gum (mediaDevices), mediaDevices.webkitGetUserMedia)

  t.end ()
})

test (`mozilla get user media`, t => {
  delete mediaDevices.getUserMedia
  mediaDevices.mozGetUserMedia = noop

  t.equal (gum (mediaDevices), mediaDevices.mozGetUserMedia)

  t.end()
})

test(`Microsoft get user media`, t => {
  delete mediaDevices.getUserMedia
  mediaDevices.msGetUserMedia = noop

  t.equal (gum (mediaDevices), mediaDevices.msGetUserMedia)

  t.end ()
})
