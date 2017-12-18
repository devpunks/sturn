const
  { server: Websocket }
    = require ('websocket')

, { PORT = 8181 }
     = process.env


module.exports = server => {
  return new Websocket ({
    httpServer: server,
    protocolVersion: 8, // shouldn't this be 13
    origin: `http://localhost:${PORT}`,
    autoAcceptConnections: false
  })

  .on (`connect`, connection => {

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
