var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

var router = {
  news: function () {
    var news = [
      '哆啦A梦反日',
      '学生陷校园贷溺亡',
      '黄焖鸡饭进军美国',
      '40岁男子喝醉后脚陷干塘 暴晒三天奄奄一息',
      '美国佛罗里达州两名警察遭枪击 3名嫌疑人被捕',
      '美国俄勒冈州山火持续 过火面积达到1万8千公顷',
      ' 芬兰警方表示图尔库持刀行凶事件疑为恐怖袭击'
    ]
    var data = []
    for (var i = 0; i < 3; i++) {
      data[i] = news[Math.floor(Math.random() * 7)]
    }
    return data
  },
  jsonp: function (res, callback) {
    var data = router.news()
    if (callback) {
      // 服务器返回值只能是string or buffer
      res.end(callback + '(' + JSON.stringify(data) + ')')
    } else {
      res.end(JSON.stringify(data))
    }
  },
  cors: function (res) {
    var data = router.news()
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.end(JSON.stringify(data))
  }
}

var server = http.createServer(function (req, res) {
  var staticPath = path.join(__dirname, 'www')
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticPath, pathObj.pathname)
  console.log(filePath)
  try {
    var fileContent = fs.readFileSync(filePath, 'binary')
    res.write(fileContent, 'binary')
    res.end()
  } catch(e) {
    var ss = res
    if (pathObj.pathname === '/jsonp') {
      router.jsonp(ss, pathObj.query.callback)
    }else if(pathObj.pathname === '/cors') {
      router.cors(ss)
    } else {
      res.writeHead(404, 'not found')
      res.end('not fonud')
    }
  }
})

server.listen(8080)
console.log('port:' + 8080)
