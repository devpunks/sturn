<div align=center>
  <h1>sturn.io</H1>

  <h3>STUN/TURN server for WebRTC</h3>

  <p>A STUN/TURN server is needed when the node where the web session will be started is behind a NAT.

  <p>The WebRTC peer-to-peer communication happens between the user's browser and the node where the web session is started. If the node is on a public host with an external IP, the communication is established without problems. If the node is instead behind a NAT, a STUN/TURN server is necessary for negotiating NAT traversal when establishing peer-to-peer WebRTC communication.
</div>

  - How to change stun server - https://github.com/andyet/SimpleWebRTC/issues/134

## STUN _(Session Traversal Utilities for NAT)_
  - STUN - https://en.wikipedia.org/wiki/STUN
  - NAT _(Network Address Translation)_ - https://en.wikipedia.org/wiki/Network_address_translation

## TURN _(Traversal Using Relays around NAT)_
  - Wikipedia - https://en.wikipedia.org/wiki/TURN

### Testing

  <a href=chrome://webrtc-internals>chrome://webrtc-internals</a>

### xirsys Configuration
  Signalmaster server https://github.com/andyet/signalmaster
_See [xirsys.json](xirsys.json) for more details_

https://github.com/andyet/SimpleWebRTC/issues/134#issuecomment-260781148
  > @billyshena I can't speak to how xirsys will show you connections, but you should be able to use chrome://webrtc-internals to determine if you're able to gather candidates. Also note that because this is a mesh lib, you won't create peer connections with candidates until you have at least two people.

