import Audio from './audio.es'
import gum from './gum.es'
import VisualAnalyser from './analyser.es'

// put media elements in the registry factory
let media = document
  .registerElement ('x-audio', {
    prototype: Object.create (Audio.prototype),
    extends: 'audio'
  })

export default class extends HTMLElement { // no HTMLFigureElement ?
  createdCallback () { console.log (`HTMLFigureElement: created`) }

  attachedCallback () {
    console.log (`HTMLFigureElement: attached`)

//    let m = new media
//    m.srcObject = stream
//    m.src = URL.createObjectURL(stream);

    gum ().then (stream => {
      new VisualAnalyser (stream)

      let caption = document.createElement('figcaption')
      caption.textContent='Anonymous_User'
      this.embed (caption)

      let tracks = stream.getAudioTracks ()

      this.addEventListener ('click', function (event) {
        for (let track in tracks) {
          tracks[track].enabled = !tracks[track].enabled
        }
      })

      for (let track in stream.getAudioTracks ()) tracks[track].enabled = false
    })

    /* There are 7 events that fire in this order when an audio file is loaded:
    loadstart durationchange loadedmetadata loadeddata progress canplay canplaythrough */

    this.title = 'Click to Toggle sound' // Shouldn't we use aria-* role?
  }

  embed (media) {
    return this.appendChild (media)
  }
}

