const
  { gum }
    = require ('../media/gum.es')

const RTCPeerConnection = RTCPeerConnection || webkitRTCPeerConnection

const identity = Math.round (Math.random () * (1000 - 100) + 100)
const SOCKET = 'ws://localhost:8181'

let socket
let peerConnection
let localPeerConnection

let remotePeerConnection

console.clear ()
console.log ('From Operator')

module.exports = class Operator {
  constructor () {
    this.name = 'Shauna'
    console.log (`${this.name} your operator. How may I help?`)

    console.log ('socket', SOCKET)
    console.log ('identity', identity)

    socket = new WebSocket (SOCKET, ['route-protocol'])
    socket.onopen = _ => socket.send (JSON.stringify({ identity: 'operator', action: 'connect' }))
    socket.onmessage = this.answer
  }

  provide (channel) {
    console.log (`${this.name} is provisioning :> ${channel}`)

    socket
      .send (JSON.stringify ({ identity: 'operator', action: 'provide', channel }))
  }

  connect (stream) {
    console.log('stream', stream)
    peerConnection  = new RTCPeerConnection (configuration ())
    localPeerConnection  = new RTCPeerConnection (configuration ())
    remotePeerConnection = new RTCPeerConnection (configuration ())

    localPeerConnection.onnegotiationneeded = function () {
      console.log ('\n\n\nLocal peer negotiation needed\n\n')
    }

    remotePeerConnection.onnegotiationneeded = function () {
      console.log ('\n\n\nRemote peer negotiation needed\n\n')
    }

    peerConnection.onicecandidate = function candidatesRetrieved (event) {
      console.log ('FINAL Local Candidates Retrieved', event)
    }

    localPeerConnection.onicecandidate = function candidatesRetrieved (event) {
      console.log ('Local Candidates Retrieved', event)

      if (!event.candidate) {
        let broadcast =  sessionStorage.getItem ('broadcast')
        socket.send (JSON.stringify ({ broadcast, identity: identity, offer: localPeerConnection.localDescription }))

        console.log ('all candidates nominated for', identity)
      } else {
        console.log ('Sending ICE candidate to operator')
        // send signal
        socket.send (JSON.stringify ({ identity: identity, candidate: event.candidate }))
      }
    }

    remotePeerConnection.onicecandidate = function candidatesRetrieved (event) {
      if (!event.candidate) return
//    console.log ('Remote Candidates Retrieved', event)
//    localPeerConnection.addIceCandidate (new RTCIceCandidate (event.candidate))
    }

    remotePeerConnection.onaddstream = function remoteStreamAdded (media) {
      console.log ('Remote StreamAdded!', media.stream.getAudioTracks ()[0])

//    display (media.stream)
    }

    console.log('Adding Stram')
    localPeerConnection.addStream (stream)
    console.log('Creating Offer')
    localPeerConnection.createOffer (offer ())
      .then (offer => localPeerConnection.setLocalDescription (offer))
      .then (_ => {
        console.log('Setting local description', localPeerConnection.localDescription)
      })
  } // broadcast

  answer (message) {
    message = JSON.parse(message.data)

    console.log('The message', message)

    return

    if ('operator' === message.identity || identity === message.identity) return

    if (message.candidate) {
      console.log ('Receiving Remote candidate from:', message.identity, message.candidate)
//    remotePeerConnection.addIceCandidate (new RTCIceCandidate ({ candidate: message.candidate.candidate}))
    }else
    if (message.offer) {
      console.log ('join offer', new RTCSessionDescription (message.offer))

      //remotePeerConnection
//    peerConnection
//      .setRemoteDescription (new RTCSessionDescription (message.offer))

          // .exchange ()
//    remotePeerConnection
//      .createAnswer (offer ())
//      .then (answer => remotePeerConnection.setLocalDescription (answer))
//      .then (_ => {
//        socket.send (JSON.stringify ({ identity: identity, answer: remotePeerConnection.localDescription }))
//      })
    } else
      if (message.answer) {
        console.log ('join answer', new RTCSessionDescription (message.answer))
  //    localPeerConnection.setRemoteDescription (offer)

      }
  }

}

function nominate (event) {
  console.log ('nominating', event)
}

let context = new AudioContext

let destination = context.createMediaStreamDestination ()

function offer () {
  return {
    offerToReceiveAudio: true,
    offerToReceiveVideo: false,
    iceRestart: false, // restart input ?
    voiceActivityDetection: false
  }
}

function configuration () {
  return {
    iceServers: [
//    {
//      urls: [
//        'stun:stun.services.mozilla.com',
//        'stun:stun.services.mozilla.com',
//        // https://tools.ietf.org/html/draft-uberti-rtcweb-turn-rest-00
//        'turn:1.2.3.4:9991?transport=udp',
//        'turn:1.2.3.4:9992?transport=tcp',
//        'turns:1.2.3.4:443?transport=tcp'
//      ]
//      peerIdentity: 'otherPerson',
//      username: 'qr34qewfqq', // 'TaraTrouble', Must be opaque
//      credential: 'abcde'
//    },
//    { urls: ['stun:stun.example.com', 'stun:stun-1.example.com'] }
//    { urls: ['stun:stun.services.mozilla.com'] }
//    { url: ['stun:stun.services.mozilla.com'] } // firefox
      { url: 'stun:stun.l.google.com:19302' }
    ]
  }
}

const operator = new Operator
