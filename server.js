const
  { PORT = 8181 }
     = process.env


module.exports =

require ('http').createServer ((request, response) => {

  console.log ('Received request for', request.url)

  response.writeHead (404)
  response.end ()
})

.listen (PORT, _ => {
  console.log ('Server is listening on port', PORT)
})
