<div align=center>
  <h1>sturn.io</H1>

  <h3>STUN/TURN server for WebRTC</h3>

</div>

A STUN/TURN server is needed when the node where the web session will be started is behind a NAT.

The WebRTC peer-to-peer communication happens between the user's browser and the node where the web session is started. If the node is on a public host with an external IP, the communication is established without problems. If the node is instead behind a NAT, a STUN/TURN server is necessary for negotiating NAT traversal when establishing peer-to-peer WebRTC communication.

When a STUN/TURN server is used, usually STUN is attempted firstly. Depending on your own needs, it's also possible to use either a STUN server or a TURN server only. The main difference between these two solutions is that media will travel directly between both end points if STUN is used, whereas media will be proxied through the server if TURN is utilized. Note that, depending on network topology (i.e. combinations of NAT types, firewalls and network configurations) STUN may not work. Success rate is about 80%, but in case of failure of connectivity with STUN it's necessary to have a TURN server as fallback or it will be not possible to run NoMachine web sessions with WebRTC enabled.

  1. If  the system firewall is blocking all the outbound and inbound ports, the WebRTC connection cannot be established. A STUN/TURN server is necessary also in this case.</li>

  2. If the system firewall is blocking only inbound ports, the connection is possible only if the user's device is not behind a NAT and has a public IP.

  3. If the user's device is behind a NAT instead, connection will not be made. Also in this case setting-up a STUN/TURN server will help.

  4. If the system firewall is blocking only outbound ports, WebRTC connection will be possible given that the node is on a machine with a public IP not behind a NAT.  The NAT router will not block inbound connections and the user's device will be able to make connections with the server without problems.

  - How to change stun server - https://github.com/andyet/SimpleWebRTC/issues/134

## Public Alternatives
  An alternative to set-up your own STUN/TURN server is to use any of the public NAT Traversal services available on the internet, for example this is a list of public STUN/TURN servers:

```
stun1.l.google.com:19302
stun2.l.google.com:19302
stun3.l.google.com:19302
stun4.l.google.com:19302
stun.stunprotocol.org:3478
```

## STUN _(Session Traversal Utilities for NAT)_
  - STUN - https://en.wikipedia.org/wiki/STUN
  - RFC _([RFC5389](https://tools.ietf.org/html/rfc5389), [RFC3489](https://www.ietf.org/rfc/rfc3489.txt))_
  - NAT  - _(Network Address Translation)_ - https://en.wikipedia.org/wiki/Network_address_translation


## TURN _(Traversal Using Relays around NAT)_
  - Wikipedia - https://en.wikipedia.org/wiki/TURN
  - RFC5766 - [TURN Relay Extensions to STUN](https://tools.ietf.org/html/rfc5766)
  - RFC6516 - [TURN Extension for IPv6](https://tools.ietf.org/html/rfc6156)
  - RFC6062 - [TURN Extensions for TCP Allocations](https://tools.ietf.org/html/rfc6062)



## ICE _(Interactive Connectivity Establishment)_
  - ICE - _([RFC5245](https://tools.ietf.org/html/rfc5245#section-15.1))_
  - ICE Format - https://tools.ietf.org/html/rfc5245#section-15.1
  0 ICE IP Address Handling - https://tools.ietf.org/html/draft-ietf-rtcweb-ip-handling-01
  - Wikipedia - https://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment
  - icebreaker - https://github.com/elbecita/ice-breaker


## QUIC


  QUIC (Quick UDP Internet Connections, pronounced quick) is an experimental transport layer network protocol developed by Google. QUIC supports a set of multiplexed connections between two endpoints over User Datagram Protocol (UDP), and was designed to provide security protection equivalent to TLS/SSL, along with reduced connection and transport latency, and bandwidth estimation in each direction to avoid congestion. QUIC's main goal is to optimize connection-oriented web applications currently using TCP. An experimental implementation is being put in place in Chrome by a team of engineers at Google.


## H264 vs VP8 vs DASH vs. RTMP vs. HLS

  Live Streaming Web Audio and Video
  https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Live_streaming_web_audio_and_video


### Dash

  Unlike HLS, HDS, and Smooth Streaming, DASH is codec-agnostic,
  which means it can use content encoded with any coding format like H.265, H.264, VP9 etc.

  - https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP
  - http://wiki.webmproject.org/adaptive-streaming/webm-dash-specification


### HLS

  - What is HLS LIve Streaming? - https://gist.github.com/WebReflection/ed05681fe73ece4917de850c2c3bd7a1
  - Adaptive Streaming in the Field - http://www.streamingmedia.com/Articles/Editorial/Featured-Articles/Adaptive-Streaming-in-the-Field-73017.aspx


### QUIC
  - [QUIC IETF Draft](https://tools.ietf.org/html/draft-tsvwg-quic-protocol-00)
  - [QUIC Wikipedia](https://en.wikipedia.org/wiki/QUIC)
  - [QUIC GOOGLE](https://www.chromium.org/quic)


### Network Topology
![](https://github.com/sneakyhead/sturn.io/blob/master/images/stack.png)


### Testing

  chrome://webrtc-internals


## Servers


### STUND
  - https://github.com/ernado/stund
  - https://github.com/ernado/stun
  - https://godoc.org/github.com/ernado/stun


### stun-js
  - https://github.com/microminion/stun-js


### stun **
  - https://github.com/reklatsmasters/stun


### xirsys Configuration
  Signalmaster server https://github.com/andyet/signalmaster
_See [xirsys.json](xirsys.json) for more details_

https://github.com/andyet/SimpleWebRTC/issues/134#issuecomment-260781148
  > @billyshena I can't speak to how xirsys will show you connections, but you should be able to use chrome://webrtc-internals to determine if you're able to gather candidates. Also note that because this is a mesh lib, you won't create peer connections with candidates until you have at least two people.

## Media encodings by browser
http://stackoverflow.com/questions/21921790/best-approach-to-real-time-http-streaming-to-html5-video-client

## WebRTC
What is WebRTC
http://blog.salemove.com/webrtc-vs-flash-not-much-of-a-competition/

## LINKS
https://github.com/webrtc

Architecture
![](http://webrtc-security.github.io/images/diagram_2_en.png)

https://www.w3.org/TR/media-source/

https://www.w3.org/TR/webrtc/

https://developer.mozilla.org/en-US/docs/Web/API/MediaSource

https://developers.google.com/web/updates/2011/11/Stream-video-using-the-MediaSource-API?hl=en

http://html5-demos.appspot.com/static/media-source.html

## SPECIFICATIONS
RTC SDP - https://tools.ietf.org/html/draft-nandakumar-rtcweb-sdp-08
