module.exports = server => {
  let websocket = require ('websocket').server

  return new websocket ({
    httpServer: server,
    protocolVersion: 8,
    origin: 'http://localhost:3000',
    autoAcceptConnections: false
  })
}
