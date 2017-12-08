export default class extends HTMLMediaElement {
  // Make private with Symbol('HTMLAudioElement')
  toggleSound () {
    if (this.muted) {
      this.muted = false // must set to actually control audio
      this.removeAttribute ('muted') // for styling
    } else {
      this.muted = true // must set to actually control audio
      this.setAttribute ('muted', ``) // for styling
    }
  }
}

/*
Explaination:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

Specification:
https://html.spec.whatwg.org/multipage/embedded-content.html#the-audio-element

<!-- Simple audio playback -->
<audio src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" autoplay>
  Your browser does not support the <code>audio</code> element.
</audio>

<!-- Audio playback with captions -->
<audio src="foo.ogg">
  <track kind="captions" src="foo.en.vtt" srclang="en" label="English">
  <track kind="captions" src="foo.sv.vtt" srclang="sv" label="Svenska">
</audio>

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
<audio controls="controls">
  Your browser does not support the <code>audio</code> element.
  <source src="foo.wav" type="audio/wav">
</audio>

*/
