let
  channel
, connections = new Array
, websocket   = require ('../sockets/web')


module.exports = server =>
  websocket (server)
    .on ('request', onrequest)


function onrequest (request) {
  console.log ('\n\n===========================\n', 'requested', request.origin)
  // THIS WILL BLOW UP IF REQUESTED WITHOUT PROTOCOL
  // new WebSocket('ws:foo', undefined) will blow up the server
  // if protocol is defined on accept

  // https://github.com/theturtle32/WebSocket-Node/blob/c46448810ace50237b7a97eebb3ec6c0d31cf118/docs/WebSocketRequest.md
//var connection = request.accept ('route-protocol', request.origin)
//console.log ('accepted')

//connection.on ('provide', _channel => {
//  if (!_channel) return

//  channel = _channel
//  console.log ('\nOperator provisioned channel :>:', channel)

//  connection.emit ('listing')
//  console.log ('provide emit listing', channel)
//})

//connection.on ('message', message => {
//  message = JSON.parse (message.utf8Data)

//  console.log ('\nmessage from: ', message)

//  if ('operator' === message.identity && message.action === 'provide' && message.channel) {
//    connection.emit ('provide', message.channel)
//  }
//})

//connection.on ('close', connection => {
//  console.log ((new Date), 'Peer', connection, 'hung up.')
//})

//connection.emit ('listing')
//console.log ('connect emit listing', channel)
}
