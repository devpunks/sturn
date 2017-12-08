var AudioContext = window.AudioContext || window.webkitAudioContext

const RATE = 8192 // 2048

let context, analyser, stream

export default class extends AudioNode {
  constructor (stream) {
    console.log (`Stream:`, stream)

    context = new AudioContext ()

    analyser = context.createAnalyser ()
    analyser.smoothingTimeConstant = 0.3
    analyser.fftSize = RATE

    context
      .createMediaStreamSource (stream)
      .connect (analyser)

    analyser.connect (context.destination)

    render ()
  }
}

function render () {
  requestAnimationFrame (render)

  let frequencyData = new Uint8Array (analyser.frequencyBinCount)
  analyser.getByteFrequencyData (frequencyData)

  let ratio = 110

  let size = (getAverageVolume (frequencyData) / ratio)
  let elem = document.querySelector(`figure[is='x-figure']`)

  elem.style.padding = `${size}rem`
  elem.style.backgroundImage = 'url(http://thecatapi.com/api/images/get?format=src)'
  elem.style.backgroundSize = 'cover'
  elem.style.backgroundPosition = 'center center'
  elem.style.borderWidth = `${ 5 * size }vw`
}

function getAverageVolume (data) {
  return Math.round(
    data
    .reduce ((a, b) => a + b)
    / data.length
  )
}

