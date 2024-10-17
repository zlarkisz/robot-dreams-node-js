const http = require('http')
const myServer = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write('i like programming and stuff');
  response.end()
})

myServer.listen(3000)