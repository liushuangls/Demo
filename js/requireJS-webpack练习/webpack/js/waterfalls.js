var $ = require('./jquery')

var waterfall = (function(Width) {
  var page = 1
  var colLength = Math.floor($(window).width() / Width)
  var arr = []
  for (var i = 0; i < colLength; i++) {
    arr[i] = 0
  }
  function getData() {
    $.get('https://pixabay.com/api/?key=6269447-fa9b43b212ca5ef1dc2271efa&page='+page, function(data) {
      page++
      data.setWidth = Width
      render(data)
    })
  }
  function render(data) {
    var waterHtml = $(document.createDocumentFragment())
    data.hits.forEach(function(x) {
      x.setHeight = (x.webformatHeight / x.webformatWidth) * data.setWidth
      var figure = $('<figure><img src="'+x.webformatURL+'"></figure>')
      figure.css({
        width: data.setWidth,
        height: x.setHeight
      })
      waterHtml.append(figure)
    })
    layout(waterHtml[0].childNodes)
  }
  function layout(html) {
    html.forEach(function(x) {
      var minHeight = Math.min.apply(null, arr)
      var minIndex = arr.indexOf(minHeight)
      $(x).css({
        left: minIndex * $(x).width(),
        top: minHeight
      })
      arr[minIndex] += $(x).height()
      $('#load-btn').css({
        top: Math.max.apply(null, arr) + 20 
      })
      $('.waterfalls').append($(x))
    })
  }
  function bind() {
    $('#load-btn').on('click', function() {
      getData(Width)
    })
    $('#Gotop').on('click', function() {
      $(window).scrollTop(0)
    })
  }


  return {
    getData: getData,
    bind: bind
  }
})(400)

module.exports = waterfall