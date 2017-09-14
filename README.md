# sturn.io
stun/turn server for WebRTC

  - How to change stun server - https://github.com/andyet/SimpleWebRTC/issues/134

## Stun
  - Wikipedia - https://en.wikipedia.org/wiki/STUN

### Testing

  <a href=chrome://webrtc-internals>chrome://webrtc-internals</a>

### xirsys Configuration
  Signalmaster server https://github.com/andyet/signalmaster
_See [xirsys.json](xirsys.json) for more details_

https://github.com/andyet/SimpleWebRTC/issues/134#issuecomment-260781148
  > @billyshena I can't speak to how xirsys will show you connections, but you should be able to use chrome://webrtc-internals to determine if you're able to gather candidates. Also note that because this is a mesh lib, you won't create peer connections with candidates until you have at least two people.

