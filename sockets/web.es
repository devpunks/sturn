module.exports = server => {
  let websocket = require ('websocket').server

  return new websocket ({
    httpServer: server,
    protocolVersion: 8,
    origin: 'http://localhost:3000',
    autoAcceptConnections: false
  })

  .on ('connect', connection => {
    console.log ('connected')

    connection.on ('listing', _ => {
      if (!channel) return

      console.log ('about to go down', channel)

      connections.filter (c => c !== connection)
        .forEach(c => c.sendUTF (JSON.stringify ({ channel })))
    })

    connections.push (connection)
  })
}
