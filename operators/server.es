let
  channel
, connections = new Array
, PORT = (process.env.PORT || 8181)
, websocket = require ('websocket').server


, server = require ('http').createServer ((request, response) => {
    console.log ('Received request for', request.url)

    response.writeHead (404)
    response.end ()
})


void

(new websocket ({
    httpServer: server,
    protocolVersion: 8,
    origin: 'http://localhost:3000',
    autoAcceptConnections: false
}))

.on ('connect', function (connection) {
  console.log ('connected')

  connection.on ('listing', function () {
    if (!channel) return

    console.log ('about to go down', channel)

    connections.filter (c => c !== connection)
      .forEach(c => c.sendUTF (JSON.stringify ({ channel })))
  })

  connections.push (connection)
  console.log ('Connection length', connections.length)
})


.on ('request', function (request) {
  console.log ('\n\n===========================\n', 'requested')
  // THIS WILL BLOW UP IF REQUESTED WITHOUT PROTOCOL
  // new WebSocket('ws:foo', undefined) will blow up the server
  // if protocol is defined on accept

  // https://github.com/theturtle32/WebSocket-Node/blob/c46448810ace50237b7a97eebb3ec6c0d31cf118/docs/WebSocketRequest.md
  var connection = request.accept ('route-protocol', request.origin)
  console.log ('accepted')

  connection.on ('provide', function (_channel) {
    if (!_channel) return

    channel = _channel
    console.log ('\nOperator provisioned channel :>:', channel)

    connection.emit ('listing')
    console.log ('provide emit listing', channel)
  })

  connection.on ('message', function (message) {
    message = JSON.parse (message.utf8Data)

    console.log ('\nmessage from: ', message)

    if ('operator' === message.identity && message.action === 'provide' && message.channel) {
      connection.emit ('provide', message.channel)
    }
  })

  connection.on ('close', function (connection) {
    console.log ((new Date), 'Peer', connection, 'hung up.')
  })

  connection.emit ('listing')
  console.log ('connect emit listing', channel)
})


server.listen (PORT, function () {
  console.log ('Server is listening on port', PORT)
})
