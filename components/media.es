import Element from './element.es'
export default class extends Element {

  constructor (media) {
    return new AudioElement
  }

  display (media) {
    let $media = document.createElement (`audio`)
    $media.controls = true
    $media.src = URL.createObjectURL (media)
    $media.title = media.getAudioTracks ()[0].label

    //$media.play ()
  }
}
