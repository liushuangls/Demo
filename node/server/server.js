var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

var server = http.createServer(function (req, res) {
  var staticPath = path.join(__dirname, 'www')
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticPath, pathObj.pathname)
  try {
    var fileContent = fs.readdirSync(filePath, 'binary')
    res.write(fileContent)
    res.end()
  } catch(e) {
    res.setHeader(404, 'not found')
    res.end('not fonud')
  }
})

server.listen(8080)
