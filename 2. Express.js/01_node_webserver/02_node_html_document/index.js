const http = require('http')
const myServer = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"})
  response.write("i like <strong>kung fu</strong> and <strong>DragonBall Z</strong>")
  response.end()
})

myServer.listen(3000)