const
  offer = {
    "type": "offer",
    "node": "simulcast",
    "sdp" : "v=0 ..."
  }

const pc = new RTCPeerConnection()

pc.setRemoteDescription(offer)

  .then( _ => navigator.mediaDevices.getUserMedia({video: true}))

  .then(stream => {
    pc.addTrack(stream.getVideoTracks()[0], stream)

    const sender = pc.getSenders()[1]

    return sender.setParameters(
      { encodings: [
          { rid: "hi", maxBitrate: 2500000 },
          { rid: "mid", maxBitrate: 700000, scaleResolutionDownBy: 2 },
          { rid: "lo", maxBitrate: 150000, scaleResolutionDownBy: 4 }
        ]
      }
    )
  })

  .then( _ => pc.createAnswer())

  .then(answer => {
    console.log(answer.sdp)

    const
      rid_lines =
        answer.sdp
          .split('\r\n')
          .filter( line => line.match ('^a=rid') )

    console.log('rid lines', rid_lines)
  })
