var TemplateEngine = function (tpl, data) {
  var re = /<%([^%>]+)?%>/g
  var reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
  var code = 'var r = "";'
  var cursor = 0
  var match
  function add(line, js) {
    if (js) {
      code += line.match(reExp) ? line : 'r +=' + line + ';'
    } else {
      var match2
      if (match2 = line.match(/<(\\).*>/)) {
        line = line.replace(match2[1], '\\\\')
      }
      code += 'r += "' + line + '";'
    }
    return add
  }
  while (match = re.exec(tpl)) {
    add(tpl.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
  }
  if (tpl.substr(cursor)) {
    add(tpl.substr(cursor))
  }
  code += 'return r'
  return new Function(code).apply(data)
}

var html = 'say:'+
          '<% for (var i = 0; i < 4; i++){ %>' +
          '<p class=\'p1\'>' + '<% this.liu.name %>' + '<\\p>' +
          '<p>' + '<% this.age %>' + '<\\p>' +
          '<% } %>'
var r = TemplateEngine(html, {
  age: 18,
  liu: {
    name: '刘爽'
  }
})
console.log(r);