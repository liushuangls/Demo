var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

var router = require('./router')

var server = http.createServer(function (req, res) {
  var staticPath = path.join(__dirname, 'www')
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticPath, pathObj.pathname)
  try {
    var fileContent = fs.readFileSync(filePath, 'binary')
    res.write(fileContent, 'binary')
    res.end()
  } catch(e) {
    if (pathObj.pathname === '/jsonp') {
      router.jsonp(res, pathObj.query.callback)
    }else if(pathObj.pathname === '/cors') {
      router.cors(res)
    }else if(pathObj.pathname === '/getcity') {
      router.getCity(res, pathObj.query.ip)
    } else {
      res.writeHead(404, 'not found')
      res.end('not fonud')
    }
  }
})

server.listen(8080)
console.log('port:' + 8080)
