const
  { server }
    = require ('websocket')

void

module.exports = function (server) {
  return new server ({
    httpServer: server,
    protocolVersion: 8,
    origin: 'http://localhost:3000',
    autoAcceptConnections: false
  })
}
