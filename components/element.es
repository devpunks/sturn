// Custom elements polyfill
// https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js

import './upgrade.es'

const DEFINITIONS = new WeakMap

export default class WebComponent { // extends HTMLElement {
  static define (tag) {
    console.warn ('defining', tag, this)
    console.dir (this.name)
    console.dir (this)
    console.dir (self)
    self.customElements.define (tag, HTMLElement.prototype)
    return self.customElements.get (tag)
  }

  constructor (tag, extension) {
    //  if (! (this.tag = tag)) throw `tag name must be provided (i.e. new Element(\`span\`))`

    //  if (!DEFINITIONS [tag])
    //    console
    //      .warn (`registering <${this.x (tag)}> with options:`, options)

    //  window.customElements.define (this.x (tag), this.constructor) //, {extends: extension || tag })

    // let s = super ()

    // return s

    //  const options = { prototype: this, extends: extension || tag }

    //  DEFINITIONS [tag] = DEFINITIONS [tag] ||
    //    // Y U NO WORK?
    //    // window.customElements.define ('x-button', window.Button, {extends: 'button'})
    //    document .registerElement (this.x (tag), options)

    //  let self = new DEFINITIONS [tag] // document.createElement (tag, this.x (tag))
    //  self.appendChild (this.templatize (tag))

    //  return self
  }

  render () {
    return `
      <Calendar />

      <div className="shopping-list">
        <h1>Shopping List for ${this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    `
  }

  // v0
  createdCallback () { console.warn (`Element.createdCallback`, this) }

  x (tag) { return `x-${tag}` }

  templatize (tag) {
  }

  // mixin method
  identify (identity) {
    this.id = identity
    this.setAttribute (`itemtype`, this.localName)
    this.setAttribute (`itemid`, identity)
  }

  // mixin method
  get text () {
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    // innerText Difference - As innerText is aware of CSS styling,
    //   it will trigger a reflow, whereas textContent will not.
    //
    // innerHTML Difference - Because the text is not parsed as HTML,
    // it's likely to have better performance. Moreover,
    // this avoids an XSS attack vector.
    return this.textContent
  }

  // mixin method
  set text (value) { this.textContent = value; this.setAttribute (`title`, value) }

  // custom element reactions

  // only trigger attribute changes for the following properties
  static get observedAttributes () { return [`id`] }
  attributeChangedCallback (name, old, value) {
    console.warn (`attribute [${name}] changed from ${old} to ${value}`)
  }

  // When element is inserted in a shadow-including document
  // v1
  connectedCallback () { console.warn (`connected`, this) }
  // v0?
  attachedCallback () {
    // http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
    this._observer = new MutationObserver (() => this.setAttribute (`aria-label`, this.text))

    this._observer.observe(this, { childList: true, characterData: true, subtree: true })

    console.warn (`attached Element`, this.x (this.tag))
    this.render ()
  }

  // When element is in a shadow-including document and removed
  // v1
  disconnectedCallback () { // detach event listeners added on attached
    this._observer.disconnect()
    console.warn (`disconnected`, this)
  }
  // v0?
  detachedCallback () { // detach event listeners added on attached
    this._observer.disconnect()
    console.warn (`detached Element`, this)
  }

  // v1?
  adoptedCallback () {
    console.warn (`adopted this`, this)
    console.warn (`adopted`, arguments)
  }
}
