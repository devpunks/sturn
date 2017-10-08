// https://webrtchacks.com/the-minimum-viable-sdp/

const
  connection =
    new webkitRTCPeerConnection (null)
//, dc = pc.createDataChannel ('webrtchacks')

connection.createOffer (
    function (offer) {
        connection.setLocalDescription (offer)

        console.log (offer.sdp)
    },

    function (error)
      { console.error (error) }
)

