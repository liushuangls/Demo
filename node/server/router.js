var http = require('http')


function news() {
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
}

function jsonp(res, callback) {
  var data = news()
  if (callback) {
    // 服务器返回值只能是string or buffer
    res.end(callback + '(' + JSON.stringify(data) + ')')
  } else {
    res.end(JSON.stringify(data))
  }
}

function cors(res) {
  var data = news()
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.end(JSON.stringify(data))
}

function getCity(res, ip) {
  var city = ''
  http.get('http://ip.taobao.com/service/getIpInfo.php?ip=' + ip, 
    function(re) {
      var json = ''
      re.on('data', function(d) {
        json += d;
      })
      // 异步，所以在里面返回
      re.on('end', function() {
        json = JSON.parse(json)
        city = json.data.region + json.data.city
        console.log(city)
        res.end(city)
      })
  })
}


exports.jsonp = jsonp
exports.cors = cors
exports.getCity = getCity