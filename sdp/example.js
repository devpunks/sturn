const offer = {"type":"offer","node":"simulcast","sdp":"v=0\r\no=appearin-sfu 4469383696341893 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE audio video\r\na=msid-semantic:WMS *\r\na=ice-ufrag:IeOHAg==\r\na=ice-pwd:jOhFs+ZxaMCCNyLGfgeydtK8uA03Cg==\r\na=ice-lite\r\na=setup:actpass\r\na=fingerprint:sha-256 F0:17:2C:C7:BF:B4:E1:FE:4F:85:CD:6E:DD:56:F7:C0:34:F6:4C:2F:2B:D4:C3:85:FC:1B:7A:3B:8B:B0:21:65\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\nc=IN IP4 0.0.0.0\r\na=rtcp:9 IN IP4 0.0.0.0\r\na=rtpmap:111 opus/48000/2\r\na=fmtp:111 minptime=10;useinbandfec=1\r\na=rtcp-mux\r\na=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\na=mid:audio\r\na=recvonly\r\na=rtcp-rsize\r\na=maxptime:60\r\na=candidate:1796272311 1 UDP 2130706431 127.0.0.1 40581 typ host\r\na=end-of-candidates\r\nm=video 9 UDP/TLS/RTP/SAVPF 100\r\nc=IN IP4 0.0.0.0\r\na=rtcp:9 IN IP4 0.0.0.0\r\na=rtpmap:100 VP8/90000\r\na=fmtp:100 max-fr=60;max-fs=12288\r\na=rtcp-fb:100 ccm fir\r\na=rtcp-fb:100 nack\r\na=rtcp-fb:100 nack pli\r\na=rtcp-fb:100 goog-remb\r\na=rtcp-mux\r\na=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\na=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:5 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\r\na=mid:video\r\na=recvonly\r\na=rtcp-rsize\r\na=rid:hi recv\r\na=rid:mid recv\r\na=rid:lo recv\r\na=simulcast: recv rid=hi;mid;lo\r\na=candidate:1796272311 1 UDP 2130706431 127.0.0.1 40581 typ host\r\na=end-of-candidates\r\n"};

const pc = new RTCPeerConnection();
pc.setRemoteDescription(offer)
  .then(() => navigator.mediaDevices.getUserMedia({video: true}))
  .then((stream) => {
    pc.addTrack(stream.getVideoTracks()[0], stream);
    const sender = pc.getSenders()[1];
    return sender.setParameters({encodings: [
      {rid: "hi", maxBitrate: 2500000},
      {rid: "mid", maxBitrate: 700000, scaleResolutionDownBy: 2},
      {rid: "lo", maxBitrate: 150000, scaleResolutionDownBy: 4}
    ]});
  })
  .then(() => pc.createAnswer())
  .then((answer) => {
    console.log(answer.sdp);
    const rid_lines = answer.sdp.split('\r\n')
       .filter(line => line.match('^a=rid'));
    console.log('rid lines', rid_lines);
  });
